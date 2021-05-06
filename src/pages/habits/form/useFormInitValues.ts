import { useParams } from "react-router-dom";

import { Habit, HabitColor } from "../_types";
import { AsyncData } from "~types";
import { floorToDivisibleBy } from "~utils";

export type FormValues = Omit<
  Habit,
  "id" | "userId" | "createdAt" | "editedAt"
>;

const DEFAULT_VALUES: FormValues = {
  name: "",
  color: HabitColor.Blue,
  description: "",
  reminderTime: { hour: 24, minute: 0 },
  repeat: {
    type: "daily",
  },
};

export const REMINDER_MINUTES_STEP = 5;

export const useFormInitValues = (): [boolean, AsyncData<FormValues>] => {
  const { id } = useParams<{ id?: string }>();
  const habitApiData = null; // useGetHabit(id); // TODO just get from location.state? No need for separate request. Then deepMerge with defaults

  if (id == null || habitApiData == null) {
    const t = new Date();
    DEFAULT_VALUES.reminderTime.hour = t.getHours();
    DEFAULT_VALUES.reminderTime.minute = floorToDivisibleBy(
      t.getMinutes(),
      REMINDER_MINUTES_STEP
    );
    return [
      false,
      {
        status: "success",
        data: DEFAULT_VALUES,
      },
    ];
  }
  return [true, habitApiData];
};
