import React from "react";
import { FieldMetaProps } from "formik";
import FormHelperText from "@material-ui/core/FormHelperText";
import { getFieldError } from "~utils";

interface Props {
  error?: boolean;
  meta?: FieldMetaProps<unknown>;
}

/**
 * On most material-ui components there are build in props for errors
 * that can be used with `getFieldError`. This helper is for fields that
 * are more custom.
 */
export const ExtraValidationText: React.FC<Props> = ({
  error,
  meta,
  children,
}) => {
  let showError = error;
  let errorMsg = children;

  if (meta != null) {
    const e = getFieldError(meta);
    showError = e.error;
    errorMsg = children != null ? children : e.helperText; // still use children as an override
  }

  return <FormHelperText error={showError}>{errorMsg}</FormHelperText>;
};
