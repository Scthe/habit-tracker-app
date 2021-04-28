import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

// import { useResponsive } from "~hooks";
import { AppPage } from "../../_shared";
import { WeekPreview } from "../_shared";
import { useAgendaData } from "./api/useAgendaData";
import { AgendaList } from "./AgendaList";
import { zeroeTime } from "~utils";
import { DateRangeSelector } from "~components";

const useStyles = makeStyles((_theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    // maxHeight: "100vh",
  },
  header: {
    padding: "25px 25px 15px",
    flex: 0,
  },
  weekSelector: {
    marginBottom: "15px",
  },
  weekPreview: {},
  agendaList: {
    flex: 1,
    overflow: "auto",
    // maxHeight: "calc(100vh - 170px)", // HERE alt. solution
  },
}));

const HabitsList: React.FC<unknown> = () => {
  // const resp = useResponsive();
  const styles = useStyles();

  // TODO add check != active day
  const [currentDay, setCurrentDayRAW] = useState(zeroeTime(new Date()));
  const agendaData = useAgendaData(currentDay);

  const setCurrentDay = (d: Date) => setCurrentDayRAW(zeroeTime(d));

  return (
    <AppPage className={styles.root} appMenuActiveItem="agenda">
      {/* TODO put this in app bar */}
      <Paper square={true} className={styles.header}>
        <DateRangeSelector
          mode="week"
          currentDate={currentDay}
          setCurrentDate={setCurrentDay}
          className={styles.weekSelector}
        />
        <WeekPreview
          currentDate={currentDay}
          setCurrentDate={setCurrentDay}
          className={styles.weekPreview}
        />
      </Paper>

      <AgendaList
        currentDate={currentDay}
        data={agendaData}
        className={styles.agendaList}
      />
    </AppPage>
  );
};

export default HabitsList;
