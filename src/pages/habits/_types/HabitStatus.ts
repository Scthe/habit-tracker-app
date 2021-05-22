import { Habit } from "./Habit";
import { DayOfYear } from "utils/date";

export enum HabitCompletionStatus {
  /** Completed successfully */
  DONE = "done",
  /** Completed UNsuccessfully. Can only be for past events */
  NOT_DONE = "not_done", // print as "Missed"
}
export const getOppositeStatus = (
  status: HabitCompletionStatus
): HabitCompletionStatus => {
  return status === HabitCompletionStatus.DONE
    ? HabitCompletionStatus.NOT_DONE
    : HabitCompletionStatus.DONE;
};

export interface HabitStatus {
  habitId: Habit["id"];
  status: HabitCompletionStatus;
  day: DayOfYear; // serialize as string in firebase?
  userId: string;
}
