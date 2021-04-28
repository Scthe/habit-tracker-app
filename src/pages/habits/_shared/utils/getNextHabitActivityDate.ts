import addMonths from "date-fns/addMonths";
import closestIndexTo from "date-fns/closestIndexTo";
import getDate from "date-fns/getDate";
import getDay from "date-fns/getDay";
import nextDay from "date-fns/nextDay";
import { assertUnreachable, setDateOfMonth, zeroeTime } from "~utils";
import { Habit, Weekday } from "../../_types";

/** Inserts the `$habit.reminderTime` time into date. */
export const createHabitActivityDate = (habit: Habit, date: Date): Date => {
  const habitDate = zeroeTime(date);
  habitDate.setHours(habit.reminderTime.hour);
  habitDate.setMinutes(habit.reminderTime.minute);
  return habitDate;
};

const getNextDateByDayOfWeek = (currentDate: Date, day: Weekday): Date => {
  if (getDay(currentDate) === day) {
    return currentDate;
  } else {
    return nextDay(currentDate, day);
  }
};

const getDateWithDayOfMonth = (
  currentDate: Date,
  dateOfMonth: number
): Date => {
  const currentDateOfMonth = getDate(currentDate);

  if (currentDateOfMonth <= dateOfMonth) {
    // same month
    return setDateOfMonth(new Date(currentDate), dateOfMonth);
  } else {
    // next month
    const nextMonthDate = addMonths(new Date(currentDate), 1);
    return setDateOfMonth(nextMonthDate, dateOfMonth);
  }
};

// TODO test me!

/**
 * Get date when this `$habit` will next time become current. This will be on/after `$currentDate`.
 */
export const getNextHabitActivityDate = (
  habit: Habit,
  currentDate_: Date
): Date => {
  const { repeat } = habit;
  const currentDate = zeroeTime(currentDate_);
  let result: Date = currentDate;

  switch (repeat.type) {
    case "daily": {
      result = currentDate;
      break;
    }
    case "weekly": {
      const { weekdays } = repeat;
      const weekdayDates = weekdays.map((e) =>
        getNextDateByDayOfWeek(currentDate, e)
      );
      const idx = closestIndexTo(currentDate, weekdayDates);
      result = weekdayDates[idx];
      break;
    }
    case "weekly_summary": {
      const dayEndsOn = repeat.endsOn;
      result = getNextDateByDayOfWeek(currentDate, dayEndsOn);
      break;
    }
    case "monthly_summary": {
      const dateOfMonthEndsOn = repeat.endsOn;
      result = getDateWithDayOfMonth(currentDate, dateOfMonthEndsOn);
      break;
    }
    default: {
      return assertUnreachable(repeat); // compile time error if some case is not handled
    }
  }

  return createHabitActivityDate(habit, result);
};
