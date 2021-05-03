import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";

import { WeekPreview } from "../_shared";
import { DateRangeSelector } from "~components";

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
  currentDate: Date;
  setCurrentDate: (newDate: Date) => void;
}

export const AgendaHeader: React.FC<Props> = ({
  currentDate,
  setCurrentDate,
}) => {
  const styles = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        <DateRangeSelector
          mode="week"
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
          className={styles.weekSelector}
        />
      </Toolbar>
      <Toolbar>
        <WeekPreview
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
          className={styles.weekPreview}
        />
      </Toolbar>
    </AppBar>
  );
};
