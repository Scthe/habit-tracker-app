import { AsyncData } from "~types";
import { Habit, HabitCompletionStatus } from "../../_types";
import { HabitMock } from "../../_types/mocks/Habit";

export interface HabitAgendaItem {
  id: string;
  habit: Habit;
  status: HabitCompletionStatus;
}

// TODO remove, use location.state instead
export const useGetHabit = (id?: Habit["id"]): AsyncData<Habit> | null => {
  if (id == null) {
    return null;
  }
  return {
    status: "success",
    data: HabitMock({ id }),
  };
};
