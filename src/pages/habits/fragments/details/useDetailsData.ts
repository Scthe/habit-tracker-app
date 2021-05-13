import { Habit, HabitCompletionStatus, HabitStatus } from "../../_types";
import { useGetHabit, useGetHabitStatusesSubscription } from "../../api";
import { getStatus } from "../../utils";
import { deconstructDate, combineAsyncData } from "~utils";
import { AsyncData } from "~types";

type HabitDetailsData = Habit & {
  status: HabitCompletionStatus;
};

export const useDetailsData = (
  id: string,
  habit: Habit | undefined
): AsyncData<HabitDetailsData> => {
  // TODO [error] today should refresh on 24.00AM
  const today = deconstructDate(new Date());
  const statusesAsync = useGetHabitStatusesSubscription(today);

  const alreadyHasHabit = habit != null;
  const habitAsyncRequest = useGetHabit(alreadyHasHabit ? undefined : id);
  const habitAsync = alreadyHasHabit
    ? {
        status: "success" as const,
        data: habit!,
      }
    : habitAsyncRequest.data;

  const createHabitAgendaItems = (
    habit: Habit | null,
    allStatuses: HabitStatus[]
  ): HabitDetailsData => {
    return {
      ...habit!,
      status: getStatus(habit!.id, today, allStatuses),
    };
  };

  return combineAsyncData(createHabitAgendaItems, habitAsync, statusesAsync);
};
