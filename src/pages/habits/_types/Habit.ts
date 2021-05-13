import { HabitColor } from "./HabitColor";
import { HabitRepetition } from "./HabitRepetition";

/*
TODO [requirement] Agenda for days past can contain habits that are now disabled/removed.
The repetition could also have changed (e.g. Mon, Fri turned into Wed). Options:

  - CRON
  - store (changeDate, repeat) on create/edit and should be good enough?
     Then sort and binary search for value back then
*/

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
  /** Do soemthing everyday, on selected days etc. */
  repeat: HabitRepetition;
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
