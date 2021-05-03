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
