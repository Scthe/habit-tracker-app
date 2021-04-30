import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import clsx from "clsx";

import { CalendarDayProps } from "~components";
import {
  byCalendarSize,
  StyleCalendarDayProps,
  TodayStatus,
} from "components/Calendar/DaysGrid";
import { HabitDayStatus } from "./api/useHabitStatuses";
import { HabitRectangle } from "./HabitRectangle";
import { AppTheme } from "theme";

const SHOWN_HABITS = 2;
const TODAY_CIRCLE_SIZE = "25px";

type Props = CalendarDayProps & {
  habitStatuses: HabitDayStatus["habits"];
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

const TextShowMore: React.FC<{
  day: Date;
  habitStatusesCount: number;
  styles: ReturnType<typeof useStyles>;
}> = ({ day, habitStatusesCount, styles }) => {
  const agendaLocation = {
    // TODO handle in agenda
    pathname: "/habits/agenda",
    state: { day },
  };

  return habitStatusesCount > SHOWN_HABITS ? (
    <Link to={agendaLocation} className={styles.moreHabitsText}>
      {`+ ${habitStatusesCount - SHOWN_HABITS} more`}
    </Link>
  ) : null;
};

export const CalendarDay: React.FC<Props> = ({
  day,
  today,
  isDayInCurrentMonth,
  className,
  role,
  habitStatuses,
  size,
}) => {
  const styles = useStyles({ size, day: day.getDate() });
  // const isDone = day.getDate() % 2 == 0;

  const getColor = (): string => {
    if (!isDayInCurrentMonth) {
      return styles.notThisMonth;
    }
    return "";
  };

  const rootClassName = clsx(className, styles.root, getColor());

  return (
    <div role={role} className={rootClassName}>
      <div
        className={clsx(
          styles.date,
          today === TodayStatus.Today ? styles.today2 : ""
        )}
      >
        <span className={today === TodayStatus.Today ? styles.today : ""}>
          {day.getDate()}
        </span>
      </div>

      {isDayInCurrentMonth ? (
        <div className={styles.dayContent}>
          <List className={styles.habitsList}>
            {habitStatuses.slice(0, SHOWN_HABITS).map((habitStatus) => (
              <HabitRectangle
                key={habitStatus.habitId}
                size={size}
                habitStatus={habitStatus}
              />
            ))}
          </List>
          <TextShowMore
            day={day}
            habitStatusesCount={habitStatuses.length}
            styles={styles}
          />
        </div>
      ) : null}
    </div>
  );
};
