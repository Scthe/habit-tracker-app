export enum HabitColor {
  Transparent,
  Red,
  Green,
  Blue,
}

export enum Weekday {
  Monday = "monday",
  Tuesday = "tuesday",
  Wednesday = "wednesday",
  Thursday = "thursday",
  Friday = "friday",
  Saturday = "saturday",
  Sunday = "sunday",
}

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
