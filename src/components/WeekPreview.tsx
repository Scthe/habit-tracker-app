import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import clsx from "clsx";
import times from "lodash/times";

import { useUserDateSettings } from "~hooks";
import {
  addDays,
  DayOfYear,
  getWeekdayNameFromDay,
  isSameDay,
  WeekdayFmt,
} from "~utils";

const useDayButtonStyles = makeStyles(() => ({
  itemDay: {
    flex: 1,
    minWidth: 0,
  },
  itemDayNotActive: {
    opacity: 0.9,
  },
  itemDayActive: {
    fontWeight: "bold",
  },
  itemDayButtonLabel: {
    display: "block",
  },
  itemDayName: {
    textAlign: "center",
    display: "block",
  },
  itemDayNo: {
    textAlign: "center",
    display: "block",
  },
}));

interface DayButtonProps {
  day: DayOfYear;
  activeDate: DayOfYear;
  weekdayNameFmt: WeekdayFmt;
  onClick: (newDate: DayOfYear) => void;
  className?: string;
}

export const DayButton: React.FC<DayButtonProps> = ({
  day,
  activeDate,
  weekdayNameFmt,
  onClick,
}) => {
  const styles = useDayButtonStyles();

  const isActive = isSameDay(day, activeDate);
  const weekdayName = getWeekdayNameFromDay(day, weekdayNameFmt);

  const className = clsx(
    styles.itemDay,
    isActive ? styles.itemDayActive : styles.itemDayNotActive
  );

  return (
    <Button
      className={className}
      onClick={() => onClick(day)}
      color="inherit"
      classes={{ label: styles.itemDayButtonLabel }}
    >
      <span className={styles.itemDayName}>{weekdayName}</span>
      <span className={styles.itemDayNo}>{day.day}</span>
    </Button>
  );
};

//////////////////////////////

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
}));

interface Props {
  activeDate: DayOfYear;
  setCurrentDate: (newDate: DayOfYear) => void;
  className?: string;
  nameFormat: WeekdayFmt;
}

export const WeekPreview: React.FC<Props> = ({
  activeDate,
  setCurrentDate,
  className,
  nameFormat,
}) => {
  // material-ui tabs do not allow multiline
  const styles = useStyles();
  const dateUtils = useUserDateSettings();

  const [mondayDate] = dateUtils.getWeekStartEndDays(activeDate);

  return (
    <div className={clsx(styles.root, className)}>
      {times(7).map((idx) => (
        <DayButton
          key={idx}
          day={addDays(mondayDate, idx)}
          weekdayNameFmt={nameFormat}
          onClick={setCurrentDate}
          activeDate={activeDate}
        />
      ))}
    </div>
  );
};
