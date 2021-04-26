import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

// import { useResponsive } from "~hooks";
import { AppPage } from "../../_shared";
import { WeekSelector, WeekPreview } from "../_shared";
import { useHabitAgenda } from "./useHabitAgenda";
import { AgendaList } from "./AgendaList";
import { Habit } from "../_types";

export type SetHabitActivityStatusFn = (
  date: Date,
  habitId: Habit["id"],
  nextStatus: "done" | "clear"
) => void;

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
  agendaListContainer: {
    flex: 1,
    overflow: "auto",
    // maxHeight: "calc(100vh - 170px)", // HERE alt. solution
  },
}));

// TODO breadcrumbs on desktop
const HabitsList: React.FC<unknown> = () => {
  // const resp = useResponsive();
  const styles = useStyles();

  // TODO add check != active day
  const [currentDay, setCurrentDay] = useState(new Date());
  const agendaData = useHabitAgenda(currentDay);

  const handleResultChange = (
    date: Date,
    habitId: Habit["id"],
    nextStatus: "done" | "clear"
  ) => {
    console.log(`Habit '${habitId}', set '${nextStatus}' for ${date}`);
  };

  return (
    <AppPage className={styles.root} appMenuActiveItem="agenda">
      <Paper square={true} className={styles.header}></Paper>
    </AppPage>
  );
};

export default HabitsList;
