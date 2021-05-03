import times from "lodash/times";
import { Habit, HabitColor, HabitCompletionStatus } from "../../_types";
import { AsyncData } from "~types";
import { getFromArray, getFromEnum } from "~utils";

export interface HabitStatus {
  habitId: Habit["id"];
  habitName: Habit["name"];
  habitColor: Habit["color"];
  status: HabitCompletionStatus;
}

export interface HabitDayStatus {
  dayIdx: number; // 0-30
  habits: HabitStatus[];
}

export type HabitStatusPerMonthData = HabitDayStatus[];

const mockHabitDayStatus = (i: number): HabitDayStatus => ({
  dayIdx: i,
  habits: times(i % 5, (j) => ({
    habitId: `${i + j}`,
    habitName: `Habit ${i + j}`,
    habitColor: getFromEnum(HabitColor, i + j),
    status: getFromArray(
      [HabitCompletionStatus.DONE, HabitCompletionStatus.NOT_DONE],
      i + j
    ),
  })),
});

export const useHabitStatuses = (
  shownMonth: Date
): AsyncData<HabitStatusPerMonthData> => {
  return {
    status: "success",
    data: times(31, mockHabitDayStatus),
  };
};
