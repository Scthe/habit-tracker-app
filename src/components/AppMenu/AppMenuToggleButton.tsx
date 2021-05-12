import React from "react";
import create from "zustand";
import IconButton from "@material-ui/core/IconButton";
import Icon from "@material-ui/core/Icon";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { makeStyles } from "@material-ui/core/styles";
import { useAppMenuVariant } from "./useAppMenuVariant";

type AppMenuStorage = {
  isOpen: boolean;
  show: () => void;
  hide: () => void;
};

const useAppMenuStorage = create<AppMenuStorage>((set) => ({
  isOpen: false,
  show: () => set({ isOpen: true }),
  hide: () => set({ isOpen: false }),
}));

export function useIsAppMenuOpen(): boolean {
  return useAppMenuStorage((s) => s.isOpen);
}

export const AppMenuToggleButton: React.FC = () => {
  const variant = useAppMenuVariant();
  const openDrawer = useAppMenuStorage((s) => s.show);

  if (variant !== "temporary") {
    return null;
  }

  return (
    <IconButton
      color="inherit"
      aria-label="open drawer"
      onClick={openDrawer}
      edge="start"
    >
      <Icon color="inherit">menu</Icon>
    </IconButton>
  );
};

const useAppMenuHideStyles = makeStyles(() => ({
  listItemIcon: {
    flex: 1,
    textAlign: "right",
  },
  icon: {
    flex: 1,
    fontSize: "35px",
  },
}));

export const AppMenuHideButton: React.FC = () => {
  const styles = useAppMenuHideStyles();
  const hideDrawer = useAppMenuStorage((s) => s.hide);

  return (
    <ListItem button aria-label="hide-drawer" onClick={hideDrawer}>
      <ListItemIcon color="inherit" className={styles.listItemIcon}>
        <Icon color="inherit" className={styles.icon}>
          chevron_left
        </Icon>
      </ListItemIcon>
    </ListItem>
  );
};
