import differenceInCalendarDays from "date-fns/differenceInCalendarDays";
import isBefore from "date-fns/isBefore";
import isSameDay from "date-fns/isSameDay";
import subDays from "date-fns/subDays";
import { assertUnreachable, zeroeTime } from "~utils";
import { Habit } from "../../_types";
import { getNextHabitActivityDate } from "./getNextHabitActivityDate";

// TODO test me!

/** Check the dates for a `$habit` and some other `$day` and check if we can change completion status  */
export const canMarkHabitDone = (habit: Habit, date_: Date): boolean => {
  const checkedDate = zeroeTime(date_);
  const nowDate = zeroeTime(new Date());
  const yesterdayDate = subDays(nowDate, 1); // can still mark yesterdays habits as done
  const isFarInThePast = isBefore(checkedDate, yesterdayDate);
  if (isFarInThePast) {
    return false;
  }

  // now we need to consider only yesterday, today and future dates.
  // Only "*_summary" repeats can be done far of in the future
  // (e.g. we finished reading 3 books on Friday, ahead of Sundays's deadline).
  const isTodayOrYesterday = (d: Date) =>
    isSameDay(d, nowDate) || isSameDay(d, yesterdayDate);

  const { repeat } = habit;
  switch (repeat.type) {
    case "daily": {
      return isTodayOrYesterday(checkedDate);
    }
    case "weekly": {
      const nextOcurrence = getNextHabitActivityDate(habit, yesterdayDate);
      return isTodayOrYesterday(nextOcurrence);
    }
    case "weekly_summary": {
      const nextOcurrence = getNextHabitActivityDate(habit, checkedDate);
      const daysLeft = differenceInCalendarDays(nextOcurrence, nowDate);
      return daysLeft <= 7; // normally `< 7`, but `<= 7` to account for yesterday
    }
    case "monthly_summary": {
      const nextOcurrence = getNextHabitActivityDate(habit, checkedDate);
      const daysLeft = differenceInCalendarDays(nextOcurrence, nowDate);
      return daysLeft < 31; // might as well use 31..
    }
    default: {
      return assertUnreachable(repeat); // compile time error if some case is not handled
    }
  }
};
