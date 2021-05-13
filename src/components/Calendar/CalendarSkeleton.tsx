import * as React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Skeleton from "@material-ui/lab/Skeleton";

interface Props {
  size: "small" | "large";
  className: string;
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  week: {
    display: "flex",
    flexGrow: 1,
    paddingTop: theme.spacing(1),
  },
  daySkeleton: ({ size }: { size: "small" | "large" }) => ({
    margin: size === "large" ? theme.spacing(0, 1) : "2px",
    flexGrow: 1,
    height: "100%",
  }),
  hidden: {
    visibility: "hidden",
  },
}));

const monthMap = [
  [0, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 0, 0, 0],
];

// https://github.com/mui-org/material-ui-pickers/blob/next/lib/src/CalendarSkeleton.tsx
export const CalendarSkeleton: React.FC<Props> = ({ size, className }) => {
  const styles = useStyles({ size });

  return (
    <div role="grid" className={clsx(styles.root, className)}>
      {monthMap.map((week, index) => (
        <div role="row" key={index} className={clsx(styles.week)}>
          {week.map((day, index2) => (
            <Skeleton
              key={`${index}-${index2}`}
              variant="rect"
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
