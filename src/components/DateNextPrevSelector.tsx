import React from "react";
import format from "date-fns/format";
import addMonths from "date-fns/addMonths";
import addWeeks from "date-fns/addWeeks";
import Icon from "@material-ui/core/Icon";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

import IconButton from "@material-ui/core/IconButton";
import { UserDateUtils, useUserDateSettings } from "hooks/useUserDateSettings";
import { ToolbarTitle } from "components/ToolbarTitle";
import { createDateFromDay, DayOfYear, deconstructDate } from "utils/date";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
  },
  icon: {
    flex: "0",
  },
  text: {
    paddingTop: theme.spacing(1),
  },
}));

const getWeekText = (date: DayOfYear, dateUtil: UserDateUtils): string => {
  const [weekStart, weekEnd] = dateUtil.getWeekStartEndDays(date);

  if (weekStart.month == weekEnd.month) {
    const d = createDateFromDay(date);
    return `${weekStart.day}-${weekEnd.day} ${format(d, "MMMM")}`;
  } else {
    const fmt = (d: DayOfYear) =>
      `${d.day} ${format(createDateFromDay(d), "MMM")}`;
    return `${fmt(weekStart)} - ${fmt(weekEnd)}`;
  }
};

const getMonthText = (date: DayOfYear) => {
  const d = createDateFromDay(date);
  return format(d, "MMMM yyyy");
};

const applyDiff = (
  date: DayOfYear,
  mode: "week" | "month",
  diff: number
): DayOfYear => {
  const d = createDateFromDay(date);
  const changeFn = mode === "week" ? addWeeks : addMonths;
  return deconstructDate(changeFn(d, diff));
};

interface Props {
  mode: "week" | "month";
  currentDate: DayOfYear;
  setCurrentDate: (newDate: DayOfYear) => void;
  textInCenter?: boolean;
  className?: string;
}

export const DateNextPrevSelector: React.FC<Props> = ({
  mode,
  textInCenter,
  currentDate,
  setCurrentDate,
  className,
}) => {
  const styles = useStyles();
  const dateUtil = useUserDateSettings();

  const handleClickNext = () => setCurrentDate(applyDiff(currentDate, mode, 1));
  const handleClickPrev = () =>
    setCurrentDate(applyDiff(currentDate, mode, -1));
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

DateNextPrevSelector.defaultProps = {
  textInCenter: true,
};
