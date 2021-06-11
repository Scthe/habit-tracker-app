import React from "react";
import { ErrorBoundary } from "react-error-boundary";

import { ErrorPageWithDrawer } from "./internal/ErrorPageWithDrawer";
import { errorBoundaryHandler } from "utils/errorHandler/errorBoundaryHandler";

export const GlobalErrorBoundary: React.FC<unknown> = ({ children }) => {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorPageWithDrawer}
      onError={errorBoundaryHandler}
    >
      {children}
    </ErrorBoundary>
  );
};
