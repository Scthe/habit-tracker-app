import times from "lodash/times";
import addDays from "date-fns/addDays";
import eachWeekOfInterval from "date-fns/eachWeekOfInterval";
import endOfMonth from "date-fns/endOfMonth";
import lastDayOfWeek from "date-fns/lastDayOfWeek";
import startOfMonth from "date-fns/startOfMonth";
import startOfWeek from "date-fns/startOfWeek";
import format from "date-fns/format";

import {
  createDateFromDay,
  createDateFromMonth,
  DayOfYear,
  deconstructDate,
  getWeekdayName,
  MonthOfYear,
  Weekday,
  WeekdayFmt,
} from "utils/date";
import { TimeDisplay, useUserPreferences } from "~storage";

const getWeekStartEndDays = (weekStartsOn: Weekday) => {
  return (dayOfYear: DayOfYear): [DayOfYear, DayOfYear] => {
    const date = createDateFromDay(dayOfYear);
    const day0 = startOfWeek(date, { weekStartsOn });
    const day7 = lastDayOfWeek(date, { weekStartsOn });
    return [deconstructDate(day0), deconstructDate(day7)];
  };
};

const constructWeek = (startDate: Date) => [
  deconstructDate(startDate),
  ...times(6, (i) => deconstructDate(addDays(startDate, i + 1))),
];

const getDaysInCalendar = (weekStartsOn: Weekday) => {
  return (month: MonthOfYear): Array<DayOfYear[]> => {
    const date = createDateFromMonth(month);
    const weeksStarts = eachWeekOfInterval(
      {
        start: startOfMonth(date),
        end: endOfMonth(date),
      },
      { weekStartsOn }
    );

    return weeksStarts.map(constructWeek);
  };
};

const formatTime = (timeDisplay: TimeDisplay) => {
  return (hour: number, minute: number) => {
    const dd = new Date();
    dd.setHours(hour, minute);
    const fmtStr = timeDisplay === "12h" ? "h:m a" : "H:m";
    return format(dd, fmtStr);
  };
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useUserDateSettings = () => {
  const userPreferences = useUserPreferences();
  const { firstDayOfWeek, timeDisplay } = userPreferences;

  const dayIndices = times(7, (i) => (firstDayOfWeek + i) % 7);

  return {
    dayIndices,
    getWeekStartEndDays: getWeekStartEndDays(firstDayOfWeek),
    getDaysInCalendar: getDaysInCalendar(firstDayOfWeek),
    getWeekdays: (fmt: WeekdayFmt) =>
      dayIndices.map((id) => ({
        name: getWeekdayName(id, fmt),
        id: id,
      })),
    formatTime: formatTime(timeDisplay),
  };
};

export type UserDateUtils = ReturnType<typeof useUserDateSettings>;
