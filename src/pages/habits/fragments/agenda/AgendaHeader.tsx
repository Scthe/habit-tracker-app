import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";

import {
  AppMenuToggleButton,
  DateNextPrevSelector,
  WeekPreview,
} from "~components";
import { DayOfYear } from "~utils";

const useStyles = makeStyles((theme) => ({
  weekSelector: {
    marginBottom: theme.spacing(2),
    flex: 1,
  },
  weekPreview: {
    flex: 1,
  },
}));

// TODO hamburger menu is on same height as this

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
        <AppMenuToggleButton />
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
