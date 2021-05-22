import { Weekday } from "utils/date";

export type TimeDisplay = "12h" | "24h";

// TODO update using partial field update in firebase?
export interface UserPreferences {
  firstDayOfWeek: Weekday;
  clockDisplay: TimeDisplay;
}
