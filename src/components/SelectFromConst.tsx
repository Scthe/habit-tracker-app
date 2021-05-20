import React, { ReactElement } from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

interface ValueType<T> {
  type: T;
  label: string;
}

const useStyles = makeStyles(() => ({
  root: { display: "block", maxHeight: "56px" },
  input: { minWidth: "165px" },
}));

interface Props<T> {
  id: string;
  label: string;
  currentValue: T;
  onChange: (item: T) => void;
  className?: string;
  values: Array<ValueType<T>>;
}

export function SelectFromConst<T>({
  id,
  label,
  currentValue,
  onChange,
  className,
  values,
}: Props<T>): ReactElement {
  const styles = useStyles();

  const handleChange = (
    e: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onChange(e.target.value as any);
  };

  return (
    <FormControl variant="filled" className={clsx(className, styles.root)}>
      <InputLabel shrink>{label}</InputLabel>
      <Select
        name={id}
        value={currentValue}
        onChange={handleChange}
        className={styles.input}
      >
        {values.map((v) => (
          <MenuItem key={v.type} value={v.type}>
            {v.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
