import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import uniq from "lodash/uniq";

import { Weekday } from "utils/date";
import { useUserDateSettings } from "hooks/useUserDateSettings";

const useStyles = makeStyles(() => ({
  weekdayWrapper: {
    flex: 1,
  },
  dayButtonRoot: {
    minWidth: "0",
  },
  dayButtonLabel: {},
}));

interface Props {
  label: string;
  allowMany: boolean;
  currentValues: Weekday[];
  onChange: (day: Weekday[]) => void;
  className?: string;
}

export const WeekdaySelection: React.FC<Props> = ({
  label,
  allowMany,
  currentValues,
  onChange,
  className,
}) => {
  const styles = useStyles();
  const dateUtil = useUserDateSettings();

  const weekdays = dateUtil.getWeekdays("N");

  const onWeekdayChanged = (clickedWeekday: Weekday) => {
    let newValue: Weekday[];

    if (allowMany) {
      if (currentValues.includes(clickedWeekday)) {
        newValue = currentValues.filter((e) => e !== clickedWeekday);
      } else {
        newValue = [...currentValues, clickedWeekday];
      }
    } else {
      newValue = [clickedWeekday];
    }

    newValue = uniq(newValue);
    if (newValue.length > 0) {
      onChange(newValue);
    }
  };

  return (
    <div className={className}>
      <InputLabel shrink>{label}</InputLabel>

      <Box display="flex" justifyContent="center" marginTop={1}>
        {weekdays.map(({ id, name }) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const isSelected = currentValues.includes(id);
          return (
            <div key={id} className={styles.weekdayWrapper}>
              <Button
                variant="contained"
                color={isSelected ? "primary" : undefined}
                disableElevation
                onClick={() => onWeekdayChanged(id)}
                classes={{
                  root: styles.dayButtonRoot,
                  label: styles.dayButtonLabel,
                }}
              >
                {name}
              </Button>
            </div>
          );
        })}
      </Box>
    </div>
  );
};
