import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

import { DetailsHeader } from "./DetailsHeader";
import { DetailsFields } from "./DetailsFields";
import { ActivityCalendar } from "./ActivityCalendar";
import { HabitTodayStatus } from "./HabitTodayStatus";
import { useDetailsData } from "./useDetailsData";
import { Habit } from "pages/habits/_types";

const useStyles = makeStyles((theme) => ({
  toolbarOffset: theme.mixins.toolbar,
  content: {
    padding: "25px 25px 0",
    overflow: "auto",
    marginBottom: "20px",
  },
  fields: { marginBottom: "20px" },
}));

interface Props {
  id: string;
  habit?: Habit;
}

const HabitDetails: React.FC<Props> = ({ id, habit }) => {
  const styles = useStyles();
  const detailsAsync = useDetailsData(id, habit);

  return (
    <>
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
    </>
  );
};

export default HabitDetails;
