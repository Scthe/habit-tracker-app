import React from "react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";

// TODO make nicer global error boundary

const ErrorFallback: React.FC<FallbackProps> = ({ error }) => {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
    </div>
  );
};

const myErrorHandler = (error: Error, info: { componentStack: string }) => {
  // Do something with the error
  // E.g. log to an error logging client here
  console.groupCollapsed(["[ERROR] GlobalErrorBoundary: " + error.message]);
  console.log(error);
  console.log(info.componentStack);
  console.groupEnd();
};

export const GlobalErrorBoundary: React.FC<unknown> = ({ children }) => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={myErrorHandler}>
      {children}
    </ErrorBoundary>
  );
};
