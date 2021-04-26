import React from "react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import Box from "@material-ui/core/Box";
import List from "@material-ui/core/List";
import Drawer from "@material-ui/core/Drawer";
import ListItem from "@material-ui/core/ListItem";
import Icon from "@material-ui/core/Icon";
import { makeStyles } from "@material-ui/core/styles";

import {
  ITEM_AGENDA,
  ITEM_CALENDAR,
  ITEM_MANAGE_HABITS,
  ITEM_ME,
  ITEM_CREATE_HABIT,
  CurrentActiveElement,
  AppMenuItem as AppMenuItemType,
} from "./constants";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "57px",
  },
  itemRoot: {
    textDecoration: "none",
  },
  itemListItem: {
    padding: "0",
  },
  itemIconButton: {
    borderRadius: "0",
    width: "100%",
    color: theme.palette.primary.main,
    padding: "20px 16px",
  },
  itemNotActive: {
    color: theme.palette.text.secondary,
    "&:hover": {
      color: theme.palette.text.primary,
    },
  },
  itemActive: {
    color: theme.palette.primary.main,
  },
}));

///////
// AppMenuItem

interface AppMenuItemProps {
  currentItem: CurrentActiveElement;
  item: AppMenuItemType;
}

const AppMenuItem: React.FC<AppMenuItemProps> = ({ currentItem, item }) => {
  const styles = useStyles();
  const isActive = currentItem === item.id;
  const iconClasses = clsx(isActive ? styles.itemActive : styles.itemNotActive);

  // 8 16
  return (
    <Link to={item.to} className={styles.itemRoot}>
      <ListItem className={styles.itemListItem}>
        <IconButton
          aria-label={item.name.toLowerCase()}
          className={styles.itemIconButton}
          centerRipple={false}
        >
          <Icon className={iconClasses}>{item.icon}</Icon>
        </IconButton>
      </ListItem>
    </Link>
  );
};

///////
// AppMenuVertical

interface Props {
  className?: string;
  currentItem: CurrentActiveElement;
}

export const AppMenuVertical: React.FC<Props> = ({
  className,
  currentItem,
}) => {
  const items = [
    ITEM_AGENDA,
    ITEM_CALENDAR,
    ITEM_MANAGE_HABITS,
    ITEM_ME,
    ITEM_CREATE_HABIT,
  ];

  const styles = useStyles();

  return (
    <Drawer variant="permanent" className={clsx(className, styles.root)}>
      <Box
        display="flex"
        justifyContent="center"
        flexDirection="column"
        height="100%"
      >
        <List>
          {items.map((e) => (
            <AppMenuItem key={e.id} currentItem={currentItem} item={e} />
          ))}
        </List>
      </Box>
    </Drawer>
  );
};
