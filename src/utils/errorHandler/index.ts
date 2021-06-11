/* eslint-disable no-console */

import { captureException } from "@sentry/react";
import { logSimpleEvent } from "firebaseUtils/analytics";

export const logApiError = (
  requestData: {
    name: string;
    rw: "read" | "subscription" | "write";
    firebasePath?: string;
    args?: string;
  },
  error: Error
): void => {
  if (process.env.NODE_ENV === "development") {
    console.group([
      `[API ERROR ${requestData.rw} ${requestData.name}] ${error.message}`,
    ]);
    console.log(requestData);
    console.log(error);
    console.groupEnd();
  }

  captureException(error, {
    tags: {
      is_api_error: true,
      api_op: requestData.name,
    },
    extra: requestData,
  });

  logSimpleEvent("api_error", {
    ...requestData,
    message: error.message,
  });
};
