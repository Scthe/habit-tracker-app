import React, { useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { HabitsListItem } from "../../components";
import { Habit, HabitCompletionStatus } from "../../_types";
import { useHabitTimeLeft } from "./useHabitTimeLeft";
import { AgendaItemStatus } from "./AgendaItemStatus";
import { DayOfYear } from "~utils";
import { AppTheme } from "theme";
import { ControlledTouchRippleTriggerRef } from "~components";

export type HabitClickHandler = (habit: Habit) => void;

const useStyles = makeStyles((theme: AppTheme) => ({
  doneState: {
    textDecoration: "line-through",
  },
  habitDoneRipple: {
    // TODO may create horizontal scroll on mobile
    color: theme.palette.app.habits.done,
  },
}));

interface Props {
  habit: Habit;
  status: HabitCompletionStatus;
  currentDate: DayOfYear;
  onClick: HabitClickHandler;
  isSelected: boolean;
}

export const AgendaListItem: React.FC<Props> = ({
  habit,
  status,
  currentDate,
  onClick,
  isSelected,
}) => {
  const styles = useStyles();
  const timeLeftStr = useHabitTimeLeft(habit, currentDate);

  // ripple on done mechanism
  const triggerRef: ControlledTouchRippleTriggerRef = React.useRef(null);
  const centerRef: React.MutableRefObject<null | HTMLElement> = React.useRef(
    null
  );
  const onStatusChanged = useCallback((newStatus: HabitCompletionStatus) => {
    if (
      newStatus === HabitCompletionStatus.DONE &&
      triggerRef.current != null
    ) {
      triggerRef.current();
    }
  }, []);

  const isDone = status === HabitCompletionStatus.DONE;
  const classByStatus = isDone ? styles.doneState : "";

  return (
    <HabitsListItem
      item={habit}
      className={classByStatus}
      classes={{
        title: classByStatus,
      }}
      renderSubtext={() => <span className={classByStatus}>{timeLeftStr}</span>}
      isSelected={isSelected}
      onClick={() => onClick(habit)}
      TouchRippleProps={{
        triggerRef,
        centerRef,
        className: styles.habitDoneRipple,
      }}
      actionElement={
        <AgendaItemStatus
          habit={habit}
          status={status}
          currentDate={currentDate}
          onStatusChanged={onStatusChanged}
          checkboxRef={centerRef}
        />
      }
    />
  );
};
