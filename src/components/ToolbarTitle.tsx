import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

const useStyles = makeStyles(() => ({
  title: {
    flexGrow: 1,
  },
  textInCenter: {
    textAlign: "center",
  },
}));

interface Props {
  className?: string;
  alignLeft?: boolean;
}

// TODO use everywhere, amybe add 'align to left' prop with some default
export const ToolbarTitle: React.FC<Props> = ({
  className,
  alignLeft,
  children,
}) => {
  const styles = useStyles();

  const classes = clsx(
    styles.title,
    className,
    !alignLeft && styles.textInCenter
  );

  return (
    <Typography variant="h6" className={classes}>
      {children}
    </Typography>
  );
};
