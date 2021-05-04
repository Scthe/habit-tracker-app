import { HabitColor } from "./HabitColor";
import { HabitRepetition } from "./HabitRepetition";

// TODO Agenda for days past can contain habits that are now disabled/removed. The repetition
// could also have changed (e.g. Mon, Fri turned into Wed). Need CRON?

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
  // timer: HabitTimer; // TODO [feature] timer
  // subtasks: HabitSubtask[]; // TODO [feature] subtasks
  // status: Status; // TODO [feature] habits can be disabled
}
