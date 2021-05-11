import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";

import { DateNextPrevSelector, WeekPreview } from "~components";
import { DayOfYear } from "~utils";

const useStyles = makeStyles(() => ({
  weekSelector: {
    marginBottom: "15px",
    flex: 1,
  },
  weekPreview: {
    flex: 1,
  },
}));

interface Props {
  currentDate: DayOfYear;
  setCurrentDate: (newDate: DayOfYear) => void;
}

export const AgendaHeader: React.FC<Props> = ({
  currentDate,
  setCurrentDate,
}) => {
  const styles = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        <DateNextPrevSelector
          mode="week"
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
          className={styles.weekSelector}
        />
      </Toolbar>
      <Toolbar>
        <WeekPreview
          activeDate={currentDate}
          setCurrentDate={setCurrentDate}
          className={styles.weekPreview}
        />
      </Toolbar>
    </AppBar>
  );
};
