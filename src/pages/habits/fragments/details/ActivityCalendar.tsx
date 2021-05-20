import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import grey from "@material-ui/core/colors/grey";

import { getStatus } from "../../utils";
import { Habit, HabitCompletionStatus, HabitStatus } from "../../_types";
import { useGetHabitStatuses } from "../../api";
import { ActivityDay } from "./ActivityDay";
import { Calendar, DateNextPrevSelector, SectionHeader } from "~components";
import { DayOfYear, deconstructDateToMonth } from "~utils";
import { AsyncData } from "~types";
import { AppTheme } from "theme";

interface Props {
  habit: Habit;
  allowKeyboardControl: boolean;
}

const useStyles = makeStyles((theme: AppTheme) => ({
  root: {},
  calendarWrapper: {},
  monthsSwitcher: {
    background: theme.palette.primary.main,
    color: "white",
  },
  calendar: {
    paddingTop: theme.spacing(1),
    borderWidth: "0 1px 1px",
    borderStyle: "solid",
    borderColor: grey[500],
  },
  skeleton: {
    height: "220px",
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

export const ActivityCalendar: React.FC<Props> = ({
  habit,
  allowKeyboardControl,
}) => {
  const styles = useStyles();
  const [shownMonth, setShownMonth] = useState(
    deconstructDateToMonth(new Date())
  );
  const statusesAsync = useGetHabitStatuses(shownMonth).data;

  return (
    <div className={styles.root}>
      <SectionHeader>Activity</SectionHeader>

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
          setShownMonth={setShownMonth}
          allowKeyboardControl={allowKeyboardControl}
          loading={
            statusesAsync.status === "init" ||
            statusesAsync.status === "loading"
          }
          className={styles.calendar}
          classes={{ skeleton: styles.skeleton }}
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
