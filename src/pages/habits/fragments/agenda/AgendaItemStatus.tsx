import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import CircularProgress from "@material-ui/core/CircularProgress";
import clsx from "clsx";

import Checkbox from "@material-ui/core/Checkbox";
import { getOppositeStatus, Habit, HabitCompletionStatus } from "../../_types";
import { canFinishHabitOnDay } from "../../utils";
import { useSetHabitDone } from "../../api";
import { DayOfYear, relativeToToday } from "~utils";
import { useShowAlert } from "~hooks";
import { AppTheme } from "theme";

const useStyles = makeStyles((theme: AppTheme) => ({
  itemIconButton: {
    borderRadius: "0",
  },
  statusDone: {
    color: theme.palette.app.habits.done,
  },
  statusRed: {
    color: theme.palette.app.habits.notDone,
  },
  statusNotActionable: {
    padding: "12px", // has to match CircularProgress etc.
  },
}));

interface AgendaItemStatusProps {
  habit: Habit;
  status: HabitCompletionStatus;
  currentDate: DayOfYear;
}

const getIconString = (
  currentDate: DayOfYear,
  isDone: boolean,
  isActionable: boolean
): string | null => {
  const showIcon =
    isDone || // we want to know this!
    isActionable || // always show action
    relativeToToday(currentDate) === "past"; // always show past status. Ignore hours in comparison

  if (!showIcon) {
    return null;
  }
  return isDone ? "done" : "close";
};

export const AgendaItemStatus: React.FC<AgendaItemStatusProps> = (props) => {
  const { habit, status, currentDate } = props;
  const styles = useStyles();

  const isActionable = canFinishHabitOnDay(habit.repeat, currentDate);
  const isDone = status === HabitCompletionStatus.DONE;
  const iconStr = getIconString(currentDate, isDone, isActionable);

  if (!iconStr) {
    return null; // do not show the icon
  }

  if (isActionable) {
    return <ToggleStatusCheckbox {...props} />;
  }

  const classStr = isDone ? styles.statusDone : styles.statusRed;
  return (
    <div className={clsx(styles.statusNotActionable, classStr)}>
      <Icon>{iconStr}</Icon>
    </div>
  );
};

const ToggleStatusCheckbox: React.FC<AgendaItemStatusProps> = ({
  habit,
  status,
  currentDate,
}) => {
  const setHabitDone = useSetHabitDone();
  const showAlert = useShowAlert();
  const isDone = status === HabitCompletionStatus.DONE;

  const handleToggle = async () => {
    try {
      await setHabitDone.execute({
        habitId: habit.id,
        habitName: habit.name,
        habitColor: habit.color,
        status: getOppositeStatus(status),
        day: currentDate,
      });
    } catch (e) {
      showAlert({
        severity: "error",
        message: `Error, could not ${isDone ? "undo" : "finish"} the habit`,
      });
    }
  };

  if (setHabitDone.loading) {
    return <CircularProgress size="40px" color="primary" />;
  }

  return <Checkbox checked={isDone} onChange={handleToggle} color="primary" />;
};