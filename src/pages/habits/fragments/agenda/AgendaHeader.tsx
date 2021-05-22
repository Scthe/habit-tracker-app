import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";

import { AppMenuToggleButton } from "components/AppMenu";
import { DateNextPrevSelector } from "components/DateNextPrevSelector";
import { WeekPreview } from "components/WeekPreview";
import { DayOfYear, WeekdayFmt } from "utils/date";
import { ResponsiveSize, useResponsive } from "hooks/useResponsive";

const useStyles = makeStyles(() => ({
  weekSelector: {
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

const getWeekdayNameFmt = (responsive: ResponsiveSize): WeekdayFmt => {
  switch (responsive) {
    case "phone":
      return "N";
    case "tablet":
      return "NN";
    case "laptop":
      return "NNN";
    case "desktop":
      return "NNNN";
  }
};

export const AgendaHeader: React.FC<Props> = ({
  currentDate,
  setCurrentDate,
}) => {
  const styles = useStyles();
  const responsive = useResponsive();

  const weekdayNameFmt = getWeekdayNameFmt(responsive);

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
          nameFormat={weekdayNameFmt}
        />
      </Toolbar>
    </AppBar>
  );
};
