import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import green from "@material-ui/core/colors/green";
import Icon from "@material-ui/core/Icon";
import clsx from "clsx";

import Checkbox from "@material-ui/core/Checkbox";
import { getOppositeStatus, Habit, HabitCompletionStatus } from "../_types";
import { canFinishHabitOnDay } from "../_shared";
import { useSetHabitDone } from "../api";
import { DayOfYear, relativeToToday } from "~utils";

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
  const isDone = status === HabitCompletionStatus.DONE;

  // TODO handle loading state here. Implement as `useState; ... () => {setLoading(true); await ..; setLoading(false);}`
  // The async requests lib had some helper for this?
  const handleToggle = () => {
    setHabitDone({
      habitId: habit.id,
      habitName: habit.name,
      habitColor: habit.color,
      status: getOppositeStatus(status),
      day: currentDate,
    });
  };

  // TODO on desktop add tooltip what the action will do
  return (
    <Checkbox checked={isDone} onChange={handleToggle} color="primary" />
    // style ={{ color: DONE_GREEN }}
  );
};
