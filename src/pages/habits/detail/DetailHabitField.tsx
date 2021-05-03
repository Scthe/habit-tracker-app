import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField, { TextFieldProps } from "@material-ui/core/TextField";
import defaultsDeep from "lodash/defaultsDeep";

const useStyles = makeStyles(() => ({
  root: {
    marginBottom: "20px",
  },
}));

interface DetailHabitFieldProps {
  id: string;
  label: string;
  value: string;
  restProps?: TextFieldProps;
}

export const DetailHabitField: React.FC<DetailHabitFieldProps> = (props) => {
  const styles = useStyles();

  const tfProps: TextFieldProps = defaultsDeep(
    {
      InputProps: { readOnly: true },
    },
    props.restProps
  );

  return (
    <TextField
      {...tfProps}
      id={props.id}
      label={props.label}
      value={props.value}
      className={styles.root}
    />
  );
};
