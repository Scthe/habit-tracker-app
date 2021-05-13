import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";

import { AppMenuToggleButton, DateNextPrevSelector } from "~components";
import { useDesktopLayout } from "~hooks";
import { MonthOfYear } from "~utils";

const useStyles = makeStyles(() => ({
  selector: { flex: "1" },
}));

interface Props {
  shownMonth: MonthOfYear;
  setShownMonth: (d: MonthOfYear) => void;
}

export const CalendarHeader: React.FC<Props> = ({
  shownMonth,
  setShownMonth,
}) => {
  const styles = useStyles();
  const isDesktop = useDesktopLayout();

  return (
    <AppBar position="static">
      <Toolbar>
        <AppMenuToggleButton />
        <DateNextPrevSelector
          mode="month"
          currentDate={{ ...shownMonth, day: 16 }}
          setCurrentDate={setShownMonth}
          textInCenter={!isDesktop}
          className={styles.selector}
        />
      </Toolbar>
    </AppBar>
  );
};