import times from "lodash/times";

import { canFinishHabitOnDayImpl } from "./internal/canFinishHabitOnDayImpl";
import { getHabitRepeatDataForDay } from "./internal/getHabitRepeatDataForDay";
import { showHabitOnDayImpl } from "./internal/showHabitOnDayImpl";

import { HabitRepetition, HabitRepetitionHistory } from "pages/habits/_types";
import { addDays, DayOfYear, deconstructDate } from "utils/date";

/**
 * Should we even show this habit?
 * e.g. On Tuesday do not show habits from Monday and Friday
 */
export const showHabitOnDay = (
  repeatHistory: HabitRepetitionHistory,
  day: DayOfYear
): boolean => {
  const repeat = getHabitRepeatDataForDay(repeatHistory, day);
  if (repeat == null) {
    return false;
  }
  return showHabitOnDayImpl(repeat, day);
};

/**
 * Can we mark this habit as done?
 * e.g. we cannot complete habits that are 10 days overdue, or ones 2months from now.
 */
export const canFinishHabitOnDay = (
  repeatHistory: HabitRepetitionHistory,
  day: DayOfYear
): "is-doable" | "is-not-doable" | "did-not-exist-back-then" => {
  const repeat = getHabitRepeatDataForDay(repeatHistory, day);
  if (repeat == null) {
    return "did-not-exist-back-then";
  }
  return canFinishHabitOnDayImpl(repeat, day);
};

/**
 * The result is always either today or in the future.
 * Returns `null` if habit is not doable at all. Should not happen ATM, but if we added delete?
 */
export const getNextDateWhenHabitIsDoable = (
  repeatHistory: HabitRepetitionHistory
): DayOfYear | null => {
  const todayDate = new Date();
  const todayDay = deconstructDate(todayDate);

  // search next 31 days for suitable date. There are ways to calculate this that are simpler,
  // but it would require to actually write the code.
  const days = times(32, (i) => addDays(todayDay, i));
  return days.find((day) => canFinishHabitOnDay(repeatHistory, day))!;
};

export const getCurrentRepeatData = (
  repeatHistory: HabitRepetitionHistory
): HabitRepetition | null => {
  const todayDate = new Date();
  const todayDay = deconstructDate(todayDate);
  return getHabitRepeatDataForDay(repeatHistory, todayDay);
};
