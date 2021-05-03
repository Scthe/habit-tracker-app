import { Habit } from "../../_types";
import { HabitMock } from "../../_types/mocks/Habit";
import { AsyncData } from "~types";

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
