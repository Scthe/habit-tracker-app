import * as React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Skeleton from "@material-ui/lab/Skeleton";

// import { DAY_SIZE, DAY_MARGIN } from './constants/dimensions';
// import { withDefaultProps } from './_shared/withDefaultProps';
import { useStyles as useCalendarStyles } from "./Calendar";

interface Props {
  className: string;
}

export const useStyles = makeStyles({
  root: {},
  daySkeleton: {
    margin: `0 5px`,
  },
  hidden: {
    visibility: "hidden",
  },
});

const monthMap = [
  [0, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 0, 0, 0],
];

// TODO test me!
// https://github.com/mui-org/material-ui-pickers/blob/next/lib/src/CalendarSkeleton.tsx
export const CalendarSkeleton: React.FC<Props> = ({ className }) => {
  const styles = useStyles();
  const calendarClasses = useCalendarStyles();

  return (
    <div className={clsx(styles.root, className)}>
      {monthMap.map((week, index) => (
        <div key={index} className={calendarClasses.week}>
          {week.map((day, index2) => (
            <Skeleton
              key={index2}
              variant="circle"
              width="20px"
              height="20px"
              className={clsx(styles.daySkeleton, {
                [styles.hidden]: day === 0,
              })}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
