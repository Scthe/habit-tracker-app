import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

import { AppPage } from "../../_shared";
import { useAgendaData } from "./api/useAgendaData";
import { AgendaList } from "./AgendaList";
import { useCurrentDay } from "./useCurrentDay";
import { AgendaHeader } from "./AgendaHeader";

// TOOD swipe left/right for prev/next item

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    // maxHeight: "100vh",
  },
  toolbarOffset: theme.mixins.toolbar,
  content: {
    padding: "25px 25px 0",
    overflow: "auto",
    marginBottom: "20px",
  },
}));

const HabitsList: React.FC<unknown> = () => {
  const styles = useStyles();
  const [currentDay, setCurrentDay] = useCurrentDay();
  const agendaData = useAgendaData(currentDay);

  return (
    <AppPage className={styles.root} appMenuActiveItem="agenda">
      <AgendaHeader currentDate={currentDay} setCurrentDate={setCurrentDay} />

      <div className={clsx(styles.toolbarOffset, styles.content)}>
        <AgendaList currentDate={currentDay} data={agendaData} />
      </div>
    </AppPage>
  );
};

export default HabitsList;
