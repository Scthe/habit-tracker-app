import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

import { useAgendaData } from "./useAgendaData";
import { AgendaList } from "./AgendaList";
import { useCurrentDay } from "./useCurrentDay";
import { AgendaHeader } from "./AgendaHeader";
import { HabitClickHandler } from "./AgendaListItem";

// TOOD swipe left/right for prev/next item

const useStyles = makeStyles((theme) => ({
  toolbarOffset: theme.mixins.toolbar,
  content: {
    padding: "25px 25px 0",
    overflow: "auto",
    marginBottom: "20px",
  },
}));

interface Props {
  onItemClick: HabitClickHandler;
}

const HabitsAgenda: React.FC<Props> = ({ onItemClick }) => {
  const styles = useStyles();
  const [currentDay, setCurrentDay] = useCurrentDay();
  const agendaData = useAgendaData(currentDay);

  return (
    <>
      <AgendaHeader currentDate={currentDay} setCurrentDate={setCurrentDay} />

      <div className={clsx(styles.toolbarOffset, styles.content)}>
        <AgendaList
          currentDate={currentDay}
          data={agendaData}
          onItemClick={onItemClick}
        />
      </div>
    </>
  );
};

export default HabitsAgenda;
