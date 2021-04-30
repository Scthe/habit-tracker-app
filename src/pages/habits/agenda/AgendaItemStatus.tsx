import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import green from "@material-ui/core/colors/green";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import clsx from "clsx";

import { getOppositeStatus, Habit, HabitCompletionStatus } from "../_types";
import { canMarkHabitDone } from "../_shared";
import { useSetHabitDone } from "./api/useSetHabitDone";
import { isPastDate } from "~utils";
import Checkbox from "@material-ui/core/Checkbox";

const DONE_GREEN = green[500];

const useStyles = makeStyles((theme) => ({
  itemIconButton: {
    borderRadius: "0",
  },
  statusDone: {
    color: DONE_GREEN,
  },
  statusRed: {
    color: theme.palette.error.main,
  },
  statusNotActionable: {
    padding: "12px",
  },
}));

interface AgendaItemStatusProps {
  habit: Habit;
  status: HabitCompletionStatus;
  currentDate: Date;
}

const getIconString = (
  currentDate: Date,
  isDone: boolean,
  isActionable: boolean
): string | null => {
  const showIcon =
    isDone || // we want to know this!
    isActionable || // always show action
    isPastDate(currentDate); // always show past status

  if (!showIcon) {
    return null;
  }
  return isDone ? "done" : "close";
};

export const AgendaItemStatus: React.FC<AgendaItemStatusProps> = ({
  habit,
  status,
  currentDate,
}) => {
  const styles = useStyles();
  const setHabitDone = useSetHabitDone();

  const isActionable = canMarkHabitDone(habit, currentDate);
  const isDone = status === HabitCompletionStatus.DONE;
  const iconStr = getIconString(currentDate, isDone, isActionable);
  const classStr = isDone ? styles.statusDone : styles.statusRed;

  if (!iconStr) {
    return null; // do not show the icon
  }

  if (!isActionable) {
    return (
      <div className={clsx(styles.statusNotActionable, classStr)}>
        <Icon>{iconStr}</Icon>
      </div>
    );
  }

  const handleToggle = () => {
    // TODO handle loading state here. Implement as `useState; ... () => {setLoading(true); await ..; setLoading(false);}`
    if (isActionable) {
      setHabitDone(currentDate, habit.id, getOppositeStatus(status));
    }
  };

  // TODO on desktop add tooltip what the action will do
  return (
    <Checkbox checked={isDone} onChange={handleToggle} color="primary" />
    // style ={{ color: DONE_GREEN }}
  );
};
