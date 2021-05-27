import { HabitRepetition } from "pages/habits/_types";
import { clampToMonthLength, DayOfYear, getWeekdayFromDay } from "utils/date";
import { assertUnreachable } from "utils";

export const showHabitOnDayImpl = (
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
