import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import clsx from "clsx";

import { routeAgenda } from "../constants";
import { AppTheme } from "theme";
import { DayOfYear } from "~utils";

interface Props {
  day: DayOfYear;
  isDone: boolean;
  className?: string;
  showAsLink?: boolean;
}

const useStyles = makeStyles((theme: AppTheme) => ({
  iconWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.common.white,
    textDecoration: "none",

    opacity: 0.8,
    "&:hover": {
      opacity: 1.0,
    },
  },
  iconDone: {
    background: theme.palette.app.habits.done,
  },
  iconNotDone: {
    background: theme.palette.app.habits.notDone,
  },
}));

export const HabitCalendarDayStatus: React.FC<Props> = ({
  day,
  isDone,
  className,
  showAsLink,
}) => {
  const styles = useStyles();

  const icon = isDone
    ? {
        icon: "check",
        class: styles.iconDone,
      }
    : {
        icon: "close",
        class: styles.iconNotDone,
      };
  const classes = clsx(styles.iconWrapper, icon.class, className);

  if (showAsLink) {
    return (
      <Link to={routeAgenda(day)} className={classes}>
        <Icon>{icon.icon}</Icon>
      </Link>
    );
  } else {
    return (
      <div className={classes}>
        <Icon>{icon.icon}</Icon>
      </div>
    );
  }
};
