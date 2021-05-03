import React from "react";
import { useField } from "formik";
import { TimePicker } from "@material-ui/pickers/TimePicker";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { FormValues, REMINDER_MINUTES_STEP } from "../useFormInitValues";
import { getFieldError } from "~utils";

interface Props {
  name: keyof FormValues;
  className?: string;
}

export const ReminderField: React.FC<Props> = (props) => {
  const [field, meta, helpers] = useField<FormValues["reminderTime"]>(props);
  const d = new Date();
  d.setHours(field.value.hour);
  d.setMinutes(field.value.minute);

  const handleDateChange = (nextDate: MaterialUiPickersDate) => {
    if (nextDate != null) {
      helpers.setValue({
        hour: nextDate.getHours(),
        minute: nextDate.getMinutes(),
      });
    }
  };

  return (
    <div className={props.className}>
      <TimePicker
        label="Remind me at"
        value={d}
        minutesStep={REMINDER_MINUTES_STEP}
        onChange={handleDateChange}
        inputVariant="filled"
        {...getFieldError(meta)}
      />
    </div>
  );
};
