import { AsyncData } from "~types";
import { sortStringCmpFn } from "~utils";
import { Habit } from "../../_types";
import { HabitsListMock } from "../../_types/mocks/Habit";

export const useHabits = (): AsyncData<Habit[]> => {
  return {
    status: "success",
    data: HabitsListMock(15).sort((a, b) => sortStringCmpFn(a.name, b.name)),
  };
};
