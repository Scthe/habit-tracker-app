import React from "react";
import { Link } from "react-router-dom";
import { lighten, makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";

import { getHabitHtmlColor, getHabitHtmlTextColor } from "../../utils";
import { HabitStatus } from "../../_types";
import { CalendarDayProps, byCalendarSize } from "~components";
import { AppTheme } from "theme";

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
    textDecoration: "none",
    color: getHabitHtmlTextColor(theme, props.col),
    padding: "3px 3px",
    borderRadius: "3px",
    width: "100%",
    marginRight: "3px",
    background: getHabitHtmlColor(props.col),
    "&:hover": {
      background: () => lighten(getHabitHtmlColor(props.col), 0.1),
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
      <Link
        to={`/habits/${habitStatus.habitId}/details`}
        className={styles.habitName}
      >
        {habitStatus.habitName}
      </Link>
    </ListItem>
  );
};
