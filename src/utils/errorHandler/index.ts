/* eslint-disable no-console */

export const globalErrorHandler = (
  error: Error,
  info: { componentStack: string }
): void => {
  // TODO [error] Do something with the error
  // E.g. log to an error logging client here
  console.groupCollapsed(["[ERROR] GlobalErrorBoundary: " + error.message]);
  console.log(error);
  console.log(info.componentStack);
  console.groupEnd();
};
