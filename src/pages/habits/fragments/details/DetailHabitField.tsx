import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import Linkify from "react-linkify";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(3),
  },
  label: {
    display: "block",
    marginBottom: theme.spacing(0.5),
  },
}));

interface DetailHabitFieldProps {
  id: string;
  label: string;
  value: string;
  linkify?: boolean;
}

export const DetailHabitField: React.FC<DetailHabitFieldProps> = ({
  id,
  label,
  value,
  linkify,
}) => {
  const styles = useStyles();

  const valueEl = <div id={id}>{value}</div>;
  return (
    <div className={styles.root}>
      <InputLabel htmlFor={id} shrink className={styles.label}>
        {label}
      </InputLabel>
      {linkify ? (
        <Linkify componentDecorator={componentDecorator}>{valueEl}</Linkify>
      ) : (
        valueEl
      )}
    </div>
  );
};

function componentDecorator(
  decoratedHref: string,
  decoratedText: string,
  key: number
) {
  return (
    <a key={key} href={decoratedHref} target="_blank" rel="noopener noreferrer">
      {decoratedText}
    </a>
  );
}
