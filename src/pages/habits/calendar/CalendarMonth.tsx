import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Calendar } from "~components";
import { CalendarDay } from "./CalendarDay";
import { useDesktopLayout } from "~hooks";
import {
  HabitDayStatus,
  HabitStatusPerMonthData,
} from "./api/useHabitStatuses";
import { getDate } from "date-fns";

export const useStyles = makeStyles((theme) => {
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
  shownMonth: Date;
  habitStatuses: HabitStatusPerMonthData;
}

const getHabitStatus = (
  day: Date,
  monthlyStatues: HabitStatusPerMonthData
): HabitDayStatus["habits"] => {
  const dayIdx = getDate(day);
  const data = monthlyStatues.find((e) => e.dayIdx == dayIdx);
  return data != null ? data.habits : [];
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
      loading={false}
      className={styles.calendar}
      classes={{
        daysGrid: styles.daysGrid,
        week: styles.week,
        day: styles.day,
      }}
      renderDay={(props) => (
        <CalendarDay
          {...props}
          habitStatuses={getHabitStatus(props.day, habitStatuses)}
        />
      )}
    />
  );
};
