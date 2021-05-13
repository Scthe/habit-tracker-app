import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import { DetailsHeader } from "./DetailsHeader";
import { DetailsFields } from "./DetailsFields";
import { ActivityCalendar } from "./ActivityCalendar";
import { HabitTodayStatus } from "./HabitTodayStatus";
import { useDetailsData } from "./useDetailsData";
import { Habit } from "pages/habits/_types";
import { adaptAsyncDataForContent, AppPageContent } from "pages/_shared";

const useStyles = makeStyles((theme) => ({
  fields: { marginBottom: theme.spacing(3) },
}));

interface Props {
  id: string;
  habit?: Habit;
}

const HabitDetails: React.FC<Props> = ({ id, habit }) => {
  const styles = useStyles();
  const asyncData = useDetailsData(id, habit);

  return (
    <>
      <DetailsHeader
        habit={asyncData.status === "success" ? asyncData.data : null}
      />

      <AppPageContent
        {...adaptAsyncDataForContent(asyncData, "Could not load habit")}
      >
        {asyncData.status === "success" ? (
          <>
            <HabitTodayStatus
              habit={asyncData.data}
              status={asyncData.data.status}
            />
            <DetailsFields habit={asyncData.data} className={styles.fields} />
            <ActivityCalendar habit={asyncData.data} />
          </>
        ) : null}
      </AppPageContent>
    </>
  );
};

// used with React.Lazy, but eslint has problems
// eslint-disable-next-line import/no-unused-modules
export default HabitDetails;
