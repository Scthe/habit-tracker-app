import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import isSameDay from "date-fns/isSameDay";
import getMonth from "date-fns/getMonth";
import isFuture from "date-fns/isFuture";
import isToday from "date-fns/isToday";
import clsx from "clsx";

import { getDaysInCalendar } from "~utils";

export enum TodayStatus {
  Past,
  Future,
  Today,
}

export interface CalendarDayProps {
  day: Date;
  today: TodayStatus;
  size: "small" | "large";
  isDayInCurrentMonth: boolean;
  isSelected: boolean;
  onSelected: () => void;
  className?: string;
  role: "cell";
}

export type StyleCalendarDayProps = Pick<CalendarDayProps, "size">;
export const byCalendarSize = function <PropT extends StyleCalendarDayProps>(
  valSmall: string,
  valLarge: string
) {
  return (p: PropT) => (p.size === "small" ? valSmall : valLarge);
};

export interface Props {
  size: "small" | "large";
  shownMonth: Date;
  selectedDay?: Date;
  onDaySelected?: (d: Date) => void;
  renderDay: (props: CalendarDayProps) => React.ReactNode;
  classes?: {
    daysGrid?: string;
    week?: string;
    day?: string;
  };
}

export const useStyles = makeStyles(() => ({
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
  selectedDay,
  onDaySelected,
  renderDay,
  classes,
}) => {
  const styles = useStyles();

  const currentMonthNumber = getMonth(shownMonth);
  const weeksInCalendar = getDaysInCalendar(shownMonth);

  const createDaysProps = (day: Date): CalendarDayProps => {
    const isDayToday = isToday(day);
    const isDayFuture = isFuture(day);
    return {
      day,
      today: isDayToday
        ? TodayStatus.Today
        : isDayFuture
        ? TodayStatus.Future
        : TodayStatus.Past,
      size,
      isDayInCurrentMonth: getMonth(day) === currentMonthNumber,
      isSelected: selectedDay != null && isSameDay(selectedDay, day),
      onSelected: () => onDaySelected && onDaySelected(day),
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
