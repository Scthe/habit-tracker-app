import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import uniq from "lodash/uniq";

import { Weekday } from "~utils";
import { useUserDateSettings } from "~hooks";

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

  const weekdayNames = dateUtil.getWeekdayNames("N");

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
        {weekdayNames.map((dayName, idx) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const dayId: Weekday = idx as any;
          const isSelected = currentValues.includes(dayId);
          return (
            <div key={dayId} className={styles.weekdayWrapper}>
              <Button
                variant="contained"
                color={isSelected ? "primary" : undefined}
                disableElevation
                onClick={() => onWeekdayChanged(dayId)}
                classes={{
                  root: styles.dayButtonRoot,
                  label: styles.dayButtonLabel,
                }}
              >
                {dayName}
              </Button>
            </div>
          );
        })}
      </Box>
    </div>
  );
};
