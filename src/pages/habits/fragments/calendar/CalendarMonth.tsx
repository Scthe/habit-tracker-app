import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import { CalendarDay } from "./CalendarDay";
import { CalendarData, HabitWithStatus } from "./useCalendarData";
import { Calendar } from "components/Calendar";
import { useDesktopLayout } from "hooks/useResponsive";
import { DayOfYear, isSameDay, MonthOfYear } from "~utils";
import { AsyncData } from "~types";

const useStyles = makeStyles((theme) => {
  const borderColor = theme.palette.grey["300"];
  return {
    calendar: {
      display: "flex",
      flexDirection: "column",
      height: "100%",
    },
    skeleton: {
      height: "100%",
    },
    daysGrid: {
      flex: "1",
      display: "flex",
      flexDirection: "column",
    },
    week: {
      flexGrow: 1,
      flexShrink: 1,
      flexBasis: 0,
      minHeight: 0,
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

const getHabitsForDay = (
  day: DayOfYear,
  calendar: AsyncData<CalendarData>
): HabitWithStatus[] => {
  if (calendar.status !== "success") {
    return [];
  }
  const habitsForDay = calendar.data.find((c) => isSameDay(c.day, day));
  return habitsForDay?.habits || [];
};

interface Props {
  shownMonth: MonthOfYear;
  setShownMonth: (nextMonth: MonthOfYear) => void;
  habitsPerDay: AsyncData<CalendarData>;
}

export const CalendarMonth: React.FC<Props> = ({
  shownMonth,
  setShownMonth,
  habitsPerDay,
}) => {
  const styles = useStyles();
  const isDesktop = useDesktopLayout();

  return (
    <Calendar
      size={isDesktop ? "large" : "small"}
      shownMonth={shownMonth}
      setShownMonth={setShownMonth}
      allowKeyboardControl={true}
      loading={
        habitsPerDay.status === "init" || habitsPerDay.status === "loading"
      }
      className={styles.calendar}
      classes={{
        daysGrid: styles.daysGrid,
        week: styles.week,
        day: styles.day,
        skeleton: styles.skeleton,
      }}
      renderDay={(dayProps) => (
        <CalendarDay
          {...dayProps}
          habits={getHabitsForDay(dayProps.day, habitsPerDay)}
        />
      )}
    />
  );
};
