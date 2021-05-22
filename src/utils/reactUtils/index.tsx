export * from "./useSuspendedPreload";

import React from "react";
import { Redirect, RedirectProps, Route } from "react-router-dom";

// eslint-disable-next-line import/no-unused-modules
export const getComponentName = (Comp: React.ComponentType): string => {
  return (
    Comp.name ||
    Comp?.constructor?.name ||
    Comp.displayName ||
    "UnknownComponent"
  );
};

// eslint-disable-next-line import/no-unused-modules
export const setHocName = (
  HocComp: React.ComponentType,
  Comp: React.ComponentType
): void => {
  const hocName = getComponentName(HocComp);
  const compName = getComponentName(Comp);
  HocComp.displayName = `${hocName}_${compName}`;
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
