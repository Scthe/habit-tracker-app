import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import green from "@material-ui/core/colors/green";
import red from "@material-ui/core/colors/red";
import clsx from "clsx";
import isFuture from "date-fns/isFuture";
import isToday from "date-fns/isToday";

import { CalendarDayProps } from "~components";

type Props = CalendarDayProps;

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

export const ActivityDay: React.FC<Props> = ({
  day,
  isDayInCurrentMonth,
  className,
  role,
}) => {
  const styles = useStyles();
  const isDone = day.getDate() % 2 == 0;
  const isDayToday = isToday(day);
  const isDayFuture = isFuture(day);

  const getColor = (): string => {
    if (!isDayInCurrentMonth) {
      return styles.notThisMonth;
    }
    if (isDayToday) {
      return styles.today;
    }
    if (isDone) {
      return styles.wasDone;
    }
    if (isDayFuture) {
      return styles.neutral;
    }
    return styles.wasFailed;
  };

  const classes = clsx(className, styles.root, getColor());

  return (
    <div role={role} className={classes}>
      {day.getDate()}
    </div>
  );
};
