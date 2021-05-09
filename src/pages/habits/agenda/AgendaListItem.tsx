import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

import { HabitsListItem, useHabitTimeLeft } from "../_shared";
import { Habit, HabitCompletionStatus } from "../_types";
import { AgendaItemStatus } from "./AgendaItemStatus";
import { DayOfYear } from "~utils";

const useStyles = makeStyles(() => ({
  doneState: {
    textDecoration: "line-through",
  },
}));

interface Props {
  habit: Habit;
  status: HabitCompletionStatus;
  currentDate: DayOfYear;
}

export const AgendaListItem: React.FC<Props> = ({
  habit,
  status,
  currentDate,
}) => {
  const history = useHistory();
  const styles = useStyles();
  const timeLeftStr = useHabitTimeLeft(habit, currentDate);

  const handleClick = () => {
    history.push(`/habits/${habit.id}/details`);
  };

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
      onClick={handleClick}
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
