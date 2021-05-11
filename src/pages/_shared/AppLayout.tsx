import React from "react";

import { useDesktopLayout } from "~hooks";
import { AppMenuVertical, AppMenuHorizontal } from "~components";
import { useAppMenuActiveLink } from "~storage";

const CSS = require("./AppLayout.css").default;

// TODO fix pages height etc.
// height: "100%", // or webkit-fill-available on phone?

export const useAppLayoutStyle = (): string => {
  const isDesktopLayout = useDesktopLayout();
  return isDesktopLayout
    ? CSS.pageHorizontalContentInner
    : CSS.pageVerticalContentInner;
};

const CLASSES = {
  desktop: {
    root: CSS.pageHorizontal,
    content: CSS.pageHorizontalContent,
  },
  mobile: {
    root: CSS.pageVertical,
    content: CSS.pageVerticalContent,
  },
};

export const AppLayout: React.FC<unknown> = ({ children }) => {
  const isDesktopLayout = useDesktopLayout();
  const currentItem = useAppMenuActiveLink();
  const classes = isDesktopLayout ? CLASSES.desktop : CLASSES.mobile;

  // ugly, but does not trigger unmount/mount of children of `isDesktopLayout` change
  return (
    <div className={classes.root}>
      {isDesktopLayout ? (
        <AppMenuVertical
          currentItem={currentItem}
          className={CSS.pageHorizontalMenu}
        />
      ) : null}

      <div className={classes.content}>{children}</div>

      {!isDesktopLayout ? (
        <AppMenuHorizontal currentItem={currentItem} flex="0" />
      ) : null}
    </div>
  );
};
