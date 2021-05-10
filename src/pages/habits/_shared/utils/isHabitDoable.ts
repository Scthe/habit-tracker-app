import times from "lodash/times";
import { HabitRepetition } from "pages/habits/_types";
import {
  addDays,
  assertUnreachable,
  clampToMonthLength,
  DayOfYear,
  deconstructDate,
  differenceInDays,
  getWeekdayFromDay,
} from "~utils";

/**
 * Should we even show this habit?
 * e.g. On Tuesday do not show habits from Monday and Friday
 */
export const showHabitOnDay = (
  repeat: HabitRepetition,
  day: DayOfYear
): boolean => {
  const dayOfWeek = getWeekdayFromDay(day);

  switch (repeat.type) {
    case "daily": {
      return true;
    }
    case "weekly": {
      return repeat.weekdays.includes(dayOfWeek);
    }
    case "weekly_summary": {
      return repeat.endsOn === dayOfWeek;
    }
    case "monthly_summary": {
      // handle 31st of February etc.
      const fixedDayOfMonth = clampToMonthLength(repeat.endsOn, {
        month: day.month,
        year: day.year,
      });
      return day.day === fixedDayOfMonth;
    }
    default: {
      return assertUnreachable(repeat); // compile time error if some case is not handled
    }
  }
};

/**
 * Can we mark this habit as done?
 * e.g. we cannot complete habits that are 10 days overdue, or ones 2months from now.
 */
export const canFinishHabitOnDay = (
  repeat: HabitRepetition,
  day: DayOfYear
): boolean => {
  if (!showHabitOnDay(repeat, day)) {
    return false;
  }

  const today = deconstructDate(new Date());
  const dayDiff = differenceInDays(day, today);
  const isTodayOrYesterday = dayDiff === 0 || dayDiff === -1;
  const isInNext7days = dayDiff <= 7;
  const isInNext31days = dayDiff <= 31;

  switch (repeat.type) {
    case "daily":
      return isTodayOrYesterday;
    case "weekly":
      return isTodayOrYesterday || isInNext7days;
    case "weekly_summary":
      return isTodayOrYesterday || isInNext7days;
    case "monthly_summary": {
      return isTodayOrYesterday || isInNext31days;
    }
    default: {
      return assertUnreachable(repeat); // compile time error if some case is not handled
    }
  }
};

export const getNextDateWhenHabitIsDoable = (
  repeat: HabitRepetition,
  day: DayOfYear
): DayOfYear => {
  // search next 31 days for suitable date. There are ways to calculate this that are simpler,
  // but it would require to actually write the code.
  const days = times(32, (i) => addDays(day, i));
  return days.find((day) => canFinishHabitOnDay(repeat, day))!;
};
