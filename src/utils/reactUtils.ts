import React from "react";

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
