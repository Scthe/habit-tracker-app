import { Habit, HabitCompletionStatus, HabitStatus } from "../../_types";
import { useGetHabits, useGetHabitStatusesSubscription } from "../../api";
import { getStatus, showHabitOnDay } from "../../utils";
import { combineAsyncData, DayOfYear } from "~utils";
import { AsyncData } from "~types";
import { times } from "lodash";
import { HabitMock, HabitsListMock } from "pages/habits/_types/mocks/Habit";

export interface HabitAgendaItem {
  habit: Habit;
  status: HabitCompletionStatus;
}

export const useAgendaData = (
  date: DayOfYear
): AsyncData<HabitAgendaItem[]> => {
  /*
  const habitsAsync = useGetHabits();
  const statusesAsync = useGetHabitStatusesSubscription(date);

  const createHabitAgendaItems = (
    allHabits: Habit[],
    allStatuses: HabitStatus[]
  ): HabitAgendaItem[] => {
    const habits = allHabits!.filter((h) => showHabitOnDay(h.repeat, date));
    const agendaItems: HabitAgendaItem[] = habits.map((habit) => ({
      habit,
      status: getStatus(habit.id, date, allStatuses),
    }));
    return agendaItems;
  };

  return combineAsyncData(
    createHabitAgendaItems,
    habitsAsync.data,
    statusesAsync
  );
  */
  return {
    status: "success",
    data: HabitsListMock().map((h, i) => ({
      habit: h,
      status: HabitCompletionStatus.DONE,
    })),
  };
};
