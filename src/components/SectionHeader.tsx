import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: { marginBottom: theme.spacing(1) },
}));

export const SectionHeader: React.FC = ({ children }) => {
  const styles = useStyles();
  return (
    <Typography variant="h5" className={styles.root}>
      {children}
    </Typography>
  );
};
