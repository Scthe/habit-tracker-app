import { useCallback } from "react";
import { Habit } from "../../_types";
import { FormValues } from "../useFormInitValues";

export type SaveHabitFn = (values: FormValues) => Promise<void>;

export const useSaveHabit = (id?: Habit["id"]): SaveHabitFn => {
  // example error: name is not unique
  return useCallback(
    (values) => {
      if (id == null) {
        console.log("CREATE", values);
      } else {
        console.log(`EDIT '${id}'`, values);
      }

      return new Promise<void>((res) => {
        setTimeout(() => {
          res();
          console.log("  submit dome");
        }, 5000);
      });
    },
    [id]
  );
};
