import React from "react";
import { Link } from "react-router-dom";
import { darken, lighten, makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";

import { HabitStatus } from "../../_types";
import { routeDetails } from "../../constants";
import { getHabitHtmlColor, getHabitHtmlTextColor } from "../../utils";
import { CalendarDayProps, byCalendarSize } from "~components";
import { AppTheme, byThemeColor } from "theme";

type RectStyleProps = {
  col: HabitStatus["habitColor"];
  size: CalendarDayProps["size"];
};

const useStyles = makeStyles((theme: AppTheme) => ({
  root: {
    marginBottom: byCalendarSize("3px", "5px"),
    padding: "0",
  },
  habitName: (props: RectStyleProps) => ({
    ...theme.mixins.overflow,
    width: "100%",
    padding: "4px 4px",
    borderRadius: "2px",
    marginRight: "4px",
    textDecoration: "none",
    color: getHabitHtmlTextColor(props.col),
    background: getHabitHtmlColor(props.col),
    "&:hover": {
      background: byThemeColor(
        theme,
        darken(getHabitHtmlColor(props.col), 0.2),
        lighten(getHabitHtmlColor(props.col), 0.2)
      ),
    },
  }),
}));

interface Props {
  habitStatus: HabitStatus;
  size: CalendarDayProps["size"];
}

export const HabitRectangle: React.FC<Props> = ({ habitStatus, size }) => {
  // TODO show status done or not
  const styles = useStyles({ size, col: habitStatus.habitColor });
  return (
    <ListItem className={styles.root}>
      <Link to={routeDetails(habitStatus.habitId)} className={styles.habitName}>
        {habitStatus.habitName}
      </Link>
    </ListItem>
  );
};
