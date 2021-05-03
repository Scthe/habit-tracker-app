import {
  array,
  Describe,
  intersection,
  literal,
  number,
  object,
  refine,
  size,
  string,
  union,
} from "superstruct";
import {
  HabitColorList,
  RepetitionDaily,
  RepetitionMonthlySummary,
  RepetitionWeekly,
  RepetitionWeeklySummary,
} from "../_types";
import { FormValues } from "./useFormInitValues";

const HabitColor = refine(number(), "isColor", (v) =>
  HabitColorList.includes(v)
);
const Weekday = refine(number(), "isWeekday", (v) => v >= 0 && v < 7);
const DivisibleBy5 = refine(number(), "divisibleBy5", (v) => v % 5 === 0);

const RepetitionDailySchema: Describe<RepetitionDaily> = object({
  type: literal("daily"),
});

const RepetitionWeeklySchema: Describe<RepetitionWeekly> = object({
  type: literal("weekly"),
  weekdays: size(array(Weekday), 1, 7),
});

const RepetitionWeeklySummarySchema: Describe<RepetitionWeeklySummary> = object(
  {
    type: literal("weekly_summary"),
    endsOn: Weekday,
  }
);

const RepetitionMonthlySummarySchema: Describe<RepetitionMonthlySummary> = object(
  {
    type: literal("monthly_summary"),
    endsOn: size(number(), 0, 31),
  }
);

const ReminderTimeSchema: Describe<FormValues["reminderTime"]> = object({
  hour: size(number(), 0, 23),
  minute: intersection([size(number(), 0, 59), DivisibleBy5]),
});

export const HabitFormValidationSchema = object({
  name: size(string(), 3, 20),
  color: HabitColor,
  description: size(string(), 0, 50),
  repeat: union([
    RepetitionDailySchema,
    RepetitionWeeklySchema,
    RepetitionWeeklySummarySchema,
    RepetitionMonthlySummarySchema,
  ]),
  reminderTime: ReminderTimeSchema,
});
