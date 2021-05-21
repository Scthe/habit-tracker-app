import React from "react";
import { ErrorBoundary } from "react-error-boundary";

import { ErrorPageWithDrawer } from "./internal/ErrorPageWithDrawer";
import { globalErrorHandler } from "utils/errorHandler";

export const GlobalErrorBoundary: React.FC<unknown> = ({ children }) => {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorPageWithDrawer}
      onError={globalErrorHandler}
    >
      {children}
    </ErrorBoundary>
  );
};
