import React from "react";
import getDate from "date-fns/getDate";
import addDays from "date-fns/addDays";
import format from "date-fns/format";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import clsx from "clsx";
import times from "lodash/times";

import { useDesktopLayout, useUserDateSettings } from "~hooks";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemDay: {
    flex: 1,
    minWidth: 0,
  },
  itemDayNotActive: {
    opacity: 0.4,
  },
  itemDayActive: {},
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

interface Props {
  currentDate: Date;
  setCurrentDate: (newDate: Date) => void;
  className?: string;
}

export const WeekPreview: React.FC<Props> = ({
  currentDate,
  setCurrentDate,
  className,
}) => {
  // material-ui tabs do not allow multiline
  const styles = useStyles();
  const dateUtils = useUserDateSettings();
  const isDesktop = useDesktopLayout();

  const [mondayDate] = dateUtils.getWeekStartEndDays(currentDate);
  const currentDayOfMonth = getDate(currentDate);

  const items = times(7, (i) => {
    const date = addDays(mondayDate, i);
    const dayOfMonth = getDate(date);
    const isActive = dayOfMonth === currentDayOfMonth;
    return {
      dayOfWeek: format(date, isDesktop ? "eee" : "eeeee"),
      dayOfMonth,
      onClick: () => setCurrentDate(date),
      isActive,
      className: clsx(
        styles.itemDay,
        isActive ? styles.itemDayActive : styles.itemDayNotActive
      ),
    };
  });

  return (
    <div className={clsx(styles.root, className)}>
      {items.map((date) => {
        return (
          <Button
            key={date.dayOfMonth}
            className={date.className}
            onClick={date.onClick}
            color="inherit"
            classes={{ label: styles.itemDayButtonLabel }}
          >
            <span className={styles.itemDayName}>{date.dayOfWeek}</span>
            <span className={styles.itemDayNo}>{date.dayOfMonth}</span>
          </Button>
        );
      })}
    </div>
  );
};
