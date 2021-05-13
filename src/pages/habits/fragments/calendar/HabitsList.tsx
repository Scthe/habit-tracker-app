import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";

import { HabitStatus } from "../../_types";
import { routeAgenda } from "../../constants";
import { HabitRectangle } from "./HabitRectangle";
import { DayOfYear } from "~utils";

const SHOWN_HABITS = 2;

type Props = {
  day: DayOfYear;
  size: "small" | "large";
  habitStatuses: HabitStatus[];
};

const useStyles = makeStyles((theme) => ({
  habitsList: {
    margin: "0 0 5px",
    padding: "0",
  },
  moreHabitsText: {
    textDecoration: "none",
    color: theme.palette.text.secondary,
    "&:hover": {
      textDecoration: "underline",
      color: theme.palette.text.primary,
    },
  },
}));

export const HabitsList: React.FC<Props> = ({ day, size, habitStatuses }) => {
  const styles = useStyles();

  const shownHabits = habitStatuses.slice(0, SHOWN_HABITS);
  const notShownStatuses = habitStatuses.length - SHOWN_HABITS;

  return (
    <>
      <List className={styles.habitsList}>
        {shownHabits.map((habitStatus) => (
          <HabitRectangle
            key={habitStatus.habitId}
            size={size}
            habitStatus={habitStatus}
          />
        ))}
      </List>

      {notShownStatuses > 0 ? (
        <Link to={routeAgenda(day)} className={styles.moreHabitsText}>
          {`+ ${notShownStatuses} more`}
        </Link>
      ) : null}
    </>
  );
};
