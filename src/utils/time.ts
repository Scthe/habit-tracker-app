import differenceInMinutes from "date-fns/differenceInMinutes";
import getDaysInMonth from "date-fns/getDaysInMonth";
import setDate from "date-fns/setDate";
import isBefore from "date-fns/isBefore";
import eachDayOfInterval from "date-fns/eachDayOfInterval";
import lastDayOfWeek from "date-fns/lastDayOfWeek";
import startOfWeek from "date-fns/startOfWeek";
import format from "date-fns/format";

import { getFromArray, pluralize1 } from "~utils";

export enum Weekday {
  Monday = 1,
  Tuesday = 2,
  Wednesday = 3,
  Thursday = 4,
  Friday = 5,
  Saturday = 6,
  Sunday = 0,
}

/** Order is random, so that you use User's first day of the week preferences,
 * and not this list. This array should only be used with `.includes` or tests. */
export const ALL_WEEK_DAYS: Weekday[] = [
  Weekday.Thursday,
  Weekday.Wednesday,
  Weekday.Saturday,
  Weekday.Tuesday,
  Weekday.Monday,
  Weekday.Sunday,
  Weekday.Friday,
];

const WEEK_7_DAYS_ARRAY = (() => {
  const date = new Date();
  return eachDayOfInterval({
    start: startOfWeek(date),
    end: lastDayOfWeek(date),
  });
})();

export type WeekdayFmt = "N" | "NN" | "NNN" | "NNNN";

export const getWeekdayName = (
  weekday: Weekday,
  fmtStr: WeekdayFmt
): string => {
  // there is some stupid ISO standard for this? Cause 'EEEEEE' for [Mo, Tu, ...] does not make sense..
  const fmtBetterPatterns = {
    N: "EEEEE", // M, T, W, T, F, S, S
    NN: "EEEEEE", // Mo, Tu, We, Th, Fr, Su, Sa
    NNN: "E", // Mon, Tue, Wed, ..., Sun
    NNNN: "EEEE", // Monday, Tuesday, ..., Sunday
  };

  const day = getFromArray(WEEK_7_DAYS_ARRAY, weekday);
  return format(day, fmtBetterPatterns[fmtStr]);
};

export const sec2ms = (x: number): number => Math.floor(x * 1000);
export const min2ms = (x: number): number => sec2ms(x) * 60;
export const hours2ms = (x: number): number => min2ms(x) * 60;
export const min2hours = (x: number): number => Math.floor(x / 60);
export const hours2days = (x: number): number => Math.floor(x / 24);

/** Remove hour/minute etc., so only day is left */
export const zeroeTime = (date: Date): Date => {
  const d = new Date(date);
  d.setHours(0);
  d.setMinutes(0);
  d.setSeconds(0);
  d.setMilliseconds(0);
  return d;
};

/** careful, we cannot set 31st of february etc.! */
export const setDateOfMonth = (date: Date, dayOfMonth: number): Date => {
  const fixedDayOfMonth = Math.min(dayOfMonth, getDaysInMonth(date));
  return setDate(date, fixedDayOfMonth);
};

/** Check if day is before today. Works on calendar days, so hours/minutes are ignored. */
export const isPastDate = (date_: Date): boolean => {
  const checkedDate = zeroeTime(date_);
  const nowDate = zeroeTime(new Date());
  return isBefore(checkedDate, nowDate);
};

export interface DateDiff {
  days: number;
  /** 0-23 */
  hours: number;
  /** 0-60 */
  minutes: number;
}

export const getDateDiff = (dateA: Date, dateB: Date): DateDiff => {
  const minuteDiff = Math.abs(differenceInMinutes(dateA, dateB));
  const hourDiff = min2hours(minuteDiff);
  const dayDiff = hours2days(hourDiff);
  return {
    days: dayDiff,
    hours: hourDiff - dayDiff * 24,
    minutes: minuteDiff % 60,
  };
};

export const stringifyDateDiff = (dDiff: DateDiff): string | null => {
  const parts: string[] = [];

  if (dDiff.days > 0) {
    parts.push(`${dDiff.days} ${pluralize1(dDiff.days, "day", "days")}`);
  }
  if (dDiff.hours > 0) {
    parts.push(`${dDiff.hours} ${pluralize1(dDiff.hours, "hour", "hours")}`);
  }
  if (dDiff.minutes > 0) {
    parts.push(
      `${dDiff.minutes} ${pluralize1(dDiff.minutes, "minute", "minutes")}`
    );
  }

  if (parts.length === 0) {
    // 0days, 0hours, 0minutes,
    return null;
  }
  return parts.slice(0, 2).join(", ");
};
