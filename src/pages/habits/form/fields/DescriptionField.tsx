import React from "react";
import { useField } from "formik";
import TextField from "@material-ui/core/TextField";
import { FormValues } from "../useFormInitValues";
import { getFieldError } from "~utils";

interface Props {
  name: keyof FormValues;
}

export const DescriptionField: React.FC<Props> = (props) => {
  const [field, meta, helpers] = useField(props);

  return (
    <TextField
      fullWidth
      id={props.name}
      name={props.name}
      label="Notes"
      value={field.value}
      onChange={field.onChange}
      variant="filled"
      multiline
      {...getFieldError(meta)}
    />
  );
};
