import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import clsx from "clsx";

import { routeAgenda } from "../constants";
import { HabitDailyHistoricalData } from "../_types";
import { AppTheme } from "theme";
import { DayOfYear } from "utils/date";

interface Props {
  day: DayOfYear;
  complete: HabitDailyHistoricalData;
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
  iconNoHabits: {
    background: theme.palette.background.paper,
  },
}));

export const HabitCalendarDayStatus: React.FC<Props> = ({
  day,
  complete,
  className,
  showAsLink,
}) => {
  const styles = useStyles();

  const icon =
    complete === "done"
      ? {
          icon: "check",
          class: styles.iconDone,
        }
      : complete === "not_done"
      ? {
          icon: "close",
          class: styles.iconNotDone,
        }
      : {
          icon: "",
          class: styles.iconNoHabits,
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
