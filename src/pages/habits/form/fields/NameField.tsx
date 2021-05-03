import React from "react";
import { useField } from "formik";
import TextField from "@material-ui/core/TextField";
import { FormValues } from "../useFormInitValues";
import { getFieldError } from "~utils";

interface Props {
  name: keyof FormValues;
  className?: string;
}

export const NameField: React.FC<Props> = (props) => {
  const [field, meta] = useField(props);

  return (
    <TextField
      fullWidth
      id={props.name}
      name={props.name}
      label="I want to"
      value={field.value}
      onChange={field.onChange}
      variant="filled"
      className={props.className}
      {...getFieldError(meta)}
    />
  );
};
