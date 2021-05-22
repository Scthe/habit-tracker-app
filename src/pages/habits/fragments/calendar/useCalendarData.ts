import times from "lodash/times";

import { Habit, HabitCompletionStatus, HabitStatus } from "../../_types";
import { useGetHabits, useGetHabitStatuses } from "../../api";
import { getStatus, showHabitOnDay } from "../../utils";
import { combineAsyncData } from "utils";
import { DayOfYear, MonthOfYear } from "utils/date";
import { AsyncData } from "~types";

export type HabitWithStatus = Habit & { status: HabitCompletionStatus };

interface HabitsForDay {
  day: DayOfYear;
  habits: HabitWithStatus[];
}
export type CalendarData = HabitsForDay[];

export const useCalendarData = (date: MonthOfYear): AsyncData<CalendarData> => {
  const habitsAsync = useGetHabits();
  const statusesAsync = useGetHabitStatuses(date);

  const createItems = (
    allHabits: Habit[],
    allStatuses: HabitStatus[]
  ): CalendarData => {
    const createDayData = (dayNo: number): HabitsForDay => {
      const day: DayOfYear = { ...date, day: dayNo };
      const habits = allHabits!.filter((h) => showHabitOnDay(h.repeat, day));
      return {
        day,
        habits: habits.map((habit) => ({
          ...habit,
          status: getStatus(habit.id, day, allStatuses),
        })),
      };
    };
    const daysInMonth = 31; // might as well.. No huge optimization here.
    return times(daysInMonth).map((i) => createDayData(i + 1));
  };

  return combineAsyncData(createItems, habitsAsync.data, statusesAsync.data);
};
