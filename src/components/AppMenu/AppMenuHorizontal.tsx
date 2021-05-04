import React from "react";
import { Link } from "react-router-dom";
import Icon from "@material-ui/core/Icon";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

import {
  ITEM_AGENDA,
  ITEM_CALENDAR,
  ITEM_MANAGE_HABITS,
  ITEM_ME,
  ITEM_CREATE_HABIT,
  CurrentActiveElement,
  AppMenuItem as AppMenuItemType,
} from "./constants";

const useStyles = makeStyles((theme) => ({
  itemRoot: {
    flex: 1,
  },
  itemIconButton: {
    borderRadius: "0",
    width: "100%",
    color: theme.palette.primary.main,
  },
  itemIconNotActive: {
    color: theme.palette.text.secondary,
  },
  itemIconActive: {
    color: theme.palette.primary.main,
  },
}));

///////
// AppMenuItem

interface AppMenuItemProps {
  currentItem?: CurrentActiveElement;
  item: AppMenuItemType;
}

// TODO add aria-label everywhere. Read docs on material-ui for each element
const AppMenuItem: React.FC<AppMenuItemProps> = ({ currentItem, item }) => {
  const styles = useStyles();
  const isActive = currentItem === item.id;
  const iconClasses = clsx(
    isActive ? styles.itemIconActive : styles.itemIconNotActive
  );

  return (
    <Link to={item.to} className={styles.itemRoot}>
      <IconButton
        aria-label={item.name.toLowerCase()}
        className={styles.itemIconButton}
        centerRipple={false}
      >
        <Icon className={iconClasses}>{item.icon}</Icon>
      </IconButton>
    </Link>
  );
};

///////
// AppMenuHorizontal

interface Props {
  currentItem?: CurrentActiveElement;
  flex: string;
}

export const AppMenuHorizontal: React.FC<Props> = ({
  currentItem,
  flex,
}: Props) => {
  // NOTE: BottomNavigation and BottomNavigationAction are very hard to style

  const items = [
    ITEM_AGENDA,
    ITEM_CALENDAR,
    ITEM_CREATE_HABIT,
    ITEM_MANAGE_HABITS,
    ITEM_ME,
  ];

  return (
    <Box
      display="flex"
      flexDirection="row"
      width="100%"
      bgcolor="background.paper"
      flex={flex}
      position="fixed"
      bottom="0"
    >
      {items.map((e) => (
        <AppMenuItem key={e.id} currentItem={currentItem} item={e} />
      ))}
    </Box>
  );
};
