import React from "react";
import { Link } from "react-router-dom";
import { lighten, makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";

import { getHabitHtmlColor, getHabitHtmlTextColor } from "../_types";
import { HabitStatus } from "./api/useHabitStatuses";
import { CalendarDayProps } from "~components";
import { byCalendarSize } from "components/Calendar/DaysGrid";

type RectStyleProps = {
  col: HabitStatus["habitColor"];
  size: CalendarDayProps["size"];
};

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: byCalendarSize("3px", "5px"),
    padding: "0",
  },
  habitName: (props: RectStyleProps) => ({
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

    textOverflow: "ellipsis", // TODO make ellipsis mixin
    overflow: "hidden",
    whiteSpace: "nowrap",
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
