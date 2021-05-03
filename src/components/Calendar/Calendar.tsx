import React from "react";
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

// import { useGlobalKeyDown, keycode } from '../../_shared/hooks/useKeyDown';
import { CalendarSkeleton } from "./CalendarSkeleton";
import { DaysGrid, Props as DaysGridProps } from "./DaysGrid";
import { getWeekdayNames } from "~utils";

const WEEKDAY_NAMES = getWeekdayNames("N");

export type Props = DaysGridProps & {
  allowKeyboardControl?: boolean;
  loading?: boolean;
  className?: string;
};

export const useStyles = makeStyles((theme) => ({
  root: {},
  skeleton: {},
  daysHeader: {
    display: "flex",
  },
  weekDayLabel: {
    flex: "1",
    margin: "0 2px",
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: theme.palette.text.secondary,
  },
}));

// https://github.com/mui-org/material-ui-pickers/blob/next/lib/src/views/Calendar/Calendar.tsx
export const Calendar: React.FC<Props> = (props) => {
  const { size, loading, className } = props;
  const styles = useStyles();
  const isSmall = size === "small";

  /*
  const initialDate = Array.isArray(date) ? date[0] : date;
  const nowFocusedDay = focusedDay || initialDate || now;

  useGlobalKeyDown(Boolean(allowKeyboardControl), {
    [keycode.ArrowUp]: () => changeFocusedDay(addDays(nowFocusedDay, -7)),
    [keycode.ArrowDown]: () => changeFocusedDay(addDays(nowFocusedDay, 7)),
    [keycode.ArrowLeft]: () => changeFocusedDay(addDays(nowFocusedDay, 1)),
    [keycode.ArrowRight]: () => changeFocusedDay(addDays(nowFocusedDay, 1)),
    [keycode.Home]: () => changeFocusedDay(startOfWeek(nowFocusedDay)),
    [keycode.End]: () => changeFocusedDay(endOfWeek(nowFocusedDay)),
    [keycode.PageUp]: () => changeFocusedDay(getNextMonth(nowFocusedDay)),
    [keycode.PageDown]: () => changeFocusedDay(getPreviousMonth(nowFocusedDay)),
  });
  */

  return (
    <div className={clsx(className, styles.root)}>
      <div className={styles.daysHeader}>
        {WEEKDAY_NAMES.map((day, dayIdx) => (
          <Typography
            aria-hidden
            key={dayIdx}
            variant="caption"
            className={styles.weekDayLabel}
          >
            {isSmall ? day.charAt(0).toUpperCase() : day}
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
