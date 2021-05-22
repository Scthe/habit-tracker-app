import { useLocation } from "react-router-dom";
import cloneDeep from "lodash/cloneDeep";
import pick from "lodash/pick";

import { Habit, HabitColor } from "../../_types";
import { useGetHabit } from "../../api";
import { AsyncData } from "~types";
import { floorToDivisibleBy } from "utils";

export type FormValues = Omit<
  Habit,
  "id" | "userId" | "createdAt" | "editedAt"
>;

export const DEFAULT_VALUES: FormValues = {
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

const successValues = (values: Partial<FormValues>): AsyncData<FormValues> => {
  const allValues: FormValues = {
    ...createDefaultValues(),
    ...(values || {}),
  };
  return {
    status: "success",
    data: pick(
      allValues,
      "name",
      "color",
      "description",
      "reminderTime",
      "repeat"
    ),
  };
};

/** We return null if we get habit by id for edit, but id is invalid */
export const useFormInitValues = (
  id: Habit["id"] | undefined
): [boolean, AsyncData<FormValues>] => {
  const { state } = useLocation<Habit | null>();
  const hasValuesFromLocation = state?.repeat != null;
  const isCreate = id == null;
  const alreadyHaveData = isCreate || hasValuesFromLocation;

  // need to call hook per rules of hooks
  const { data: apiData } = useGetHabit(alreadyHaveData ? undefined : id);

  if (alreadyHaveData) {
    return [!isCreate, successValues(state || {})];
  }

  // get data from finished request
  if (apiData.status === "success") {
    return [true, successValues(apiData.data!)];
  }

  return [true, apiData];
};
