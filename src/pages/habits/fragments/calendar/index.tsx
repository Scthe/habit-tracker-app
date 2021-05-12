import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { useGetHabitStatuses } from "../../api";
import { CalendarHeader } from "./CalendarHeader";
import { CalendarMonth } from "./CalendarMonth";
import { deconstructDateToMonth } from "~utils";
import { AppPageContent } from "pages/_shared";

const useStyles = makeStyles((theme) => ({
  toolbarOffset: theme.mixins.toolbar,
  content: {
    padding: "0",
    margin: "0",
    flex: "1",
    overflow: "auto",
    background: "#f9f9f9",
  },
}));

const Calendar: React.FC<unknown> = () => {
  const styles = useStyles();
  // TODO this starts on invalid date (previous month)
  const [shownMonth, setShownMonth] = useState(
    deconstructDateToMonth(new Date())
  );

  const habitStatusesAsync = useGetHabitStatuses(shownMonth);

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
          habitStatuses={habitStatusesAsync.data}
        />
      </AppPageContent>
    </>
  );
};

// used with React.Lazy, but eslint has problems
// eslint-disable-next-line import/no-unused-modules
export default Calendar;
