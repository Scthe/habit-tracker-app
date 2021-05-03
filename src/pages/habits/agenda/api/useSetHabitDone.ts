import { Habit, HabitCompletionStatus } from "../../_types";

type SetHabitDoneStatusFn = (
  date: Date,
  habitId: Habit["id"],
  nextStatus: HabitCompletionStatus
) => Promise<void>;

export const useSetHabitDone = (): SetHabitDoneStatusFn => {
  return async (
    date: Date,
    habitId: Habit["id"],
    nextStatus: HabitCompletionStatus
  ) => {
    console.log(`Habit '${habitId}', set '${nextStatus}' for ${date}`);
  };
};
