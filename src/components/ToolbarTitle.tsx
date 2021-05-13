import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { AppTheme } from "theme/config";

const useStyles = makeStyles((theme: AppTheme) => ({
  title: {
    ...theme.mixins.overflow,
    width: 0,
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
