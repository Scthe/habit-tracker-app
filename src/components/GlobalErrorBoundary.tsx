import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { TrullyFatalErrorMessageFallback } from "~components";
import { globalErrorHandler } from "~utils";

export const GlobalErrorBoundary: React.FC<unknown> = ({ children }) => {
  return (
    <ErrorBoundary
      FallbackComponent={TrullyFatalErrorMessageFallback}
      onError={globalErrorHandler}
    >
      {children}
    </ErrorBoundary>
  );
};
