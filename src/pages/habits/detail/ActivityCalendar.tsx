import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import { useState } from "react";
import Paper from "@material-ui/core/Paper";
import { ActivityDay } from "./ActivityDay";
import { Calendar, DateNextPrevSelector } from "~components";

const useStyles = makeStyles((theme) => ({
  root: {},
  header: { marginBottom: "10px" },
  calendarWrapper: {
    // background: theme.palette.background.paper,
    // padding: "8px",
  },
  monthsSwitcher: {
    background: theme.palette.primary.main,
    color: "white",
    // padding: "5px 5px 0",
  },
  calendar: {
    paddingTop: "5px",
    background: "#f9f9f9",
  },
}));

interface Props {
  initMonth: Date;
}

export const ActivityCalendar: React.FC<Props> = ({ initMonth }) => {
  const styles = useStyles();
  const [shownMonth, setShownMonth] = useState(initMonth);

  return (
    <div className={styles.root}>
      <Typography variant="h5" className={styles.header}>
        Activity
      </Typography>

      <div className={styles.calendarWrapper}>
        <Paper square={true} className={styles.monthsSwitcher}>
          <DateNextPrevSelector
            mode="month"
            currentDate={shownMonth}
            setCurrentDate={setShownMonth}
            textInCenter={true}
          />
        </Paper>

        <Calendar
          size="small"
          shownMonth={shownMonth}
          allowKeyboardControl={true}
          loading={false}
          className={styles.calendar}
          renderDay={(props) => <ActivityDay {...props} />}
        />
      </div>
    </div>
  );
};
