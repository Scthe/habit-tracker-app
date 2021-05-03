import React from "react";
import Box from "@material-ui/core/Box";
import Icon from "@material-ui/core/Icon";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  icon: {
    color: theme.palette.text.disabled,
    fontSize: "200px",
  },
  message: {
    color: theme.palette.text.disabled,
  },
}));

interface Props {
  retry?: () => void;
}

export const ListError: React.FC<Props> = ({ retry }) => {
  const styles = useStyles();

  return (
    <Box textAlign="center">
      <Icon className={styles.icon}>cloud_off</Icon>
      <Typography className={styles.message}>Can't load the results</Typography>
      {retry ? (
        <Button onClick={retry} color="primary">
          Try again
        </Button>
      ) : null}
    </Box>
  );
};
