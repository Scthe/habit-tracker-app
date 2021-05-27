import React from "react";
import { lighten, makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

import { HabitWithStatus } from "./useCalendarData";
import { CalendarDayProps, byCalendarSize } from "components/Calendar";
import { AppTheme, byThemeColor } from "theme";
import { HabitCompletionStatus } from "pages/habits/_types";
import { HabitCalendarDayStatus } from "pages/habits/components";

type Props = CalendarDayProps & {
  habits: HabitWithStatus[];
};

const useStyles = makeStyles((theme: AppTheme) => ({
  root: {
    padding: theme.spacing(0.5, 0, 0),
    display: "flex",
    flexDirection: "column",
  },
  dayNumber: {
    textAlign: "center",
    marginBottom: theme.spacing(0.5),
    flexGrow: 0,
  },
  dayNumberText: {
    borderBottom: "2px solid transparent",
    minWidth: "20%",
    display: "inline-block",
  },
  dayNumberTextToday: () => {
    const main = theme.palette.primary.main;
    const c = byThemeColor(theme, main, lighten(main, 0.2));
    return {
      borderBottomColor: c,
      color: c,
    };
  },
  notThisMonth: {
    background: "transparent",
    color: theme.palette.text.disabled,
  },
  dayContent: {
    fontSize: byCalendarSize("0.5rem", "0.7rem"),
  },
  status: {
    flexGrow: 1,
    fontSize: "1.3em",
  },
}));

export const CalendarDay: React.FC<Props> = ({
  day,
  relativeToToday,
  isDayInCurrentMonth,
  className,
  role,
  habits,
  size,
}) => {
  const styles = useStyles({ size });

  const isToday = relativeToToday === "today";
  const allWereDone = habits.every(
    (h) => h.status === HabitCompletionStatus.DONE
  );
  const rootClassName = clsx(
    className,
    styles.root,
    isDayInCurrentMonth ? "" : styles.notThisMonth
  );
  const dayNumberTextClassName = clsx(
    styles.dayNumberText,
    isToday && styles.dayNumberTextToday
  );

  return (
    <div role={role} className={rootClassName}>
      <div className={styles.dayNumber}>
        <span className={dayNumberTextClassName}>{day.day}</span>
      </div>

      {isDayInCurrentMonth ? (
        <HabitCalendarDayStatus
          showAsLink
          day={day}
          complete={
            habits.length === 0 || relativeToToday === "future"
              ? "not_applicable"
              : allWereDone
              ? "done"
              : "not_done"
          }
          className={styles.status}
        />
      ) : null}
    </div>
  );
};
