import React, { useCallback } from "react";
import clsx from "clsx";
import Box from "@material-ui/core/Box";
import List from "@material-ui/core/List";
import Drawer from "@material-ui/core/Drawer";
import SvgIcon from "@material-ui/core/SvgIcon";
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
import { useAuth } from "firebaseUtils/useAuth";
import { logLogout } from "firebaseUtils/analytics";
import { AppTheme, useTheme } from "theme";
import { useUserStatus } from "~storage";

const items = [
  ITEM_CREATE_HABIT,
  ITEM_AGENDA,
  ITEM_CALENDAR,
  ITEM_MANAGE_HABITS,
  ITEM_ME,
];

const useStyles = makeStyles((theme: AppTheme) => ({
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
  header: {
    padding: theme.spacing(0, 1),
    textAlign: "center",
  },
  appTitle: {
    textTransform: "uppercase",
    marginBottom: theme.spacing(1),
    color: theme.palette.primary.main,
    fontSize: "20px", // watch for scrollbar!
  },
  userData: {
    marginTop: 0,
    marginBottom: theme.spacing(2),
    color: theme.palette.text.secondary,
    fontWeight: "normal",
    fontSize: "15px",
    ...theme.mixins.overflow,
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

type UserStatus = ReturnType<typeof useUserStatus>;

const getUserText = (userStatus: UserStatus): string | null => {
  if (userStatus.status !== "logged") {
    return null;
  }

  const has = (k?: string | null): k is string => k != null && k.length > 0;

  if (has(userStatus.user.email)) {
    return userStatus.user.email;
  }
  if (has(userStatus.user.displayName)) {
    return userStatus.user.displayName;
  }
  return userStatus.user.isAnonymous ? "Anonymous" : null;
};

export const AppMenuDrawer: React.FC<Props> = ({ className, currentItem }) => {
  const styles = useStyles();
  const auth = useAuth();
  const [themeColor, toggleThemeColor] = useTheme();
  const variant = useAppMenuVariant();
  const temporaryIsOpen = useIsAppMenuOpen();
  const hideDrawer = useHideDrawer();
  const userStatus = useUserStatus();

  const logout = useCallback(() => {
    logLogout();
    auth.signOut();
  }, [auth]);
  const handleClickAway = useCallback(() => {
    if (variant === "temporary" && temporaryIsOpen) {
      hideDrawer();
    }
  }, [variant, temporaryIsOpen, hideDrawer]);

  const opts = getOptsByVariant(variant, styles, temporaryIsOpen);
  const userText = getUserText(userStatus);

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

          {variant !== "permanent-small" ? (
            <header className={styles.header}>
              <h2 className={styles.appTitle}>Habit Tracker</h2>
              {userText != null ? (
                <h4 className={styles.userData}>{userText}</h4>
              ) : null}
            </header>
          ) : null}

          <Box
            display="flex"
            justifyContent="center"
            flexDirection="column"
            flexGrow="1"
          >
            <List>
              {/* routes */}
              {items.map((e) => (
                <AppMenuItem
                  key={e.id}
                  currentItem={currentItem}
                  item={e}
                  onlyIcon={opts.onlyIcon}
                  variant={variant}
                />
              ))}

              {/* color theme */}
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

          {/* github */}
          <AppMenuItem
            item={{
              id: "github",
              to: "https://github.com/Scthe/habit-tracker-app",
              icon: "gitHub",
              name: "GitHub",
              svgIcon: (
                <SvgIcon
                  focusable="false"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2 0 1.9 1.2 1.9 1.2 1 1.8 2.8 1.3 3.5 1 0-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.2-.4-.6-1.6 0-3.2 0 0 1-.3 3.4 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8 0 3.2.9.8 1.3 1.9 1.3 3.2 0 4.6-2.8 5.6-5.5 5.9.5.4.9 1 .9 2.2v3.3c0 .3.1.7.8.6A12 12 0 0 0 12 .3"></path>
                </SvgIcon>
              ),
            }}
            onlyIcon={opts.onlyIcon}
            variant={variant}
          />

          {/* logout */}
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
