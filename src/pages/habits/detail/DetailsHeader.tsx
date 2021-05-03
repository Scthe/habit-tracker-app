import React from "react";
import { Link, useHistory } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import { makeStyles } from "@material-ui/core/styles";

import { Habit } from "../_types";

const useStyles = makeStyles((theme) => ({
  menuButton: {},
  title: {
    flexGrow: 1,
  },
  editLink: {
    color: "inherit",
  },
}));

interface Props {
  id: Habit["id"];
}

export const DetailsHeader: React.FC<Props> = ({ id }) => {
  const styles = useStyles();
  const history = useHistory();

  const goBack = () => history.goBack();

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          className={styles.menuButton}
          onClick={goBack}
        >
          <Icon>chevron_left</Icon>
        </IconButton>

        <Typography variant="h6" className={styles.title}>
          Habit Details
        </Typography>

        <Link to={`/habits/${id}/edit`} className={styles.editLink}>
          <Button color="inherit">Edit</Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
};
