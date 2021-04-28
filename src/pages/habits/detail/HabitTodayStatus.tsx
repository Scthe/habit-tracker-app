import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

import { getDateDiff, stringifyDateDiff } from "~utils";
import { getNextHabitActivityDate } from "../_shared";
import { getOppositeStatus, Habit, HabitCompletionStatus } from "../_types";
import { DetailHabitField } from "./DetailHabitField";
import isSameDay from "date-fns/isSameDay";
import { useSetHabitDone } from "../agenda/api/useSetHabitDone";

const useStyles = makeStyles((_theme) => ({
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
  currentStatus: HabitCompletionStatus;
  today: Date; // in case we want to refresh every minute
}

export const HabitTodayStatus: React.FC<Props> = ({
  habit,
  currentStatus,
  today,
}) => {
  const styles = useStyles();
  const setHabitDone = useSetHabitDone();

  // const isActionable = canMarkHabitDone(habit, today); // TODO nope, only for today
  const nextActivityDate = getNextHabitActivityDate(habit, today);
  const isActionable = isSameDay(today, nextActivityDate);

  if (!isActionable) {
    const dateDiff = getDateDiff(today, nextActivityDate);
    return (
      <DetailHabitField
        id="next-occurence"
        label="Next occurence"
        value={`In ${stringifyDateDiff(dateDiff)}`}
      />
    );
  }

  const handleToggle = () => {
    // TODO handle loading state here. Implement as `useState; ... setLoading(true); await ..; setLoading(false);`
    if (isActionable) {
      setHabitDone(today, habit.id, getOppositeStatus(currentStatus));
    }
  };

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
          checked={currentStatus == HabitCompletionStatus.DONE}
          onChange={handleToggle}
          name="checkedB"
          color="primary"
        />
      }
    />
  );
};
