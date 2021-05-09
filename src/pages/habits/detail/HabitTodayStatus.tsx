import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

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

const useStyles = makeStyles(() => ({
  activeLabelRoot: {
    display: "flex",
    margin: "0 0 15px",
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

  // TODO handle loading state here. Implement as `useState; ... setLoading(true); await ..; setLoading(false);`
  // The async requests lib had some helper for this?
  const handleToggle = () => {
    setHabitDone({
      habitId: habit.id,
      habitName: habit.name,
      habitColor: habit.color,
      status: getOppositeStatus(status),
      day: deconstructDate(new Date()),
    });
  };

  // TODO or just 2 big buttons: start timer, mark as done. Timer is a separate `/timer` scren
  return (
    <FormControlLabel
      label="Done today"
      labelPlacement="start"
      onChange={handleToggle}
      classes={{
        root: styles.activeLabelRoot,
        label: styles.activeLabelText,
      }}
      control={
        <Switch
          checked={status == HabitCompletionStatus.DONE}
          onChange={handleToggle}
          name="checkedB"
          color="primary"
        />
      }
    />
  );
};

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
