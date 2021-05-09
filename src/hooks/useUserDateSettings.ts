import times from "lodash/times";
import addDays from "date-fns/addDays";
import eachWeekOfInterval from "date-fns/eachWeekOfInterval";
import endOfMonth from "date-fns/endOfMonth";
import lastDayOfWeek from "date-fns/lastDayOfWeek";
import startOfMonth from "date-fns/startOfMonth";
import startOfWeek from "date-fns/startOfWeek";

import {
  createDateFromDay,
  createDateFromMonth,
  DayOfYear,
  deconstructDate,
  getWeekdayName,
  MonthOfYear,
  Weekday,
  WeekdayFmt,
} from "~utils";

const getWeekStartEndDays = (weekStartsOn: Weekday) => {
  return (dayOfYear: DayOfYear): [DayOfYear, DayOfYear] => {
    const date = createDateFromDay(dayOfYear);
    const monday = startOfWeek(date, { weekStartsOn });
    const sunday = lastDayOfWeek(date, { weekStartsOn });
    return [deconstructDate(monday), deconstructDate(sunday)];
  };
};

const constructWeek = (startDate: Date) => [
  deconstructDate(startDate),
  ...times(6, (i) => deconstructDate(addDays(startDate, i))),
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

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useUserDateSettings = () => {
  const firstDayOfWeek: Weekday = Weekday.Friday; // TODO get from settings

  const dayIndices = times(7, (i) => firstDayOfWeek + i);

  return {
    dayIndices,
    getWeekStartEndDays: getWeekStartEndDays(firstDayOfWeek),
    getDaysInCalendar: getDaysInCalendar(firstDayOfWeek),
    getWeekdayNames: (fmt: WeekdayFmt) =>
      dayIndices.map((di) => getWeekdayName(di, fmt)),
  };
};

export type UserDateUtils = ReturnType<typeof useUserDateSettings>;
