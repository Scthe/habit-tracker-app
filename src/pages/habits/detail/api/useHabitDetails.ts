import { AsyncData } from "~types";
import { Habit } from "../../_types";
import { HabitMock } from "../../_types/mocks/Habit";

export const useHabitDetails = (id: Habit["id"]): AsyncData<Habit> => {
  return {
    status: "success",
    data: HabitMock({ id }),
  };
};
