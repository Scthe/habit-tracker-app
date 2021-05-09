import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";
import clsx from "clsx";

import { AppPage } from "../../_shared";
import { useGetHabit } from "../api";
import { HabitCompletionStatus } from "../_types";
import { DetailsHeader } from "./DetailsHeader";
import { DetailsFields } from "./DetailsFields";
import { ActivityCalendar } from "./ActivityCalendar";
import { HabitTodayStatus } from "./HabitTodayStatus";

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
  const styles = useStyles();
  const { id } = useParams<{ id: string }>();
  const { data } = useGetHabit(id);
  const status = HabitCompletionStatus.NOT_DONE; // TODO mocked

  return (
    <AppPage className={styles.root}>
      <DetailsHeader id={id} />

      {data.status === "success" && data.data != null ? (
        <div className={clsx(styles.toolbarOffset, styles.content)}>
          <HabitTodayStatus habit={data.data} status={status} />
          <DetailsFields habit={data.data} className={styles.fields} />
          <ActivityCalendar habit={data.data} />
        </div>
      ) : (
        <>
          <p>TODO handle erros and loading</p>
          <p>{`e.g. <AsyncData data={} errorMessage="Could not load habit">Children if ok</>`}</p>
          <p>Or Suspense / ErrorBoundary this</p>
        </>
      )}
    </AppPage>
  );
};

export default HabitDetails;
