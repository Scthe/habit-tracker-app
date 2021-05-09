/* eslint-disable import/no-unused-modules */

import { HabitStatus, HabitCompletionStatus, HabitColor } from "..";
import { getFromArray, getFromEnum } from "~utils";

export const mockHabitDayStatus = (i = 0): HabitStatus => ({
  habitId: `habit ${i}`,
  habitName: `Habit ${i}`,
  habitColor: getFromEnum(HabitColor, i),
  status: getFromArray(
    [HabitCompletionStatus.DONE, HabitCompletionStatus.NOT_DONE],
    i
  ),
  userId: "mock-user-id",
  day: { day: i % 31, month: 1, year: 1 },
});
