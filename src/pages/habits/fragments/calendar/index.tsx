import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

import { useGetHabitStatuses } from "../../api";
import { CalendarHeader } from "./CalendarHeader";
import { CalendarMonth } from "./CalendarMonth";
import { deconstructDateToMonth } from "~utils";

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
  const [shownMonth, setShownMonth] = useState(
    deconstructDateToMonth(new Date())
  );

  // TODO add error handling (loading is handled by Calendar)
  const habitStatusesAsync = useGetHabitStatuses(shownMonth);

  return (
    <>
      <CalendarHeader shownMonth={shownMonth} setShownMonth={setShownMonth} />

      <div className={clsx(styles.toolbarOffset, styles.content)}>
        <CalendarMonth
          shownMonth={shownMonth}
          habitStatuses={habitStatusesAsync.data}
        />
      </div>
    </>
  );
};

// used with React.Lazy, but eslint has problems
// eslint-disable-next-line import/no-unused-modules
export default Calendar;
