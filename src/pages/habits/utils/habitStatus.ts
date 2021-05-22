import { Habit, HabitCompletionStatus, HabitStatus } from "pages/habits/_types";
import { DayOfYear, isSameDay } from "utils/date";

export const getStatus = (
  habitId: Habit["id"],
  day: DayOfYear,
  statuses: HabitStatus[]
): HabitCompletionStatus => {
  const status = statuses.find(
    (status) => status.habitId === habitId && isSameDay(day, status.day)
  );
  return status?.status || HabitCompletionStatus.NOT_DONE;
};
