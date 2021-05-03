import React from "react";
import getDate from "date-fns/getDate";
import getMonth from "date-fns/getMonth";
import format from "date-fns/format";
import addMonths from "date-fns/addMonths";
import addWeeks from "date-fns/addWeeks";
import Icon from "@material-ui/core/Icon";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

import IconButton from "@material-ui/core/IconButton";
import { UserDateUtils, useUserDateSettings } from "~hooks";
import { ToolbarTitle } from "~components";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "row",
  },
  icon: {
    flex: "0",
  },
  text: {
    paddingTop: "7px",
  },
}));

const getWeekText = (date: Date, dateUtil: UserDateUtils): string => {
  const [weekStart, weekEnd] = dateUtil.getWeekStartEndDays(date);
  const monthStart = getMonth(weekStart);
  const monthEnd = getMonth(weekEnd);

  if (monthStart == monthEnd) {
    const dayStart = getDate(weekStart);
    const dayEnd = getDate(weekEnd);
    return `${dayStart}-${dayEnd} ${format(date, "MMMM")}`;
  } else {
    const fmt = (d: Date) => `${getDate(d)} ${format(d, "MMM")}`;
    return `${fmt(weekStart)} - ${fmt(weekEnd)}`;
  }
};

const getMonthText = (date: Date) => format(date, "MMMM yyyy");

interface Props {
  mode: "week" | "month";
  currentDate: Date;
  setCurrentDate: (newDate: Date) => void;
  textInCenter?: boolean;
  className?: string;
}

// TODO rename, this component does not select range
export const DateRangeSelector: React.FC<Props> = ({
  mode,
  textInCenter,
  currentDate,
  setCurrentDate,
  className,
}) => {
  const styles = useStyles();
  const dateUtil = useUserDateSettings();

  const changeFn = mode === "week" ? addWeeks : addMonths;
  const handleClickNext = () => setCurrentDate(changeFn(currentDate, 1));
  const handleClickPrev = () => setCurrentDate(changeFn(currentDate, -1));
  const name =
    mode === "week"
      ? getWeekText(currentDate, dateUtil)
      : getMonthText(currentDate);

  const rootClass = clsx(styles.root, className);

  const iconL = (
    <IconButton
      className={styles.icon}
      onClick={handleClickPrev}
      color="inherit"
    >
      <Icon>chevron_left</Icon>
    </IconButton>
  );
  const iconR = (
    <IconButton
      className={styles.icon}
      onClick={handleClickNext}
      color="inherit"
    >
      <Icon>chevron_right</Icon>
    </IconButton>
  );
  const text = (
    <ToolbarTitle alignLeft={!textInCenter} className={styles.text}>
      {name}
    </ToolbarTitle>
  );

  return textInCenter ? (
    <div className={rootClass}>
      {iconL}
      {text}
      {iconR}
    </div>
  ) : (
    <div className={rootClass}>
      {iconL}
      {iconR}
      {text}
    </div>
  );
};

DateRangeSelector.defaultProps = {
  textInCenter: true,
};
