import React, { useCallback } from "react";
import clsx from "clsx";
import Box from "@material-ui/core/Box";
import List from "@material-ui/core/List";
import Drawer from "@material-ui/core/Drawer";
import { makeStyles } from "@material-ui/core/styles";

import {
  ITEM_AGENDA,
  ITEM_CALENDAR,
  ITEM_MANAGE_HABITS,
  ITEM_ME,
  ITEM_CREATE_HABIT,
  CurrentActiveElement,
} from "./constants";
import { AppMenuHideButton, useIsAppMenuOpen } from "./AppMenuToggleButton";
import { AppMenuItem } from "./AppMenuItem";
import { AppMenuVariant, useAppMenuVariant } from "./useAppMenuVariant";
import { useAuth } from "~firebaseUtils";

// TODO add logout here too
// TODO add dark/light here too

const items = [
  ITEM_AGENDA,
  ITEM_CALENDAR,
  ITEM_MANAGE_HABITS,
  ITEM_ME,
  ITEM_CREATE_HABIT,
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
  const variant = useAppMenuVariant();
  const logout = useCallback(() => auth.signOut(), [auth]);
  const temporaryIsOpen = useIsAppMenuOpen();

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
      {variant === "temporary" ? <AppMenuHideButton /> : null}

      <Box
        display="flex"
        justifyContent="center"
        flexDirection="column"
        height="100%"
      >
        <List>
          {items.map((e) => (
            <AppMenuItem
              key={e.id}
              currentItem={currentItem}
              item={e}
              onlyIcon={opts.onlyIcon}
            />
          ))}
          <AppMenuItem
            item={{
              id: "logout",
              onClick: logout,
              icon: "exit_to_app",
              name: "Logout",
            }}
            onlyIcon={opts.onlyIcon}
          />
        </List>
      </Box>
    </Drawer>
  );
};
