import { useState, useCallback } from "react";
import isBefore from "date-fns/isBefore";

import { useInterval } from "~hooks";
import { getDateDiff, min2ms, stringifyDateDiff, zeroeTime } from "~utils";
import { Habit } from "../_types";

const recalcTimeLeft = (habitDate: Date): string => {
  const now = new Date();
  const dateDiff = getDateDiff(now, habitDate);
  const dateDiffStr: string = stringifyDateDiff(dateDiff) || "Now";

  const habitWasInPast = isBefore(habitDate, now);
  if (habitWasInPast) {
    return `${dateDiffStr} ago`;
  } else {
    return `In ${dateDiffStr}`;
  }
};

/** Compares current date vs habit reminder time at a given day */
export const useHabitTimeLeft = (habit: Habit, day: Date): string => {
  const habitDate = zeroeTime(day);
  habitDate.setHours(habit.reminderTime.hour);
  habitDate.setMinutes(habit.reminderTime.minute);

  const [timeLeft, setTimeLeft] = useState(recalcTimeLeft(habitDate));

  const cb = useCallback(() => setTimeLeft(recalcTimeLeft(habitDate)), [
    habitDate,
  ]);
  useInterval(cb, min2ms(1));

  return timeLeft;
};
