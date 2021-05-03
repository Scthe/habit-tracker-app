import isSameDay from "date-fns/isSameDay";
import getDay from "date-fns/getDay";
import isAfter from "date-fns/isAfter";
import getDate from "date-fns/getDate";
import getDaysInMonth from "date-fns/getDaysInMonth";

import { Habit } from "../../_types";
import { assertUnreachable, zeroeTime } from "~utils";

// TODO test me!

const canBeDoneOn = (habit: Habit, date: Date): boolean => {
  const { repeat } = habit;
  switch (repeat.type) {
    case "daily": {
      return true;
    }
    case "weekly": {
      return repeat.weekdays.includes(getDay(date));
    }
    case "weekly_summary": {
      return repeat.endsOn === getDay(date);
    }
    case "monthly_summary": {
      // handle 31st of february etc.
      const fixedDayOfMonth = Math.min(repeat.endsOn, getDaysInMonth(date));
      return getDate(date) === fixedDayOfMonth;
    }
    default: {
      return assertUnreachable(repeat); // compile time error if some case is not handled
    }
  }
};

export const getHabitsForFutureDate = (
  date_: Date,
  habits: Habit[]
): Habit[] => {
  const checkedDate = zeroeTime(date_);
  const nowDate = zeroeTime(new Date());
  const isTodayOrInFuture =
    isSameDay(checkedDate, nowDate) || isAfter(checkedDate, nowDate);
  if (!isTodayOrInFuture) {
    return [];
  }

  return habits.filter((habit) => canBeDoneOn(habit, checkedDate));
};
