import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import { HabitsListItem, useHabitTimeLeft } from "../../_shared";
import { Habit, HabitCompletionStatus } from "../../_types";
import { AgendaItemStatus } from "./AgendaItemStatus";
import { DayOfYear } from "~utils";

export type HabitClickHandler = (habit: Habit) => void;

const useStyles = makeStyles(() => ({
  doneState: {
    textDecoration: "line-through",
  },
}));

interface Props {
  habit: Habit;
  status: HabitCompletionStatus;
  currentDate: DayOfYear;
  onClick: HabitClickHandler;
}

export const AgendaListItem: React.FC<Props> = ({
  habit,
  status,
  currentDate,
  onClick,
}) => {
  const styles = useStyles();
  const timeLeftStr = useHabitTimeLeft(habit, currentDate);

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
      onClick={() => onClick(habit)}
      actionElement={
        <AgendaItemStatus
          habit={habit}
          status={status}
          currentDate={currentDate}
        />
      }
    />
  );
};
