import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { CalendarHeader } from "./CalendarHeader";
import { CalendarMonth } from "./CalendarMonth";
import { useCalendarData } from "./useCalendarData";
import { deconstructDateToMonth } from "~utils";
import { AppPageContent } from "pages/_shared";

const useStyles = makeStyles((theme) => ({
  toolbarOffset: theme.mixins.toolbar,
  content: {
    padding: "0",
    margin: "0",
    flex: "1",
    overflow: "auto",
  },
}));

const Calendar: React.FC<unknown> = () => {
  const styles = useStyles();
  const [shownMonth, setShownMonth] = useState(
    deconstructDateToMonth(new Date())
  );

  const calendarDataAsync = useCalendarData(shownMonth);

  return (
    <>
      <CalendarHeader shownMonth={shownMonth} setShownMonth={setShownMonth} />

      <AppPageContent
        hasPadding={false}
        canOverflow={false}
        className={styles.content}
      >
        <CalendarMonth
          shownMonth={shownMonth}
          setShownMonth={setShownMonth}
          habitsPerDay={calendarDataAsync}
        />
      </AppPageContent>
    </>
  );
};

// used with React.Lazy, but eslint has problems
// eslint-disable-next-line import/no-unused-modules
export default Calendar;
