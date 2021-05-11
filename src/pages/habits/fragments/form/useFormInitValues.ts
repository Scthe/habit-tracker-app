import cloneDeep from "lodash/cloneDeep";
import pick from "lodash/pick";

import { Habit, HabitColor } from "../../_types";
import { useGetHabit } from "../../api";
import { AsyncData } from "~types";
import { floorToDivisibleBy } from "~utils";
import { useLocation } from "react-router-dom";

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

const successValues = (values: Partial<FormValues>): AsyncData<FormValues> => ({
  status: "success",
  data: {
    ...createDefaultValues(),
    ...(values || {}),
  },
});

/** We return null if we get habit by id for edit, but id is invalid */
export const useFormInitValues = (
  id: Habit["id"] | undefined
): [boolean, AsyncData<FormValues | null>] => {
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
    if (apiData.data != null) {
      const values = mapHabitToForm(apiData.data);
      return [true, successValues(values)];
    } else {
      return [
        true,
        {
          status: "error",
          error: new Error(`No data returned for request with id='${id}'`),
        },
      ];
    }
  }

  return [true, apiData];
};
