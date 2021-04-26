import React from "react";

import { useDesktopLayout } from "~hooks";
import { AppMenuVertical, AppMenuHorizontal } from "~components";
import { useAppMenuActiveLink } from "~contexts";
// import {setHocName} from "~utils";

const CSS = require("./AppLayout.css").default;

export const useAppLayoutStyle = (): string => {
  const isDesktopLayout = useDesktopLayout();
  return isDesktopLayout
    ? CSS.pageHorizontalContentInner
    : CSS.pageVerticalContentInner;
};

export const AppLayout: React.FC<unknown> = ({ children }) => {
  const isDesktopLayout = useDesktopLayout();
  const currentItem = useAppMenuActiveLink();

  if (isDesktopLayout) {
    return (
      <div className={CSS.pageHorizontal}>
        <AppMenuVertical
          currentItem={currentItem}
          className={CSS.pageHorizontalMenu}
        />
        <div className={CSS.pageHorizontalContent}>{children}</div>
      </div>
    );
  } else {
    return (
      <div className={CSS.pageVertical}>
        <div className={CSS.pageVerticalContent}>{children}</div>
        <AppMenuHorizontal currentItem={currentItem} flex="0" />
      </div>
    );
  }
};

/*
const withAppLayout = (Comp: React.ComponentType) => {
  const WithAppLayout: React.FC<unknown> = props => {
    return (
      <AppLayout>
        <Comp {...props} />
      </AppLayout>
    );
  };
  setHocName(WithAppLayout, Comp);
  return WithAppLayout;
};
*/
