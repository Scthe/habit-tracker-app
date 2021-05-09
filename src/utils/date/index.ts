export * from "./DayOfYear";
export * from "./dateDiff";

import clamp from "lodash/clamp";
import eachDayOfInterval from "date-fns/eachDayOfInterval";
import lastDayOfWeek from "date-fns/lastDayOfWeek";
import startOfWeek from "date-fns/startOfWeek";
import format from "date-fns/format";
import getDaysInMonth from "date-fns/getDaysInMonth";

import { getFromArray } from "../index";
import { createDateFromDay } from "./DayOfYear";

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

export interface MonthOfYear {
  month: number; // 0-11
  year: number;
}
export const createDateFromMonth = (m: MonthOfYear): Date =>
  createDateFromDay({ ...m, day: 16 });

export const deconstructDateToMonth = (d: Date): MonthOfYear => ({
  month: d.getMonth(),
  year: d.getFullYear(),
});

/** Ensure the returned day is valid in this month. e.g. no 31st of February */
export const clampToMonthLength = (day: number, month: MonthOfYear): number => {
  const daysInMonth = getDaysInMonth(createDateFromMonth(month));
  return clamp(day, 0, daysInMonth);
};
