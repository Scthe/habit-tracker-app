export * from "./useSuspendedPreload";

import { FieldMetaProps } from "formik";
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
