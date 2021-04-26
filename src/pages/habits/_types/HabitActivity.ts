export enum HabitResult {
  /**
   * Can be marked as done. Either daily task, but habit with
   * summary repeatition can also be marked before that day.
   * Never for past dates.
   */
  ACTIVE,
  /** In the future. */
  NOT_YET_ACTIVE,
  /** Completed successfully */
  DONE,
  /** Completed UNsuccessfully. Can only be for past events */
  FAILED, // print as "Missed"
  /** We can temporarly disable a habit */
  // WAS_DISABLED, // TODO habits can be disabled
}

/** State of a habit at a given day */
// interface HabitDailyStatus {
// id: string;
// status: HabitResult;
// date: Date; // includes reminder hour. Store in DB as "DD-MM-YYYY"
// }

/** Summary of the habit for a given days */
// export interface HabitActivity {
// id: string;
// habit: Habit;
// statuses: HabitDailyStatus[];
// }
