import { useState, useCallback, useEffect } from "react";
import isBefore from "date-fns/isBefore";

import { Habit } from "../../_types";
import { useInterval } from "hooks/useInterval";
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
  const { hour, minute } = habit.reminderTime;

  const getTimeLeft = useCallback(() => {
    const habitDate = createDateFromDay(habitActivityDay, hour, minute);
    return recalcTimeLeft(habitDate);
  }, [habitActivityDay, hour, minute]);

  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  // refresh IMMEDIATELY when we change day
  useEffect(() => setTimeLeft(getTimeLeft()), [getTimeLeft]);

  // refresh as time passes
  useInterval(
    useCallback(() => setTimeLeft(getTimeLeft()), [getTimeLeft]),
    min2ms(1)
  );
  return timeLeft;
};
