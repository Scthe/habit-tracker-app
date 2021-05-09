import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import { HabitStatus } from "../_types";
import { CalendarDay } from "./CalendarDay";
import { Calendar } from "~components";
import { useDesktopLayout } from "~hooks";
import { DayOfYear, isSameDay, MonthOfYear, sortStringCmpFn } from "~utils";
import { AsyncData } from "~types";

const useStyles = makeStyles((theme) => {
  const borderColor = theme.palette.grey["300"];
  return {
    calendar: {
      paddingTop: "5px",
      display: "flex",
      flexDirection: "column",
      height: "100%",
    },
    daysGrid: {
      flex: "1",
      display: "flex",
      flexDirection: "column",
    },
    week: {
      flex: "1",
      borderTop: `1px solid ${borderColor}`,
    },
    day: {
      borderRight: `1px solid ${borderColor}`,
      "&:last-child": {
        borderRightStyle: "none",
      },
    },
  };
});

interface Props {
  shownMonth: MonthOfYear;
  habitStatuses: AsyncData<HabitStatus[]>;
}

const getHabitStatuses = (
  day: DayOfYear,
  statusesAsync: AsyncData<HabitStatus[]>
): HabitStatus[] => {
  if (statusesAsync.status === "success") {
    const statusesForDay = statusesAsync.data.filter((e) =>
      isSameDay(e.day, day)
    );
    return statusesForDay.sort((a, b) =>
      sortStringCmpFn(a.habitName, b.habitName)
    );
  }
  return [];
};

export const CalendarMonth: React.FC<Props> = ({
  shownMonth,
  habitStatuses,
}) => {
  const styles = useStyles();
  const isDesktop = useDesktopLayout();

  return (
    <Calendar
      size={isDesktop ? "large" : "small"}
      shownMonth={shownMonth}
      allowKeyboardControl={true}
      loading={
        habitStatuses.status === "init" || habitStatuses.status === "loading"
      }
      className={styles.calendar}
      classes={{
        daysGrid: styles.daysGrid,
        week: styles.week,
        day: styles.day,
      }}
      renderDay={(dayProps) => (
        <CalendarDay
          {...dayProps}
          habitStatuses={getHabitStatuses(dayProps.day, habitStatuses)}
        />
      )}
    />
  );
};
