/* eslint-disable import/no-unused-modules */

import times from "lodash/times";
import {
  Habit,
  HabitColor,
  HabitRepetition,
  RepetitionDaily,
  RepetitionMonthlySummary,
  RepetitionWeekly,
  RepetitionWeeklySummary,
} from "..";
import { Weekday, createMock, getFromArray, getFromEnum } from "~utils";

const REPEAT_DAILY: RepetitionDaily = { type: "daily" };
const REPEAT_WEEKLY: RepetitionWeekly = {
  type: "weekly",
  weekdays: [Weekday.Sunday, Weekday.Thursday, Weekday.Friday],
};
const REPEAT_WEEKLY_SUMMARY: RepetitionWeeklySummary = {
  type: "weekly_summary",
  endsOn: Weekday.Friday,
};
const REPEAT_MONTHLY_SUMMARY: RepetitionMonthlySummary = {
  type: "monthly_summary",
  endsOn: 16,
};
const REPEATS: HabitRepetition[] = [
  REPEAT_DAILY,
  REPEAT_WEEKLY,
  REPEAT_WEEKLY_SUMMARY,
  REPEAT_MONTHLY_SUMMARY,
];

export const HabitMock = createMock<Habit>({
  id: "mock-id",
  name: "mock-name",
  color: HabitColor.Blue,
  description: "mock-description",
  reminderTime: { hour: 18, minute: 15 },
  repeat: REPEAT_DAILY,
  userId: "mock-user-id",
  createdAt: new Date("2021/1/20"),
  editedAt: new Date("2021/2/1"),
});

export const HabitsListMock = (count = 25, offset = 0): Habit[] =>
  times(count, (ii) => {
    const i = ii + offset;
    return HabitMock({
      id: `habit-${i}`,
      name: `Habit ${i}`,
      color: getFromEnum(HabitColor, i),
      repeat: getFromArray(REPEATS, i),
      reminderTime: { hour: i % 24, minute: (15 + i) % 60 },
    });
  });
