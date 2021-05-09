import times from "lodash/times";
import { HabitColor, HabitCompletionStatus, HabitStatus } from "../../_types";
import { getFromArray, getFromEnum, MonthOfYear } from "~utils";
import { useLoggedUser } from "~storage";
import { UseFirestoreOnceType } from "~firebaseUtils";

/*
Use cases:
- agenda: (all habits, statuses for a single day)
- calendar: (all habits, statuses for a month)
- details:
  today status (one habit, statuses for a day)
  monthly statuses for a single habitId (one habit, statuses for a month)
*/

// Used in calendar
// Get all habit statuses (done/not done) for a given month

const mockHabitDayStatus = (i: number): HabitStatus => ({
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

const mockData = times(64, mockHabitDayStatus);

export const useGetHabitStatuses = ({
  month,
  year,
}: MonthOfYear): UseFirestoreOnceType<HabitStatus[]> => {
  const user = useLoggedUser();
  const asyncData = {
    status: "success" as const,
    data: mockData.map((e) => ({
      ...e,
      userId: user.uid,
      day: { day: e.day.day, month, year },
    })),
  };

  return {
    data: asyncData,
    currentPromise: null,
    refetch: () => Promise.resolve([]),
  };
};
