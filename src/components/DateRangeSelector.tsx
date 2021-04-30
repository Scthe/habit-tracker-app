import React from "react";
import getDate from "date-fns/getDate";
import getMonth from "date-fns/getMonth";
import addDays from "date-fns/addDays";
import format from "date-fns/format";
import Icon from "@material-ui/core/Icon";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

import { getWeekRange } from "~utils";
import { activableOnWhiteBg, AppTheme } from "theme";
import { addMonths, addWeeks } from "date-fns";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme: AppTheme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
  },
  icon: {
    flex: "0",
  },
  text: {
    flex: "1",
    fontWeight: "bold",
    paddingTop: "15px",
  },
  textInCenter: {
    textAlign: "center",
  },
  onWhiteBg: activableOnWhiteBg(theme),
}));

const getWeekText = (date: Date): string => {
  const [mondayDate, sundayDate] = getWeekRange(date);
  const monthStart = getMonth(mondayDate);
  const monthEnd = getMonth(sundayDate);

  if (monthStart == monthEnd) {
    const dayStart = getDate(mondayDate);
    const dayEnd = getDate(sundayDate);
    return `${dayStart}-${dayEnd} ${format(date, "MMMM")}`;
  } else {
    const fmt = (d: Date) => `${getDate(d)} ${format(d, "MMM")}`;
    return `${fmt(mondayDate)} - ${fmt(sundayDate)}`;
  }
};

const getMonthText = (date: Date) => format(date, "MMMM yyyy");

interface Props {
  mode: "week" | "month";
  onWhiteBg?: boolean;
  currentDate: Date;
  setCurrentDate: (newDate: Date) => void;
  textInCenter?: boolean;
  className?: string;
}

// TODO rename, this component does not select range
export const DateRangeSelector: React.FC<Props> = ({
  mode,
  onWhiteBg,
  textInCenter,
  currentDate,
  setCurrentDate,
  className,
}) => {
  const styles = useStyles();

  // TODO add ripple effect or just make these into buttons
  const changeFn = mode === "week" ? addWeeks : addMonths;
  const handleClickNext = () => setCurrentDate(changeFn(currentDate, 1));
  const handleClickPrev = () => setCurrentDate(changeFn(currentDate, -1));
  // TODO on TODAY click: popup the calendar dialog to better select across months/years
  const name =
    mode === "week" ? getWeekText(currentDate) : getMonthText(currentDate);

  const bgRelatedClass = onWhiteBg ? styles.onWhiteBg : "";
  const rootClass = clsx(styles.root, bgRelatedClass, className);

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
    <div className={clsx(styles.text, textInCenter && styles.textInCenter)}>
      <span>{name}</span>
    </div>
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
  onWhiteBg: true,
};
