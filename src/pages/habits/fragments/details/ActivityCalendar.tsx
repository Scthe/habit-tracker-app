import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

import { getStatus } from "../../_shared";
import { Habit, HabitCompletionStatus, HabitStatus } from "../../_types";
import { useGetHabitStatuses } from "../../api";
import { ActivityDay } from "./ActivityDay";
import { Calendar, DateNextPrevSelector } from "~components";
import { DayOfYear, deconstructDateToMonth } from "~utils";
import { AsyncData } from "~types";

interface Props {
  habit: Habit;
}

const useStyles = makeStyles((theme) => ({
  root: {},
  header: { marginBottom: "10px" },
  calendarWrapper: {},
  monthsSwitcher: {
    background: theme.palette.primary.main,
    color: "white",
  },
  calendar: {
    paddingTop: "5px",
    background: "#f9f9f9",
  },
}));

const getHabitStatus = (
  id: Habit["id"],
  day: DayOfYear,
  statusesAsync: AsyncData<HabitStatus[]>
): HabitCompletionStatus => {
  if (statusesAsync.status === "success") {
    return getStatus(id, day, statusesAsync.data);
  }
  return HabitCompletionStatus.DONE;
};

export const ActivityCalendar: React.FC<Props> = ({ habit }) => {
  const styles = useStyles();
  const [shownMonth, setShownMonth] = useState(
    deconstructDateToMonth(new Date())
  );
  const statusesAsync = useGetHabitStatuses(shownMonth).data;

  return (
    <div className={styles.root}>
      <Typography variant="h5" className={styles.header}>
        Activity
      </Typography>

      <div className={styles.calendarWrapper}>
        <Paper square={true} className={styles.monthsSwitcher}>
          <DateNextPrevSelector
            mode="month"
            currentDate={{ ...shownMonth, day: 16 }}
            setCurrentDate={setShownMonth}
            textInCenter={true}
          />
        </Paper>

        <Calendar
          size="small"
          shownMonth={shownMonth}
          allowKeyboardControl={true}
          loading={
            statusesAsync.status === "init" ||
            statusesAsync.status === "loading"
          }
          className={styles.calendar}
          renderDay={(props) => (
            <ActivityDay
              {...props}
              doneStatus={getHabitStatus(habit.id, props.day, statusesAsync)}
            />
          )}
        />
      </div>
    </div>
  );
};
