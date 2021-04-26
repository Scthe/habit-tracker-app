import startOfWeek from "date-fns/startOfWeek";
import lastDayOfWeek from "date-fns/lastDayOfWeek";
import differenceInMinutes from "date-fns/differenceInMinutes";
import { pluralize1 } from "~utils";

export const sec2ms = (x: number) => Math.floor(x * 1000);
export const min2ms = (x: number) => sec2ms(x) * 60;
export const hours2ms = (x: number) => min2ms(x) * 60;
export const min2hours = (x: number) => Math.floor(x / 60);
export const hours2days = (x: number) => Math.floor(x / 24);

export const getWeekRange = (date: Date): [Date, Date] => {
  const monday = startOfWeek(date, { weekStartsOn: 1 }); // TODO locale?
  const sunday = lastDayOfWeek(date, { weekStartsOn: 1 });
  return [monday, sunday];
};

/** Remove hour/minute etc., so only day is left */
export const zeroeTime = (date: Date): Date => {
  const d = new Date(date);
  d.setHours(0);
  d.setMinutes(0);
  d.setSeconds(0);
  d.setMilliseconds(0);
  return d;
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
