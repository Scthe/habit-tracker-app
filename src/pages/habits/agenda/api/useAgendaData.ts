import { Habit, HabitCompletionStatus } from "../../_types";
import { HabitsListMock } from "../../_types/mocks/Habit";
import { AsyncData } from "~types";
import { getFromEnum } from "~utils";

export interface HabitAgendaItem {
  id: string;
  habit: Habit;
  status: HabitCompletionStatus;
}

export const useAgendaData = (date: Date): AsyncData<HabitAgendaItem[]> => {
  const habits = HabitsListMock(15, date.getDate());

  const agenda: HabitAgendaItem[] = habits.map((habit, i) => ({
    id: String(i),
    habit,
    status: getFromEnum(HabitCompletionStatus, i),
  }));

  return {
    status: "success",
    data: agenda,
  };
};
