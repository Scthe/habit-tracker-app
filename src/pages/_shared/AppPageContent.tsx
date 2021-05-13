import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ErrorBoundary } from "react-error-boundary";
import clsx from "clsx";

import {
  FullPageErrorMessage,
  TrullyFatalErrorMessageFallback,
  FullPageMessageProps,
  PageLoader,
} from "~components";
import { AsyncData } from "~types";
import { useDesktopLayout } from "~hooks";
import { globalErrorHandler } from "~utils";

export const adaptAsyncDataForContent = (
  { status }: AsyncData<unknown>,
  errorMessage?: string
): Partial<Props> => {
  if (status === "loading" || status === "init") {
    return { loading: true };
  }

  if (status === "error") {
    const message =
      errorMessage != null && errorMessage.length > 0
        ? errorMessage
        : "Something went wrong";
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
  error?: Partial<FullPageMessageProps>;
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
      <ErrorBoundary
        FallbackComponent={TrullyFatalErrorMessageFallback}
        onError={globalErrorHandler}
      >
        {loading ? (
          <PageLoader />
        ) : error != null ? (
          <FullPageErrorMessage {...error} />
        ) : (
          children
        )}
      </ErrorBoundary>
    </div>
  );
};

AppPageContent.defaultProps = {
  canOverflow: true,
  loading: false,
  hasPadding: true,
};
