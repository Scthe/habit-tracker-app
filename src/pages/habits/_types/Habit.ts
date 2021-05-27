import { HabitColor } from "./HabitColor";
import { HabitRepetitionHistory } from "./HabitRepetition";

// TODO [feature] delete habits

// export enum Status {
// Active,
// Disabled,
// Archived, // removed
// }

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
  /** Do something everyday, on selected days etc.
   * This can be edited over time, so we need historical data
   */
  repeat: HabitRepetitionHistory;
  /** Remind me on 18:00 etc. */
  reminderTime: { hour: number; minute: number };
  /** Allow to add a countdown clock. */
  // timer: HabitTimer; // TODO [feature] timer. Prevent device sleep
  // subtasks: HabitSubtask[]; // TODO [feature] subtasks
  // status: Status; // TODO [feature] habits can be disabled
  createdAt: Date; // needs hour
  editedAt: Date; // needs hour
  userId: string;
  // TODO [feature] implement delete as `deletedAt: Date`, manually filter this from views. It's tombstone, not actual delete
  // TODO [feature] reward
}
