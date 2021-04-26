import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import { HabitAgendaItem } from "./useHabitAgenda";
import { HabitsListItem, useHabitTimeLeft } from "../_shared";
import { Habit, HabitResult } from "../_types";
import { useHistory } from "react-router-dom";
import { zeroeTime } from "~utils";
import isBefore from "date-fns/isBefore";
import Icon from "@material-ui/core/Icon";
import green from "@material-ui/core/colors/green";
import IconButton from "@material-ui/core/IconButton";
import { SetHabitActivityStatusFn } from ".";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  rootActionable: {},
  rootInactive: {
    opacity: 0.5,
  },
  itemIconButton: {
    borderRadius: "0",
  },
  statusDone: {
    color: green[500],
  },
  statusActive: {
    color: theme.palette.primary.main,
  },
  statusRed: {
    color: theme.palette.error.main,
  },
  statusNotActionable: {
    padding: "12px",
  },
}));

///////
/// ItemStatus

interface ItemStatusProps {
  onChecked: () => void;
  isChangeable: boolean;
  currentResult: HabitResult;
}

// TODO on desktop add tooltip what the action will do
const ItemStatus: React.FC<ItemStatusProps> = ({
  onChecked,
  isChangeable,
  currentResult,
}: ItemStatusProps) => {
  const styles = useStyles();

  const ICONS = {
    [HabitResult.ACTIVE]: { icon: "done", color: styles.statusActive },
    [HabitResult.DONE]: { icon: "done", color: styles.statusDone },
    [HabitResult.FAILED]: { icon: "close", color: styles.statusRed },
  };

  const iconStr: typeof ICONS["3"] = (ICONS as any)[currentResult];
  if (!iconStr) {
    // nothing to show
    return null;
  }

  const iconEl = <Icon>{iconStr.icon}</Icon>;

  if (!isChangeable) {
    return (
      <div className={clsx(styles.statusNotActionable, iconStr.color)}>
        {iconEl}
      </div>
    );
  }
  return (
    <IconButton
      className={clsx(styles.itemIconButton, iconStr.color)}
      centerRipple={false}
      onClick={onChecked}
    >
      {iconEl}
    </IconButton>
  );
};

///////
/// AgendaListItem

type StatusAfterToggle = "done" | "clear" | null;

/**
 * if in the past - CANNOT BE CHANGED
 * if not yet active - CANNOT BE CHANGED
 * if it's DONE - clear
 * if it's not DONE - done
 */
const getStatusAfterToggle = (
  currentDate: Date,
  currentResult: HabitResult
): StatusAfterToggle => {
  const now = zeroeTime(new Date());
  const selectedDay = zeroeTime(currentDate);
  const wasOnPastDay = isBefore(selectedDay, now);
  const canBeChanged = [HabitResult.ACTIVE, HabitResult.DONE].includes(
    currentResult
  );

  if (!wasOnPastDay && canBeChanged) {
    return currentResult === HabitResult.DONE ? "clear" : "done";
  }
  return null;
};

interface Props {
  data: HabitAgendaItem;
  currentDate: Date;
  setHabitActivityStatus: SetHabitActivityStatusFn;
}

export const AgendaListItem: React.FC<Props> = ({
  data,
  currentDate,
  setHabitActivityStatus,
}) => {
  const history = useHistory();
  const styles = useStyles();

  // TODO this UI sucks, maybe cross off items that are done?
  const isActive = data.status === HabitResult.ACTIVE;
  const classByStatus = isActive ? styles.rootActionable : styles.rootInactive;
  const timeLeftStr = useHabitTimeLeft(data.habit, currentDate);

  const handleClick = () => {
    // TODO handle loading state here. Implement as `useState; ... setLoading(true); await ..; setLoading(false);`
    history.push(`/habits/${data.habit.id}/details`);
  };

  const statusAfterToggle = getStatusAfterToggle(currentDate, data.status);
  const handleCheck = () => {
    if (statusAfterToggle != null) {
      // TODO this should show alert/popup
      setHabitActivityStatus(currentDate, data.habit.id, statusAfterToggle);
    }
  };

  return (
    <HabitsListItem
      item={data.habit}
      className={classByStatus}
      renderSubtext={() => timeLeftStr}
      onClick={handleClick}
      actionElement={
        <ItemStatus
          isChangeable={statusAfterToggle != null}
          onChecked={handleCheck}
          currentResult={data.status}
        />
      }
    />
  );
};
