import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ErrorBoundary } from "react-error-boundary";
import clsx from "clsx";

import {
  FullPageErrorMessage,
  FullPageErrorMessageFallback,
  FullPageMessageProps,
  PageLoader,
} from "~components";
import { AsyncData } from "~types";

export const adaptAsyncDataForContent = (
  { status }: AsyncData<unknown>,
  errorMessage?: string
): Partial<Props> => {
  if (status === "loading" || status === "init") {
    return { loading: true };
  }
  if (status === "error") {
    return {
      error: {
        message:
          errorMessage != null && errorMessage.length > 0
            ? errorMessage
            : "Something went wrong",
      },
    };
  }
  return {};
};

const myErrorHandler = (error: Error, info: { componentStack: string }) => {
  // TODO Do something with the error
  // E.g. log to an error logging client here
  console.groupCollapsed(["[ERROR] GlobalErrorBoundary: " + error.message]);
  console.log(error);
  console.log(info.componentStack);
  console.groupEnd();
};

const useStyles = makeStyles((theme) => ({
  toolbarOffset: theme.mixins.toolbar,
  root: {},
  rootPadding: {
    padding: theme.spacing(3, 3, 0), // TODO decrease on mobile
    marginBottom: theme.spacing(2),
  },
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
  const styles = useStyles();
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
        FallbackComponent={FullPageErrorMessageFallback}
        onError={myErrorHandler}
      >
        {loading ? (
          <PageLoader />
        ) : error ? (
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
