import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";
import clsx from "clsx";

import { AppPage } from "../../_shared";
import { Habit, HabitCompletionStatus } from "../_types";
import { useHabitDetails } from "./api/useHabitDetails";
import { DetailsHeader } from "./DetailsHeader";
import { DetailsFields } from "./DetailsFields";
import { ActivityCalendar } from "./ActivityCalendar";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  toolbarOffset: theme.mixins.toolbar,
  content: {
    padding: "25px 25px 0",
    overflow: "auto",
    marginBottom: "20px",
  },
  fields: { marginBottom: "20px" },
}));

// TODO breadcrumbs on desktop
const HabitDetails: React.FC<unknown> = () => {
  const { id } = useParams<{ id: string }>();
  const styles = useStyles();
  const habitAsync = useHabitDetails(id);

  // TODO add loading/error handling
  // if (!hasAsyncData(habitAsync)) { return <AsyncDataStatusNotDone/> }

  const habit: Habit = (habitAsync as any).data;
  const currentStatus = HabitCompletionStatus.DONE;
  const today = new Date();

  return (
    <AppPage className={styles.root}>
      <DetailsHeader id={id} />

      <div className={clsx(styles.toolbarOffset, styles.content)}>
        <DetailsFields
          habit={habit}
          currentStatus={currentStatus}
          today={today}
          className={styles.fields}
        />
        <ActivityCalendar initMonth={today} />
      </div>
    </AppPage>
  );
};

export default HabitDetails;
