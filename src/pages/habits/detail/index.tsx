import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";
import clsx from "clsx";

import { AppPage } from "../../_shared";
import { HabitCompletionStatus } from "../_types";
import { useGetHabit } from "../api/useGetHabit";
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
  const { data } = useGetHabit(id);

  // TODO add loading/error handling
  // if (!hasAsyncData(habitAsync)) { return <AsyncDataStatusNotDone/> }

  const currentStatus = HabitCompletionStatus.DONE; // TODO get current status
  const today = new Date();

  return (
    <AppPage className={styles.root}>
      <DetailsHeader id={id} />

      {data.status === "success" && data.data != null ? (
        <div className={clsx(styles.toolbarOffset, styles.content)}>
          <DetailsFields
            habit={data.data}
            currentStatus={currentStatus}
            today={today}
            className={styles.fields}
          />
          <ActivityCalendar initMonth={today} />
        </div>
      ) : (
        <span>TODO handle erros and loading</span>
      )}
    </AppPage>
  );
};

export default HabitDetails;
