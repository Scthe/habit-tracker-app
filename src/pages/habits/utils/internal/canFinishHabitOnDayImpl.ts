import { showHabitOnDayImpl } from "./showHabitOnDayImpl";
import { HabitRepetition } from "pages/habits/_types";
import { DayOfYear, deconstructDate, differenceInDays } from "utils/date";
import { assertUnreachable } from "utils";

/**
 * Can we mark this habit as done?
 * e.g. we cannot complete habits that are 10 days overdue, or ones 2months from now.
 */
export const canFinishHabitOnDayImpl = (
  repeat: HabitRepetition,
  day: DayOfYear
): "is-doable" | "is-not-doable" => {
  const retFmt = (a: boolean) => (a ? "is-doable" : "is-not-doable");

  if (!showHabitOnDayImpl(repeat, day)) {
    return retFmt(false);
  }

  const today = deconstructDate(new Date());
  const dayDiff = differenceInDays(day, today);
  const isTodayOrYesterday = dayDiff === 0 || dayDiff === -1;
  const isInNext7days = dayDiff <= 7;
  const isInNext31days = dayDiff <= 31;

  switch (repeat.type) {
    case "daily":
      return retFmt(isTodayOrYesterday);
    case "weekly":
      return retFmt(isTodayOrYesterday || isInNext7days);
    case "weekly_summary":
      return retFmt(isTodayOrYesterday || isInNext7days);
    case "monthly_summary": {
      return retFmt(isTodayOrYesterday || isInNext31days);
    }
    default: {
      return assertUnreachable(repeat); // compile time error if some case is not handled
    }
  }
};
