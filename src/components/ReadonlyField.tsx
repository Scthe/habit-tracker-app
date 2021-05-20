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

interface Props {
  id: string;
  label: string;
  value: string | null | undefined;
  linkify?: boolean;
  onMissingValue?: "hide" | "-" | "empty";
}

export const ReadonlyField: React.FC<Props> = ({
  id,
  label,
  value,
  linkify,
  onMissingValue,
}) => {
  const styles = useStyles();

  const shownValue = getValue(value, onMissingValue);
  if (shownValue == null) {
    return null;
  }

  const valueEl = <div id={id}>{shownValue}</div>;
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

ReadonlyField.defaultProps = {
  onMissingValue: "-",
};

function getValue(
  value: Props["value"],
  onMissingValue: Props["onMissingValue"]
): string | null {
  const hasValue = value != null && value.length > 0;
  switch (onMissingValue!) {
    case "-":
      return hasValue ? value! : "-";
    case "empty":
      return hasValue ? value! : "";
    case "hide":
      return hasValue ? value! : null;
  }
}

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
