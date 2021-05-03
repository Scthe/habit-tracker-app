import { Theme } from "@material-ui/core/styles";

import green from "@material-ui/core/colors/green";
import red from "@material-ui/core/colors/red";
import blue from "@material-ui/core/colors/blue";
import pink from "@material-ui/core/colors/pink";
import purple from "@material-ui/core/colors/purple";
import cyan from "@material-ui/core/colors/cyan";
import teal from "@material-ui/core/colors/teal";
import lime from "@material-ui/core/colors/lime";
import yellow from "@material-ui/core/colors/yellow";
import orange from "@material-ui/core/colors/orange";
import { assertUnreachable } from "~utils";

export enum HabitColor {
  Transparent,
  Red,
  Pink,
  Purple,
  Blue,
  Cyan,
  Teal,
  Green,
  Lime,
  Yellow,
  Orange,
}
export const HabitColorList = [
  HabitColor.Transparent,
  HabitColor.Red,
  HabitColor.Pink,
  HabitColor.Purple,
  HabitColor.Blue,
  HabitColor.Cyan,
  HabitColor.Teal,
  HabitColor.Green,
  HabitColor.Lime,
  HabitColor.Yellow,
  HabitColor.Orange,
];

// TODO move this to some utils or smth.
export const getHabitHtmlColor = (c: HabitColor): string => {
  switch (c) {
    case HabitColor.Transparent:
      return "#00000000";
    case HabitColor.Red:
      return red["500"];
    case HabitColor.Pink:
      return pink["500"];
    case HabitColor.Purple:
      return purple["500"];
    case HabitColor.Blue:
      return blue["500"];
    case HabitColor.Cyan:
      return cyan["500"];
    case HabitColor.Teal:
      return teal["500"];
    case HabitColor.Green:
      return green["500"];
    case HabitColor.Lime:
      return lime["500"];
    case HabitColor.Yellow:
      return yellow["500"];
    case HabitColor.Orange:
      return orange["500"];
    default:
      return assertUnreachable(c); // compile time error if some case is not handled
  }
};
export const getHabitHtmlTextColor = (theme: Theme, c: HabitColor): string => {
  switch (c) {
    case HabitColor.Transparent:
      return theme.palette.text.primary;
    default:
      return theme.palette.common.white;
  }
};

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
/** date-fn uses us locale that starts week with mondays */
// export type Weekday = DateFnDay;

// TODO Agenda for days past can contain habits that are now disabled/removed. The repetition
// could also have changed (e.g. Mon, Fri turned into Wed). Need CRON?

// export enum Status {
// Active,
// Disabled,
// Archived, // removed
// }

/** Do something every day */
export interface RepetitionDaily {
  type: "daily";
}
/** Do something only on Monday and Saturday. On that day treated as if it was daily.*/
export interface RepetitionWeekly {
  type: "weekly";
  weekdays: Weekday[];
}
/** e.g. "I want to read books for 6 hours every week". Reminder on Sundays. */
export interface RepetitionWeeklySummary {
  type: "weekly_summary";
  endsOn: Weekday;
}
/** e.g. "I want to read 6 books every month". Reminder on 20th. */
export interface RepetitionMonthlySummary {
  type: "monthly_summary";
  endsOn: number;
}

export type HabitRepetition =
  | RepetitionDaily
  | RepetitionWeekly
  | RepetitionWeeklySummary
  | RepetitionMonthlySummary;

/** How long will it take */
// export type HabitTimer = number | null;

/*
export interface HabitSubtask {
  name: string;
  description: string;
  timer: HabitTimer;
}*/

/** Habit - something done regularly.  */
export interface Habit {
  id: string;
  name: string;
  color: HabitColor;
  description: string;
  /** Do soemthing everyday, on selected days etc. */
  repeat: HabitRepetition;
  /** Remind me on 18:00 etc. */
  reminderTime: { hour: number; minute: number };
  /** Allow to add a countdown clock. */
  // timer: HabitTimer; // TODO timer
  // subtasks: HabitSubtask[];
  // status: Status; // TODO habits can be disabled
}
