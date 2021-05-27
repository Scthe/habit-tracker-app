import { HabitRepetition, HabitRepetitionHistory } from "pages/habits/_types";
import { DayOfYear, isDayInFuture } from "utils/date";

/**
 * Find habit repeat data that were on that date.
 * Returns `null` if habit does not exist on that date
 */
export const getHabitRepeatDataForDay = (
  repeatHistory: HabitRepetitionHistory,
  date: DayOfYear
): HabitRepetition | null => {
  const firstInvalidItemIdx = repeatHistory.findIndex((r) =>
    isDayInFuture(r.dateFrom, date)
  );

  if (firstInvalidItemIdx === 0) {
    // habit did not exist back then
    return null;
  }
  if (firstInvalidItemIdx === -1) {
    // habit was not edited between $date and today, take last edit
    return repeatHistory[repeatHistory.length - 1].repeat;
  }
  return repeatHistory[firstInvalidItemIdx - 1].repeat;
};
