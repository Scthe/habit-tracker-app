import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

import { useUserDateSettings } from "hooks/useUserDateSettings";
import {
  DayOfYear,
  DaysRelation,
  MonthOfYear,
  relativeToToday,
} from "utils/date";

export interface CalendarDayProps {
  day: DayOfYear;
  relativeToToday: DaysRelation;
  size: "small" | "large";
  isDayInCurrentMonth: boolean;
  className?: string;
  role: "cell";
}

type StyleCalendarDayProps = Pick<CalendarDayProps, "size">;

export const byCalendarSize = function <PropT extends StyleCalendarDayProps>(
  valSmall: string,
  valLarge: string
) {
  return (p: PropT): string => (p.size === "small" ? valSmall : valLarge);
};

export interface Props {
  size: "small" | "large";
  shownMonth: MonthOfYear;
  renderDay: (props: CalendarDayProps) => React.ReactNode;
  classes?: {
    daysGrid?: string;
    week?: string;
    day?: string;
  };
}

const useStyles = makeStyles(() => ({
  root: {},
  week: {
    display: "flex",
  },
  day: {
    flex: 1,
    minWidth: 0,
  },
}));

export const DaysGrid: React.FC<Props> = ({
  size,
  shownMonth,
  renderDay,
  classes,
}) => {
  const styles = useStyles();
  const dateUtil = useUserDateSettings();

  const weeksInCalendar = dateUtil.getDaysInCalendar(shownMonth);

  const createDaysProps = (day: DayOfYear): CalendarDayProps => {
    return {
      day,
      relativeToToday: relativeToToday(day),
      size,
      isDayInCurrentMonth: day.month === shownMonth.month,
      className: clsx(styles.day, classes?.day),
      role: "cell",
    };
  };

  return (
    <div role="grid" className={clsx(styles.root, classes?.daysGrid)}>
      {weeksInCalendar.map((week, idx) => (
        <div
          role="row"
          key={`week-${idx}`}
          className={clsx(styles.week, classes?.week)}
        >
          {week.map((day, idx2) => {
            const dayProps = createDaysProps(day);
            return (
              <Fragment key={`day-${idx2}`}>{renderDay(dayProps)}</Fragment>
            );
          })}
        </div>
      ))}
    </div>
  );
};

DaysGrid.defaultProps = {
  classes: {},
};
