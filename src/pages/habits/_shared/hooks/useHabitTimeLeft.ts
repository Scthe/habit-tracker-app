import { useState, useCallback } from "react";
import isBefore from "date-fns/isBefore";

import { Habit } from "../../_types";
import { useInterval } from "~hooks";
import {
  createDateFromDay,
  DayOfYear,
  getDateDiff,
  min2ms,
  stringifyDateDiff,
} from "~utils";

const recalcTimeLeft = (habitDate: Date): string => {
  const now = new Date();
  const dateDiff = getDateDiff(now, habitDate);
  const dateDiffStr = stringifyDateDiff(dateDiff);

  const habitWasInPast = isBefore(habitDate, now); // hours and minutes are important here!
  if (dateDiffStr == null) {
    return "Now";
  }
  if (habitWasInPast) {
    return `${dateDiffStr} ago`;
  } else {
    return `In ${dateDiffStr}`;
  }
};

/**
 * Compares current date vs habit reminder time at a given day.
 *
 * IMPORTANT: Refreshes every minute.
 * IMPORTANT: We already know the habit can be done on this day.
 */
export const useHabitTimeLeft = (
  habit: Habit,
  habitActivityDay: DayOfYear
): string => {
  const habitDate = createDateFromDay(
    habitActivityDay,
    habit.reminderTime.hour,
    habit.reminderTime.minute
  );

  const [timeLeft, setTimeLeft] = useState(recalcTimeLeft(habitDate));

  const refreshTimeLeft = useCallback(() => {
    setTimeLeft(recalcTimeLeft(habitDate));
  }, [habitDate]);

  useInterval(refreshTimeLeft, min2ms(1));
  return timeLeft;
};
