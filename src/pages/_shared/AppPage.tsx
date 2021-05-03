import React from "react";
import clsx from "clsx";

import { CurrentActiveElement } from "../../components/AppMenu/constants";
import { useAppLayoutStyle } from "./AppLayout";
import { useSetAppMenuActiveLink } from "~contexts";

interface Props {
  appMenuActiveItem?: CurrentActiveElement;
  className?: string;
}

export const AppPage: React.FC<Props> = ({
  appMenuActiveItem,
  className,
  children,
}) => {
  useSetAppMenuActiveLink(appMenuActiveItem);
  const appLayoutClassName = useAppLayoutStyle();

  return (
    <main className={clsx(appLayoutClassName, className)}>{children}</main>
  );
};
