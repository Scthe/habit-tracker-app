import React from "react";
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import { CalendarSkeleton } from "./CalendarSkeleton";
import { DaysGrid, Props as DaysGridProps } from "./DaysGrid";
import { useUserDateSettings, useGlobalKeyDown } from "~hooks";
import { MonthOfYear, addMonths as addMonthsToDay } from "~utils";

const addMonths = (month: MonthOfYear, months: number): MonthOfYear => {
  const d = addMonthsToDay({ ...month, day: 16 }, months);
  return { year: d.year, month: d.month };
};

export type Props = DaysGridProps & {
  allowKeyboardControl?: boolean;
  loading?: boolean;
  className?: string;
  setShownMonth: (nextMonth: MonthOfYear) => void;
};

export const useStyles = makeStyles((theme) => ({
  root: {},
  skeleton: {},
  daysHeader: {
    display: "flex",
  },
  weekDayLabel: {
    flex: "1",
    margin: theme.spacing(0.5, 0),
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: theme.palette.text.secondary,
  },
}));

// https://github.com/mui-org/material-ui-pickers/blob/next/lib/src/views/Calendar/Calendar.tsx
export const Calendar: React.FC<Props> = (props) => {
  const dateUtil = useUserDateSettings();

  const {
    size,
    loading,
    className,
    allowKeyboardControl,
    shownMonth,
    setShownMonth,
  } = props;
  const styles = useStyles();
  const isSmall = size === "small";
  const weekdayNames = dateUtil.getWeekdayNames(isSmall ? "N" : "NNN");

  useGlobalKeyDown(Boolean(allowKeyboardControl), {
    ArrowLeft: () => setShownMonth(addMonths(shownMonth, -1)),
    ArrowRight: () => setShownMonth(addMonths(shownMonth, 1)),
  });

  return (
    <div className={clsx(className, styles.root)}>
      <div className={styles.daysHeader}>
        {weekdayNames.map((day, dayIdx) => (
          <Typography
            aria-hidden
            key={dayIdx}
            variant="caption"
            className={styles.weekDayLabel}
          >
            {day}
          </Typography>
        ))}
      </div>

      {loading ? (
        <CalendarSkeleton className={styles.skeleton} />
      ) : (
        <DaysGrid {...props} />
      )}
    </div>
  );
};
