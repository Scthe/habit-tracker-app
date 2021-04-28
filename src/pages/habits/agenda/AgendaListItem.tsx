import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

import { HabitsListItem, useHabitTimeLeft } from "../_shared";
import { Habit, HabitCompletionStatus } from "../_types";
import { AgendaItemStatus } from "./AgendaItemStatus";

const useStyles = makeStyles(() => ({
  rootNotDone: {},
  rootDone: {
    opacity: 0.5,
  },
}));

interface Props {
  habit: Habit;
  status: HabitCompletionStatus;
  currentDate: Date;
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

  // TODO this UI sucks, maybe cross off items that are done?
  // TBH this is like a 'disabled' state
  const classByStatus =
    status === HabitCompletionStatus.DONE
      ? styles.rootDone
      : styles.rootNotDone;

  return (
    <HabitsListItem
      item={habit}
      className={classByStatus}
      renderSubtext={() => timeLeftStr}
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
