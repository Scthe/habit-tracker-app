import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { FullPageErrorMessageFallback } from "~components";

const myErrorHandler = (error: Error, info: { componentStack: string }) => {
  // TODO Do something with the error
  // E.g. log to an error logging client here
  console.groupCollapsed(["[ERROR] GlobalErrorBoundary: " + error.message]);
  console.log(error);
  console.log(info.componentStack);
  console.groupEnd();
};

export const GlobalErrorBoundary: React.FC<unknown> = ({ children }) => {
  return (
    <ErrorBoundary
      FallbackComponent={FullPageErrorMessageFallback}
      onError={myErrorHandler}
    >
      {children}
    </ErrorBoundary>
  );
};
