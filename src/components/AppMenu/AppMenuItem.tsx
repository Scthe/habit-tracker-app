import React from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import ListItem from "@material-ui/core/ListItem";
import Icon from "@material-ui/core/Icon";
import { lighten, makeStyles } from "@material-ui/core/styles";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import {
  CurrentActiveElement,
  AppMenuItem as AppMenuItemType,
} from "./constants";

const useItemStyles = makeStyles((theme) => ({
  root: {
    textDecoration: "none",
    color: theme.palette.text.primary,
  },
  itemNotActive: {},
  itemActive: {
    color: theme.palette.primary.main,
    background: lighten(theme.palette.primary.main, 0.8),
    fontWeight: "bold",
  },
  itemActiveIcon: {
    color: "inherit",
  },
  itemActiveText: {
    color: "inherit",
    fontWeight: "bold",
  },
}));

interface Props {
  onlyIcon: boolean;
  currentItem?: CurrentActiveElement;
  item: AppMenuItemType;
}

export const AppMenuItem: React.FC<Props> = ({
  currentItem,
  item,
  onlyIcon,
}) => {
  const { id, to, onClick, icon, name } = item;
  const styles = useItemStyles();
  const isActive = currentItem === id;

  const ifActive = (cls: string) => (isActive ? cls : "");
  const activeClass = clsx(isActive ? styles.itemActive : styles.itemNotActive);

  const element = (
    <ListItem
      button
      className={clsx(activeClass)}
      aria-label={name.toLowerCase()}
      onClick={to == null ? onClick : undefined}
    >
      <ListItemIcon color="inherit" className={ifActive(styles.itemActiveIcon)}>
        <Icon color="inherit">{icon}</Icon>
      </ListItemIcon>

      {onlyIcon ? null : (
        <ListItemText
          className={ifActive(styles.itemActiveText)}
          primary={name}
        />
      )}
    </ListItem>
  );

  if (to != null) {
    return (
      <Link to={to} className={styles.root}>
        {element}
      </Link>
    );
  }

  return element;
};
