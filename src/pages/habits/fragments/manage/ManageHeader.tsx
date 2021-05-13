import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Icon from "@material-ui/core/Icon";
import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles } from "@material-ui/core/styles";
import { AppMenuToggleButton } from "~components";

const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
  },
}));

interface Props {
  search: string;
  setSearch: (s: string) => void;
}

export const ManageHeader: React.FC<Props> = ({ search, setSearch }) => {
  const styles = useStyles();
  // no need for debounce since we already have all data

  return (
    <AppBar position="static">
      <Toolbar>
        <AppMenuToggleButton />

        <div className={styles.search}>
          <div className={styles.searchIcon}>
            <Icon>search</Icon>
          </div>
          <InputBase
            autoFocus={true}
            placeholder="Search all habits"
            defaultValue={search}
            onChange={(e) => setSearch(e.target.value)}
            classes={{
              root: styles.inputRoot,
              input: styles.inputInput,
            }}
            inputProps={{ "aria-label": "search" }}
          />
        </div>
      </Toolbar>
    </AppBar>
  );
};
