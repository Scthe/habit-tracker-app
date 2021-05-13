import React, { useCallback } from "react";
import clsx from "clsx";
import Box from "@material-ui/core/Box";
import List from "@material-ui/core/List";
import Drawer from "@material-ui/core/Drawer";
import { makeStyles } from "@material-ui/core/styles";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

import {
  ITEM_AGENDA,
  ITEM_CALENDAR,
  ITEM_MANAGE_HABITS,
  ITEM_ME,
  ITEM_CREATE_HABIT,
  CurrentActiveElement,
} from "./constants";
import {
  AppMenuHideButton,
  useHideDrawer,
  useIsAppMenuOpen,
} from "./AppMenuToggleButton";
import { AppMenuItem } from "./AppMenuItem";
import { AppMenuVariant, useAppMenuVariant } from "./useAppMenuVariant";
import { useAuth } from "~firebaseUtils";
import { useTheme } from "theme";

// TODO add dark/light theme switcher here too

const items = [
  ITEM_CREATE_HABIT,
  ITEM_AGENDA,
  ITEM_CALENDAR,
  ITEM_MANAGE_HABITS,
  ITEM_ME,
];

const useStyles = makeStyles(() => ({
  root: {},
  variantTemporary: {
    width: "240px",
  },
  variantPermanentSmall: {
    width: "57px",
  },
  variantPermanentLarge: {
    width: "200px",
  },
}));

interface Props {
  className?: string;
  currentItem?: CurrentActiveElement;
}

const getOptsByVariant = (
  variant: AppMenuVariant,
  styles: ReturnType<typeof useStyles>,
  temporaryIsOpen: boolean
) => {
  switch (variant) {
    case "temporary":
      return {
        onlyIcon: false,
        rootClassName: styles.variantTemporary,
        props: {
          variant: "temporary" as const,
          open: temporaryIsOpen,
        },
      };
    case "permanent-small":
      return {
        onlyIcon: true,
        rootClassName: styles.variantPermanentSmall,
        props: {
          variant: "permanent" as const,
          open: true,
        },
      };
    case "permanent-large":
      return {
        onlyIcon: false,
        rootClassName: styles.variantPermanentLarge,
        props: {
          variant: "permanent" as const,
          open: true,
        },
      };
  }
};

export const AppMenuDrawer: React.FC<Props> = ({ className, currentItem }) => {
  const styles = useStyles();
  const auth = useAuth();
  const [themeColor, toggleThemeColor] = useTheme();
  const variant = useAppMenuVariant();
  const temporaryIsOpen = useIsAppMenuOpen();
  const hideDrawer = useHideDrawer();

  const logout = useCallback(() => auth.signOut(), [auth]);
  const handleClickAway = useCallback(() => {
    if (variant === "temporary" && temporaryIsOpen) {
      hideDrawer();
    }
  }, [variant, temporaryIsOpen, hideDrawer]);

  const opts = getOptsByVariant(variant, styles, temporaryIsOpen);

  return (
    <Drawer
      {...opts.props}
      anchor="left"
      className={clsx(styles.root, opts.rootClassName, className)}
      classes={{
        paper: opts.rootClassName,
      }}
    >
      <ClickAwayListener onClickAway={handleClickAway}>
        {/* This wrapper is required for ClickAwayListener to work (needs to hold a ref) */}
        <Box display="flex" flexDirection="column" height="100%">
          {variant === "temporary" ? <AppMenuHideButton /> : null}

          <Box
            display="flex"
            justifyContent="center"
            flexDirection="column"
            flexGrow="1"
          >
            <List>
              {items.map((e) => (
                <AppMenuItem
                  key={e.id}
                  currentItem={currentItem}
                  item={e}
                  onlyIcon={opts.onlyIcon}
                  variant={variant}
                />
              ))}
              <AppMenuItem
                item={{
                  id: "toggle-color-theme",
                  onClick: toggleThemeColor,
                  icon: themeColor === "dark" ? "brightness_7" : "brightness_4",
                  name: themeColor === "dark" ? "Lights on" : "Lights off",
                }}
                onlyIcon={opts.onlyIcon}
                variant={variant}
              />
            </List>
          </Box>

          <AppMenuItem
            item={{
              id: "logout",
              onClick: logout,
              icon: "exit_to_app",
              name: "Logout",
            }}
            onlyIcon={opts.onlyIcon}
            variant={variant}
          />
        </Box>
      </ClickAwayListener>
    </Drawer>
  );
};
