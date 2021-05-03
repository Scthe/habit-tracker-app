import React from "react";
import getDate from "date-fns/getDate";
import addDays from "date-fns/addDays";
import format from "date-fns/format";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import times from "lodash/times";

import { activableOnWhiteBg, AppTheme } from "theme";
import { useUserDateSettings } from "~hooks";

const useStyles = makeStyles((theme: AppTheme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemDay: {
    ...activableOnWhiteBg(theme),
  },
  itemDayActive: {
    cursor: "pointer",
    color: theme.palette.actionOnWhiteBg.selected,
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

// TODO add ripple effect
export const WeekPreview: React.FC<Props> = ({
  currentDate,
  setCurrentDate,
  className,
}) => {
  const styles = useStyles();
  const dateUtils = useUserDateSettings();

  const [mondayDate] = dateUtils.getWeekStartEndDays(currentDate);
  const currentDayOfMonth = getDate(currentDate);

  const items = times(7, (i) => {
    const date = addDays(mondayDate, i);
    const dayOfMonth = getDate(date);
    const isActive = dayOfMonth === currentDayOfMonth;
    return {
      dayOfWeek: format(date, "eee"),
      dayOfMonth,
      onClick: () => setCurrentDate(date),
      isActive,
      className: isActive ? styles.itemDayActive : styles.itemDay,
    };
  });

  return (
    <div className={clsx(styles.root, className)}>
      {items.map((date) => {
        return (
          <div
            key={date.dayOfMonth}
            className={date.className}
            onClick={date.onClick}
          >
            <span className={styles.itemDayName}>{date.dayOfWeek}</span>
            <span className={styles.itemDayNo}>{date.dayOfMonth}</span>
          </div>
        );
      })}
    </div>
  );
};
