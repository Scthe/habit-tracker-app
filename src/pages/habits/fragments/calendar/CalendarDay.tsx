import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

import { HabitStatus } from "../../_types";
import { HabitsList } from "./HabitsList";
import {
  CalendarDayProps,
  byCalendarSize,
  StyleCalendarDayProps,
} from "~components";
import { AppTheme } from "theme";

const TODAY_CIRCLE_SIZE = "25px";

type Props = CalendarDayProps & {
  habitStatuses: HabitStatus[];
};

type StyleProps = StyleCalendarDayProps & { day: number };

const useStyles = makeStyles<AppTheme, StyleProps>((theme) => ({
  root: {
    padding: "5px 0",
  },
  date: {
    textAlign: "center",
    marginBottom: "5px",
  },
  today: {
    color: "transparent", // I'm the CSS master..
    position: "relative",
    "&::before": {
      content: (p) => `"${p.day}"`,
      width: TODAY_CIRCLE_SIZE,
      height: TODAY_CIRCLE_SIZE,
      background: theme.palette.primary.main,
      borderRadius: "50%",
      position: "absolute",
      color: "white",
      lineHeight: "25px",
      top: "-2px",
    },
  },
  notThisMonth: {
    background: "transparent",
    color: theme.palette.text.disabled,
  },
  dayContent: {
    fontSize: byCalendarSize("0.5rem", "0.7rem"),
  },
}));

export const CalendarDay: React.FC<Props> = ({
  day,
  relativeToToday,
  isDayInCurrentMonth,
  className,
  role,
  habitStatuses,
  size,
}) => {
  const styles = useStyles({
    size,
    day: day.day,
  });

  const isToday = relativeToToday === "today";
  const rootClassName = clsx(
    className,
    styles.root,
    isDayInCurrentMonth ? "" : styles.notThisMonth
  );
  const dayNumberClassName = clsx(styles.date, isToday ? styles.today2 : "");

  return (
    <div role={role} className={rootClassName}>
      <div className={dayNumberClassName}>
        <span className={isToday ? styles.today : ""}>{day.day}</span>
      </div>

      {isDayInCurrentMonth && habitStatuses.length > 0 ? (
        <div className={styles.dayContent}>
          <HabitsList day={day} size={size} habitStatuses={habitStatuses} />
        </div>
      ) : null}
    </div>
  );
};
