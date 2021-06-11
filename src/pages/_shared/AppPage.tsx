import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";

import { CurrentActiveElement } from "../../components/AppMenu/constants";
import { useSetAppMenuActiveLink } from "~storage";
import { AppTheme } from "theme";
import { useDocumentTitle } from "hooks/useDocumentTitle";

const useStyles = makeStyles((theme: AppTheme) => ({
  root: theme.mixins.viewFragment,
}));

interface Props {
  appMenuActiveItem?: CurrentActiveElement;
  className?: string;
  documentTitle: string;
}

export const AppPage: React.FC<Props> = ({
  appMenuActiveItem,
  documentTitle,
  className,
  children,
}) => {
  const styles = useStyles();
  useSetAppMenuActiveLink(appMenuActiveItem);

  useDocumentTitle(
    documentTitle != null && documentTitle.length > 0
      ? `${documentTitle} - Habit Tracker`
      : "Habit Tracker"
  );

  return <main className={clsx(styles.root, className)}>{children}</main>;
};
