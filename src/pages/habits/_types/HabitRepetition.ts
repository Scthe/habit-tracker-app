import { Weekday } from "~utils";

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
