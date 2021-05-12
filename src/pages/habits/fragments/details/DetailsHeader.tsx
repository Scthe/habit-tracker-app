import React from "react";
import { Link, useHistory } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

import { routeEdit } from "../../constants";
import { Habit } from "../../_types";
import { ToolbarTitle } from "~components";

const useStyles = makeStyles((theme) => ({
  menuButton: {},
  editLink: {
    color: "inherit",
  },
  editLinkDisabled: {
    color: theme.palette.text.disabled,
  },
}));

interface Props {
  habit: Habit | null;
}

export const DetailsHeader: React.FC<Props> = ({ habit }) => {
  const styles = useStyles();
  const history = useHistory();

  const goBack = () => history.goBack();

  return (
    <AppBar position="static">
      <Toolbar>
        {/* TODO this button is useless on desktop */}
        <IconButton
          edge="start"
          color="inherit"
          className={styles.menuButton}
          onClick={goBack}
        >
          <Icon>chevron_left</Icon>
        </IconButton>

        <ToolbarTitle>Habit Details</ToolbarTitle>

        <Link
          to={habit != null ? routeEdit(habit) : ""}
          className={clsx(
            styles.editLink,
            habit == null && styles.editLinkDisabled
          )}
        >
          <Button color="inherit">Edit</Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
};
