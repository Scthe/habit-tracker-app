import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import CircularProgress from "@material-ui/core/CircularProgress";

import { getNextDateWhenHabitIsDoable } from "../_shared";
import { getOppositeStatus, Habit, HabitCompletionStatus } from "../_types";
import { useSetHabitDone } from "../api";
import { DetailHabitField } from "./DetailHabitField";
import {
  createDateFromDay,
  deconstructDate,
  getDateDiff,
  isSameDay,
  stringifyDateDiff,
} from "~utils";
import { useShowAlert } from "~hooks";

const LOADER_SIZE = "42px";

const useStyles = makeStyles(() => ({
  activeLabelRoot: {
    display: "flex",
    margin: "0 0 15px",
    minHeight: LOADER_SIZE,
  },
  activeLabelText: {
    flex: "1",
  },
}));

interface Props {
  habit: Habit;
  status: HabitCompletionStatus;
}

const ToggleTodayHabitDone: React.FC<Props> = ({ habit, status }) => {
  const styles = useStyles();
  const setHabitDone = useSetHabitDone();
  const showAlert = useShowAlert();
  const isDone = status == HabitCompletionStatus.DONE;
  const hasError = Boolean(setHabitDone.error);

  const handleToggle = async () => {
    try {
      await setHabitDone.execute({
        habitId: habit.id,
        habitName: habit.name,
        habitColor: habit.color,
        status: getOppositeStatus(status),
        day: deconstructDate(new Date()),
      });
    } catch (e) {
      showAlert({
        severity: "error",
        message: `Error, could not ${isDone ? "undo" : "finish"} the habit`,
      });
    }
  };

  return (
    <>
      <FormControlLabel
        label="Done today"
        labelPlacement="start"
        onChange={handleToggle}
        classes={{
          root: styles.activeLabelRoot,
          label: styles.activeLabelText,
        }}
        control={
          setHabitDone.loading ? (
            <CircularProgress size={LOADER_SIZE} color="primary" />
          ) : (
            <Checkbox
              checked={isDone}
              onChange={handleToggle}
              color="primary"
              disabled={hasError}
            />
          )
        }
      />
    </>
  );
};

// TODO or just 2 big buttons: start timer, mark as done. Timer is a separate `/timer` scren
export const HabitTodayStatus: React.FC<Props> = (props) => {
  const { habit } = props;

  const todayDate = new Date();
  const todayDay = deconstructDate(todayDate);
  const nextDoableDay = getNextDateWhenHabitIsDoable(habit.repeat, todayDay);
  const isActionableToday = isSameDay(todayDay, nextDoableDay);

  if (isActionableToday) {
    return <ToggleTodayHabitDone {...props} />;
  }

  // just render how much time is left
  const habitReminder = createDateFromDay(
    nextDoableDay,
    habit.reminderTime.hour,
    habit.reminderTime.minute
  );
  const dateDiff = getDateDiff(todayDate, habitReminder);
  return (
    <DetailHabitField
      id="next-occurence"
      label="Next occurence"
      value={`In ${stringifyDateDiff(dateDiff)}`}
    />
  );
};
