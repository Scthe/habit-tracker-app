import { Habit, HabitCompletionStatus, HabitStatus } from "../../_types";
import { useGetHabit, useGetHabitStatusesSubscription } from "../../api";
import { getStatus } from "../../_shared";
import { deconstructDate, combineAsyncData } from "~utils";
import { AsyncData } from "~types";

export type HabitDetailsData =
  | null
  | (Habit & {
      status: HabitCompletionStatus;
    });

export const useDetailsData = (
  id: string,
  habit: Habit | undefined
): AsyncData<HabitDetailsData> => {
  // TODO today should refresh on 24.00AM
  const today = deconstructDate(new Date());
  const statusesAsync = useGetHabitStatusesSubscription(today);

  const alreadyHasHabit = habit != null;
  const habitAsync = useGetHabit(alreadyHasHabit ? undefined : id);

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
    alreadyHasHabit ? { status: "success", data: habit! } : habitAsync.data,
    statusesAsync
  );
};
