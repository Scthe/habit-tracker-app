import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";

import { CurrentActiveElement } from "../../components/AppMenu/constants";
import { useSetAppMenuActiveLink } from "~storage";
import { AppTheme } from "theme";

const useStyles = makeStyles((theme: AppTheme) => ({
  root: {
    ...theme.mixins.viewFragment,
    height: "100vh",
  },
}));

interface Props {
  appMenuActiveItem?: CurrentActiveElement;
  className?: string;
}

export const AppPage: React.FC<Props> = ({
  appMenuActiveItem,
  className,
  children,
}) => {
  const styles = useStyles();
  useSetAppMenuActiveLink(appMenuActiveItem);

  return <main className={clsx(styles.root, className)}>{children}</main>;
};
