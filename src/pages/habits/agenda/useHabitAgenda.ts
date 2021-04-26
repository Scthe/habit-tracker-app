import { AsyncData } from "~types";
import { getFromEnum } from "~utils";
import { Habit, HabitResult } from "../_types";
import { HabitsListMock } from "../_types/mocks/Habit";

export interface HabitAgendaItem {
  id: string;
  habit: Habit;
  status: HabitResult;
}

export const useHabitAgenda = (date: Date): AsyncData<HabitAgendaItem[]> => {
  const habits = HabitsListMock(15, date.getDate());

  const agenda: HabitAgendaItem[] = habits.map((habit, i) => ({
    id: String(i),
    habit,
    status: getFromEnum(HabitResult, i),
  }));

  return {
    status: "success",
    data: agenda,
  };
};
