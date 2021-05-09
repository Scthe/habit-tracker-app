import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

import { AppPage } from "../../_shared";
import { useGetHabitStatuses } from "../api";
import { CalendarHeader } from "./CalendarHeader";
import { CalendarMonth } from "./CalendarMonth";
import { useDesktopLayout } from "~hooks";
import { deconstructDateToMonth } from "~utils";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  rootDesktop: {
    height: "100%", // TODO webkit-fill-available to fix this on phone?
  },
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
  const isDesktop = useDesktopLayout();
  const [shownMonth, setShownMonth] = useState(
    deconstructDateToMonth(new Date())
  );

  // TODO add error handling (loading is handled by Calendar)
  const habitStatusesAsync = useGetHabitStatuses(shownMonth);

  return (
    <AppPage
      appMenuActiveItem={"calendar"}
      className={clsx(styles.root, { [styles.rootDesktop]: isDesktop })}
    >
      <CalendarHeader shownMonth={shownMonth} setShownMonth={setShownMonth} />

      <div className={clsx(styles.toolbarOffset, styles.content)}>
        <CalendarMonth
          shownMonth={shownMonth}
          habitStatuses={habitStatusesAsync.data}
        />
      </div>
    </AppPage>
  );
};

export default Calendar;
