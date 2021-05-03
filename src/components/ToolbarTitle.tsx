import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

const useStyles = makeStyles(() => ({
  title: {
    flexGrow: 1,
  },
}));

interface Props {
  className?: string;
}

// TODO use everywhere, amybe add 'align to left' prop with some default
export const ToolbarTitle: React.FC<Props> = ({ className, children }) => {
  const styles = useStyles();
  return (
    <Typography variant="h6" className={clsx(styles.title, className)}>
      {children}
    </Typography>
  );
};
