import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

import {
  ContentErrorMessage,
  ContentErrorMessageProps,
  ContentLoader,
} from "components/contentStatus";
import { AsyncData } from "~types";
import { useDesktopLayout } from "hooks/useResponsive";

export const adaptAsyncDataForContent = (
  { status }: AsyncData<unknown>,
  errorMessage?: string
): Partial<Props> => {
  if (status === "loading" || status === "init") {
    return { loading: true };
  }

  if (status === "error") {
    const hasMsg = errorMessage != null && errorMessage.length > 0;
    const message = hasMsg ? errorMessage : "Something went wrong";
    return {
      error: { message },
    };
  }

  return {};
};

const useStyles = makeStyles((theme) => ({
  toolbarOffset: theme.mixins.toolbar,
  root: {},
  rootPadding: ({ isDesktop }: { isDesktop: boolean }) => ({
    padding: isDesktop ? theme.spacing(3, 3, 0) : theme.spacing(1, 1, 0),
    marginBottom: isDesktop ? theme.spacing(2) : theme.spacing(1),
  }),
  rootOverflow: { overflow: "auto" },
}));

interface Props {
  className?: string;
  loading?: boolean;
  error?: ContentErrorMessageProps;
  canOverflow?: boolean;
  hasPadding?: boolean;
}

export const AppPageContent: React.FC<Props> = ({
  className,
  loading,
  error,
  canOverflow,
  hasPadding,
  children,
}) => {
  const isDesktop = useDesktopLayout();
  const styles = useStyles({ isDesktop });
  const classes = clsx(
    styles.toolbarOffset,
    styles.root,
    hasPadding && styles.rootPadding,
    canOverflow && styles.rootOverflow,
    className
  );

  return (
    <div className={classes}>
      {loading ? (
        <ContentLoader />
      ) : error != null ? (
        <ContentErrorMessage {...error} />
      ) : (
        children
      )}
    </div>
  );
};

AppPageContent.defaultProps = {
  canOverflow: true,
  loading: false,
  hasPadding: true,
};
