import differenceInMinutes from "date-fns/differenceInMinutes";

import { pluralize1 } from "../index";
import { hours2days, min2hours } from ".";

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
