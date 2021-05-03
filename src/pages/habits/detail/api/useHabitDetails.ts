import { Habit } from "../../_types";
import { HabitMock } from "../../_types/mocks/Habit";
import { AsyncData } from "~types";

export const useHabitDetails = (id: Habit["id"]): AsyncData<Habit> => {
  return {
    status: "success",
    data: HabitMock({ id }),
  };
};
