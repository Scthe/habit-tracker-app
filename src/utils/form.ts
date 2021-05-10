import { useEffect, useRef } from "react";
import { FormikProps } from "formik";

export type onFormSubmitErrorFn = (cause: "network" | "validation") => void;

export const useFormSubmitError = (
  props: FormikProps<any>, // eslint-disable-line @typescript-eslint/no-explicit-any
  handler: onFormSubmitErrorFn
): void => {
  const { isSubmitting, isValid } = props;
  const prevIsSubmitting = useRef(isSubmitting);

  useEffect(() => {
    const stoppedSubmitting = prevIsSubmitting && !isSubmitting;
    prevIsSubmitting.current = isSubmitting;

    if (stoppedSubmitting && !isValid) {
      const cause = isValid ? "network" : "validation";
      handler(cause);
    }
    // it wants to add isValid, but this can change on a single keystroke, so...
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitting, handler]);
};
