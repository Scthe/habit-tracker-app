import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";
import clsx from "clsx";

import { AppPage } from "../../_shared";
import { DetailsHeader } from "./DetailsHeader";
import { DetailsFields } from "./DetailsFields";
import { ActivityCalendar } from "./ActivityCalendar";
import { HabitTodayStatus } from "./HabitTodayStatus";
import { useDetailsData } from "./useDetailsData";

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
  const detailsAsync = useDetailsData(id);

  return (
    <AppPage className={styles.root}>
      <DetailsHeader id={id} />

      {detailsAsync.status === "success" && detailsAsync.data != null ? (
        <div className={clsx(styles.toolbarOffset, styles.content)}>
          <HabitTodayStatus
            habit={detailsAsync.data}
            status={detailsAsync.data.status}
          />
          <DetailsFields habit={detailsAsync.data} className={styles.fields} />
          <ActivityCalendar habit={detailsAsync.data} />
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
