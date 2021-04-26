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

const useStyles = makeStyles((theme: AppTheme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
  },
  icon: {
    ...activableOnWhiteBg(theme),
    flex: "0",
  },
  text: {
    ...activableOnWhiteBg(theme),
    flex: "1",
    textAlign: "center",
    fontWeight: "bold",
  },
}));

const getDateText = (date: Date): string => {
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

interface Props {
  currentDate: Date;
  setCurrentDate: (newDate: Date) => void;
  className?: string;
}

// TODO add ripple effect
export const WeekSelector: React.FC<Props> = ({
  currentDate,
  setCurrentDate,
  className,
}) => {
  const styles = useStyles();
  const goNextWeek = () => setCurrentDate(addDays(currentDate, 7));
  const goPrevWeek = () => setCurrentDate(addDays(currentDate, -7));
  const goToday = () => setCurrentDate(new Date());
  return (
    <div className={clsx(styles.root, className)}>
      <div className={styles.icon} onClick={goPrevWeek}>
        <Icon>chevron_left</Icon>
      </div>
      <div className={styles.text}>
        <span onClick={goToday}>{getDateText(currentDate)}</span>
      </div>
      <div className={styles.icon} onClick={goNextWeek}>
        <Icon>chevron_right</Icon>
      </div>
    </div>
  );
};
