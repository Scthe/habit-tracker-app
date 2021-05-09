import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import green from "@material-ui/core/colors/green";
import red from "@material-ui/core/colors/red";
import clsx from "clsx";

import { HabitCompletionStatus } from "../_types";
import { CalendarDayProps } from "~components";
import { relativeToToday } from "~utils";

type Props = CalendarDayProps & {
  doneStatus: HabitCompletionStatus;
};

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
    padding: "6px 0",
    borderRadius: "25%",
    margin: "3px",
  },
  wasDone: {
    fontWeight: "bold",
    color: green[500],
  },
  wasFailed: {
    color: red[500],
  },
  today: {
    fontWeight: "bold",
    color: theme.palette.primary.main,
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
