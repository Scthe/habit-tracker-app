export * from "./useSuspendedPreload";

import React from "react";
import { FieldMetaProps } from "formik";
import { Redirect, RedirectProps, Route } from "react-router-dom";

export const getComponentName = (Comp: React.ComponentType): string => {
  return (
    Comp.name ||
    Comp?.constructor?.name ||
    Comp.displayName ||
    "UnknownComponent"
  );
};

export const setHocName = (
  HocComp: React.ComponentType,
  Comp: React.ComponentType
): void => {
  const hocName = getComponentName(HocComp);
  const compName = getComponentName(Comp);
  HocComp.displayName = `${hocName}_${compName}`;
};

type MaterialUIFieldErrorProps = {
  error: boolean;
  helperText?: string;
};
export const getFieldError = (
  meta: FieldMetaProps<unknown>
): MaterialUIFieldErrorProps => {
  const showError = meta.touched && meta.error != null && meta.error.length > 0;
  return {
    error: showError,
    helperText: showError ? meta.error : undefined,
  };
};

type RedirectPreserveStateProps = Omit<RedirectProps, "from" | "to"> & {
  from: string;
  to: string;
};

export const RedirectPreserveState: React.FC<RedirectPreserveStateProps> = ({
  from,
  to,
  ...redirectProps
}) => (
  <Route
    exact
    path={from}
    render={(props) => (
      <Redirect
        {...redirectProps}
        to={{ pathname: to, state: { from: props.location } }}
      />
    )}
  />
);
