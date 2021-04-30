import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

import { AppPage } from "../../_shared";
import {
  HabitStatusPerMonthData,
  useHabitStatuses,
} from "./api/useHabitStatuses";
import { CalendarHeader } from "./CalendarHeader";
import { CalendarMonth } from "./CalendarMonth";
import { useDesktopLayout } from "~hooks";

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
  const [shownMonth, setShownMonth] = useState(new Date());
  const habitStatusesAsync = useHabitStatuses(shownMonth);

  // TODO add loading/error handling
  // if (!hasAsyncData(habitAsync)) { return <AsyncDataStatusNotDone/> }
  const habitStatuses: HabitStatusPerMonthData = (habitStatusesAsync as any)
    .data;

  return (
    <AppPage
      appMenuActiveItem={"calendar"}
      className={clsx(styles.root, { [styles.rootDesktop]: isDesktop })}
    >
      <CalendarHeader shownMonth={shownMonth} setShownMonth={setShownMonth} />

      <div className={clsx(styles.toolbarOffset, styles.content)}>
        <CalendarMonth shownMonth={shownMonth} habitStatuses={habitStatuses} />
      </div>
    </AppPage>
  );
};

export default Calendar;
