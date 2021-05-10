import { Habit, HabitCompletionStatus, HabitStatus } from "../_types";
import { useGetHabit, useGetHabitStatusesSubscription } from "../api";
import { getStatus } from "../_shared";
import { deconstructDate, combineAsyncData } from "~utils";
import { AsyncData } from "~types";

type HabitDetailsData =
  | null
  | (Habit & {
      status: HabitCompletionStatus;
    });

export const useDetailsData = (id: string): AsyncData<HabitDetailsData> => {
  // TODO today should refresh on 24.00AM
  const today = deconstructDate(new Date());
  const habitAsync = useGetHabit(id);
  const statusesAsync = useGetHabitStatusesSubscription(today);

  const createHabitAgendaItems = (
    habit: Habit | null,
    allStatuses: HabitStatus[]
  ): HabitDetailsData => {
    return habit != null
      ? {
          ...habit,
          status: getStatus(habit.id, today, allStatuses),
        }
      : null;
  };

  return combineAsyncData(
    createHabitAgendaItems,
    habitAsync.data,
    statusesAsync
  );
};
