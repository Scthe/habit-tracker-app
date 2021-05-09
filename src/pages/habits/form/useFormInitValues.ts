import cloneDeep from "lodash/cloneDeep";
import pick from "lodash/pick";

import { Habit, HabitColor } from "../_types";
import { useGetHabit } from "../api";
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

const createDefaultValues = (): FormValues => {
  const now = new Date();
  const data = cloneDeep(DEFAULT_VALUES);
  data.reminderTime.hour = now.getHours();
  data.reminderTime.minute = floorToDivisibleBy(
    now.getMinutes(),
    REMINDER_MINUTES_STEP
  );
  return data;
};

const mapHabitToForm = (habit: Habit): FormValues =>
  pick(habit, "name", "color", "description", "reminderTime", "repeat");

/** We return null if we get habit by id for edit, but id is invalid */
export const useFormInitValues = (
  id: Habit["id"] | undefined
): [boolean, AsyncData<FormValues | null>] => {
  // TODO just get from location.state? No need for separate request. Then deepMerge with defaults
  const habitApiData = useGetHabit(id);

  if (id != null) {
    if (
      habitApiData.data.status === "success" &&
      habitApiData.data.data != null
    ) {
      const values = mapHabitToForm(habitApiData.data.data);
      return [
        true,
        {
          status: "success",
          data: values,
        },
      ];
    }
    return [true, habitApiData.data];
  }

  return [
    false,
    {
      status: "success",
      data: createDefaultValues(),
    },
  ];
};
