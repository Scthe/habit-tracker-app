import React, { Fragment } from "react";
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import isSameDay from "date-fns/isSameDay";
import getMonth from "date-fns/getMonth";

// import { DAY_SIZE, DAY_MARGIN } from '../../constants/dimensions';
// import { useGlobalKeyDown, keycode } from '../../_shared/hooks/useKeyDown';
import { WEEKDAY_NAMES, getDaysInCalendar } from "~utils";
import { CalendarSkeleton } from "./CalendarSkeleton";

export interface CalendarDayProps {
  day: Date;
  size: "small" | "large";
  isDayInCurrentMonth: boolean;
  isSelected: boolean;
  onSelected: () => void;
  className?: string;
  role: "cell";
}

export interface Props {
  size: "small" | "large";
  shownMonth: Date;
  selectedDay?: Date;
  onDaySelected?: (d: Date) => void;
  renderDay: (props: CalendarDayProps) => React.ReactNode;
  allowKeyboardControl?: boolean;
  loading?: boolean;
  className?: string;
}

export const useStyles = makeStyles((theme) => ({
  root: {},
  skeleton: {},
  month: {},
  week: {
    display: "flex",
    // justifyContent: 'center',
  },
  day: {
    flex: 1,
  },
  daysHeader: {
    display: "flex",
    // justifyContent: 'center',
    // alignItems: 'center',
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
export const Calendar: React.FC<Props> = ({
  size,
  shownMonth,
  selectedDay,
  onDaySelected,
  renderDay,
  allowKeyboardControl, // TODO add me!
  loading,
  className,
}) => {
  const styles = useStyles();
  const isSmall = size === "small";

  /*
  // const initialDate = Array.isArray(date) ? date[0] : date;
  // const nowFocusedDay = focusedDay || initialDate || now;

  /*
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

  const currentMonthNumber = getMonth(shownMonth);
  const weeksInCalendar = getDaysInCalendar(shownMonth);
  // const selectedDates = (Array.isArray(date) ? date : [date])
  // .filter(Boolean)
  // .map((selectedDateItem) => selectedDateItem && utils.startOfDay(selectedDateItem));

  return (
    <div className={clsx(className, styles.root)}>
      <div className={styles.daysHeader}>
        {WEEKDAY_NAMES.map((day) => (
          <Typography
            aria-hidden
            key={day}
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
        // TODO component: DaysGrid
        <div role="grid" className={styles.month}>
          {weeksInCalendar.map((week, idx) => (
            <div role="row" key={`week-${idx}`} className={styles.week}>
              {week.map((day, idx2) => {
                const dayProps: CalendarDayProps = {
                  day,
                  size,
                  isDayInCurrentMonth: getMonth(day) === currentMonthNumber,
                  isSelected:
                    selectedDay != null && isSameDay(selectedDay, day),
                  onSelected: () => onDaySelected && onDaySelected(day),
                  className: styles.day,
                  role: "cell",
                };

                return (
                  <Fragment key={`day-${idx2}`}>{renderDay(dayProps)}</Fragment>
                );
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
