/* eslint-disable no-console */

import {
  captureEvent,
  captureException,
  Event,
  eventFromException,
  withScope,
} from "@sentry/react";
import { logSimpleEvent } from "firebaseUtils/analytics";

export const errorBoundaryHandler = (
  error: Error,
  info: { componentStack: string }
): void => {
  sentryCaptureReactErrorBoundaryError(error, info.componentStack);

  logSimpleEvent("error_boundary_crash", {
    message: error.message,
    componentStack: info.componentStack,
  });

  if (process.env.NODE_ENV === "development") {
    console.groupCollapsed(["[ERROR] GlobalErrorBoundary: " + error.message]);
    console.log(error);
    console.log(info.componentStack);
    console.groupEnd();
  }
};

function sentryCaptureReactErrorBoundaryError(
  error: Error,
  componentStack: string
): void {
  const errorBoundaryError = new Error(error.message);
  errorBoundaryError.name = `React ErrorBoundary ${errorBoundaryError.name}`;
  errorBoundaryError.stack = componentStack;

  let errorBoundaryEvent: Event = {};
  void eventFromException({}, errorBoundaryError).then((e) => {
    errorBoundaryEvent = e;
  });

  withScope((scope) => {
    scope.setTag("is_error_boundary_error", true);

    if (
      errorBoundaryEvent.exception &&
      Array.isArray(errorBoundaryEvent.exception.values)
    ) {
      let originalEvent: Event = {};
      void eventFromException({}, error).then((e) => {
        originalEvent = e;
      });
      if (
        originalEvent.exception &&
        Array.isArray(originalEvent.exception.values)
      ) {
        originalEvent.exception.values = [
          ...errorBoundaryEvent.exception.values,
          ...originalEvent.exception.values,
        ];
      }

      return captureEvent(originalEvent);
    }

    return captureException(error, { contexts: { react: { componentStack } } });
  });
}
