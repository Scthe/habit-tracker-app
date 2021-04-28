import { useState, useCallback } from "react";
import isBefore from "date-fns/isBefore";

import { useInterval } from "~hooks";
import { getDateDiff, min2ms, stringifyDateDiff } from "~utils";
import { Habit } from "../../_types";
import { createHabitActivityDate } from "../utils/getNextHabitActivityDate";

const recalcTimeLeft = (habitDate: Date): string => {
  const now = new Date();
  const dateDiff = getDateDiff(now, habitDate);
  const dateDiffStr: string = stringifyDateDiff(dateDiff) || "Now";

  const habitWasInPast = isBefore(habitDate, now); // hours and minutes are important here!
  if (habitWasInPast) {
    return `${dateDiffStr} ago`;
  } else {
    return `In ${dateDiffStr}`;
  }
};

/** Compares current date vs habit reminder time at a given day */
export const useHabitTimeLeft = (habit: Habit, day: Date): string => {
  const habitDate = createHabitActivityDate(habit, day);

  const [timeLeft, setTimeLeft] = useState(recalcTimeLeft(habitDate));

  const cb = useCallback(() => setTimeLeft(recalcTimeLeft(habitDate)), [
    habitDate,
  ]);
  useInterval(cb, min2ms(1));

  return timeLeft;
};
