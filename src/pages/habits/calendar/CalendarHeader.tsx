import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";

import { DateNextPrevSelector } from "~components";
import { useDesktopLayout } from "~hooks";

const useStyles = makeStyles(() => ({
  selector: { flex: "1" },
}));

interface Props {
  shownMonth: Date;
  setShownMonth: (d: Date) => void;
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
        <DateNextPrevSelector
          mode="month"
          currentDate={shownMonth}
          setCurrentDate={setShownMonth}
          textInCenter={!isDesktop}
          className={styles.selector}
        />
      </Toolbar>
    </AppBar>
  );
};
