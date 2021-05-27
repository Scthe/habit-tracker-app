import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

import { Habit, HabitStatus } from "../../_types";
import { CalendarDayProps } from "components/Calendar";
import { relativeToToday } from "utils/date";
import { AppTheme } from "theme";
import { getStatus, showHabitOnDay } from "pages/habits/utils";

type Props = CalendarDayProps & {
  habit: Habit;
  statuses: HabitStatus[];
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
  future: {
    background: fade(theme.palette.primary.main, 0.4),
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
  const { day, habit, statuses, isDayInCurrentMonth } = props;
  const relativeToTodayStatus = relativeToToday(day);
  const showOnThisDay = showHabitOnDay(habit.repeat, day);
  const doneStatus = getStatus(habit.id, day, statuses);

  if (!isDayInCurrentMonth) {
    return styles.notThisMonth;
  }
  if (relativeToTodayStatus === "today") {
    return styles.today;
  }
  if (!showOnThisDay) {
    return styles.neutral;
  }
  if (doneStatus === "done") {
    return styles.wasDone;
  }
  if (relativeToTodayStatus === "future") {
    return styles.future;
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
