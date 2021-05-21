import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

import { HabitCompletionStatus } from "../../_types";
import { CalendarDayProps } from "components/Calendar";
import { relativeToToday } from "~utils";
import { AppTheme } from "theme";

type Props = CalendarDayProps & {
  doneStatus: HabitCompletionStatus;
};

const useStyles = makeStyles((theme: AppTheme) => ({
  root: {
    textAlign: "center",
    padding: "6px 0",
    margin: "3px",
  },
  wasDone: {
    fontWeight: "bold",
    background: fade(theme.palette.app.habits.done, 0.8),
    color: theme.palette.common.white,
  },
  wasFailed: {
    background: fade(theme.palette.app.habits.notDone, 0.8),
    color: theme.palette.common.white,
  },
  today: {
    fontWeight: "bold",
    background: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  neutral: {
    background: "transparent",
  },
  notThisMonth: {
    background: "transparent",
    color: theme.palette.text.disabled,
  },
}));

const getStatusStyles = (
  styles: ReturnType<typeof useStyles>,
  props: Props
): string => {
  const { day, doneStatus, isDayInCurrentMonth } = props;
  const relativeToTodayStatus = relativeToToday(day);

  if (!isDayInCurrentMonth) {
    return styles.notThisMonth;
  }
  if (relativeToTodayStatus === "today") {
    return styles.today;
  }
  if (doneStatus === HabitCompletionStatus.DONE) {
    return styles.wasDone;
  }
  if (relativeToTodayStatus === "future") {
    return styles.neutral;
  }
  return styles.wasFailed;
};

export const ActivityDay: React.FC<Props> = (props) => {
  const { day, className, role } = props;
  const styles = useStyles();

  const statusClass = getStatusStyles(styles, props);
  const classes = clsx(className, styles.root, statusClass);

  return (
    <div role={role} className={classes}>
      {day.day}
    </div>
  );
};
