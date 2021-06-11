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
import { AppMenuVariant } from "./useAppMenuVariant";
import { AppTheme } from "theme";
import { logSimpleEvent } from "firebaseUtils/analytics";

const useItemStyles = makeStyles((theme: AppTheme) => ({
  root: {
    textDecoration: "none",
    color: theme.palette.text.primary,
  },
  itemNotActive: {},
  itemActive: {
    color: theme.palette.primary.main,
    background: lighten(theme.palette.primary.main, 0.9),
    fontWeight: "bold",
    "&:hover": {
      background: lighten(theme.palette.primary.main, 0.8),
    },
  },
  itemIcon: {
    minWidth: "initial",
  },
  itemActiveIcon: {
    color: "inherit",
  },
  itemActiveText: {
    color: "inherit",
    fontWeight: "bold",
  },
  externalLink: {
    textDecoration: "none",
    color: theme.palette.text.primary,
  },
}));

interface Props {
  onlyIcon: boolean;
  currentItem?: CurrentActiveElement;
  item: AppMenuItemType;
  variant: AppMenuVariant;
}

export const AppMenuItem: React.FC<Props> = ({
  currentItem,
  item,
  onlyIcon,
  variant,
}) => {
  const { id, to, onClick, icon, name } = item;
  const styles = useItemStyles();
  const isActive = currentItem === id;

  const ifActive = (cls: string) => (isActive ? cls : "");
  const activeClass = isActive ? styles.itemActive : styles.itemNotActive;
  const itemIconClass = clsx(
    variant === "permanent-small" && styles.itemIcon,
    ifActive(styles.itemActiveIcon)
  );

  const element = (
    <ListItem
      button
      className={activeClass}
      aria-label={name.toLowerCase()}
      onClick={to == null ? onClick : undefined}
    >
      <ListItemIcon color="inherit" className={itemIconClass}>
        {item.svgIcon != null ? (
          item.svgIcon
        ) : (
          <Icon color="inherit">{icon}</Icon>
        )}
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
    if (to.startsWith("http")) {
      return (
        <a
          href={to}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.externalLink}
          onClick={() => {
            logSimpleEvent("github_outgoing", { to });
          }}
        >
          {element}
        </a>
      );
    }
    return (
      <Link to={to} className={styles.root}>
        {element}
      </Link>
    );
  }

  return element;
};
