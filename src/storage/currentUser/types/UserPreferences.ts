import { Weekday } from "utils/date";

export type TimeDisplay = "12h" | "24h";

export interface UserPreferences {
  firstDayOfWeek: Weekday;
  timeDisplay: TimeDisplay;
}

export const DEFAULT_PREFERENCES: UserPreferences = {
  firstDayOfWeek: Weekday.Monday,
  timeDisplay: "12h",
};
