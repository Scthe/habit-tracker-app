import clamp from "lodash/clamp";
import isEqual from "lodash/isEqual";
import getDay from "date-fns/getDay";
import addDaysToDate from "date-fns/addDays";
import addMonthsToDate from "date-fns/addMonths";
import differenceInCalendarDays from "date-fns/differenceInCalendarDays";

import { Weekday } from ".";
import {
  WeekdayFmt,
  getWeekdayName as getWeekdayNameFromDayIdx,
} from "./index";

/**
 * Like `Date`, but does not have hours, minutes etc.
 * Special type to avoid errors when isBefore etc. works incorrectly
 * even though is same day.
 */
export interface DayOfYear {
  day: number; // 0-31
  month: number; // 1-12. Does not match Date.getMonth(), which starts at 0 (and is terrible to debug..)
  year: number;
}

export const deconstructDate = (d: Date): DayOfYear => ({
  day: d.getDate(),
  month: d.getMonth() + 1,
  year: d.getFullYear(),
});

export const stringifyDay = (d: DayOfYear): string =>
  `${d.year}-${d.month}-${d.day}`;

export const createDateFromDay = (
  d: DayOfYear,
  hour?: number,
  minute?: number
): Date => {
  const date = new Date(`${d.year}-${d.month}-${d.day}`);
  if (hour != undefined) {
    date.setHours(clamp(hour, 0, 23));
  }
  if (minute != undefined) {
    date.setMinutes(clamp(minute, 0, 59));
  }
  return date;
};

export const getWeekdayFromDay = (d: DayOfYear): Weekday => {
  return getDay(createDateFromDay(d));
};

export const getWeekdayNameFromDay = (
  day: DayOfYear,
  fmtStr: WeekdayFmt
): string => {
  const weekday = getWeekdayFromDay(day);
  return getWeekdayNameFromDayIdx(weekday, fmtStr);
};

/////////////////
// relative: past, today, future

export const isDayInPast = (
  checkedDay: DayOfYear,
  referencePoint: DayOfYear
): boolean => {
  if (checkedDay.year < referencePoint.year) {
    return true;
  }
  if (
    checkedDay.year === referencePoint.year &&
    checkedDay.month < referencePoint.month
  ) {
    return true;
  }
  if (
    checkedDay.year === referencePoint.year &&
    checkedDay.month === referencePoint.month &&
    checkedDay.day < referencePoint.day
  ) {
    return true;
  }
  return false;
};

export const isDayInFuture = (
  checkedDay: DayOfYear,
  referencePoint: DayOfYear
): boolean =>
  !isDayInPast(checkedDay, referencePoint) &&
  !isSameDay(checkedDay, referencePoint);

export const isSameDay = (
  checkedDay: DayOfYear,
  referencePoint: DayOfYear
): boolean => isEqual(checkedDay, referencePoint);

export type DaysRelation = "past" | "today" | "future";

export const daysRelative = (
  checkedDay: DayOfYear,
  referencePoint: DayOfYear
): DaysRelation => {
  if (isSameDay(checkedDay, referencePoint)) {
    return "today";
  }
  return isDayInPast(checkedDay, referencePoint) ? "past" : "future";
};

export const relativeToToday = (checkedDay: DayOfYear): DaysRelation => {
  return daysRelative(checkedDay, deconstructDate(new Date()));
};

/////////////////
// operations: add

export const addDays = (date: DayOfYear, days: number): DayOfYear => {
  const d = createDateFromDay(date);
  const nextDate = addDaysToDate(d, days);
  return deconstructDate(nextDate);
};

export const addMonths = (date: DayOfYear, months: number): DayOfYear => {
  const d = createDateFromDay(date);
  const nextDate = addMonthsToDate(d, months);
  return deconstructDate(nextDate);
};

/** How many days between 2 dates. Can be negative if `dateRight` is before `dateLeft`. */
export const differenceInDays = (
  dateLeft: DayOfYear,
  dateRight: DayOfYear
): number => {
  return differenceInCalendarDays(
    createDateFromDay(dateLeft),
    createDateFromDay(dateRight)
  );
};
