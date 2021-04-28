export enum HabitCompletionStatus {
  /** Completed successfully */
  DONE = "done",
  /** Completed UNsuccessfully. Can only be for past events */
  NOT_DONE = "not_done", // print as "Missed"
}
export const getOppositeStatus = (
  status: HabitCompletionStatus
): HabitCompletionStatus =>
  status === HabitCompletionStatus.DONE
    ? HabitCompletionStatus.NOT_DONE
    : HabitCompletionStatus.DONE;

/** State of a habit at a given day */
// interface HabitDailyStatus {
// id: string;
// status: HabitCompletionStatus;
// date: Date; // includes reminder hour. Store in DB as "DD-MM-YYYY"
// }

/** Summary of the habit for a given days */
// export interface HabitActivity {
// id: string;
// habit: Habit;
// statuses: HabitDailyStatus[];
// }
