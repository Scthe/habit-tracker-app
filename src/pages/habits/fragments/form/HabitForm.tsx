import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { Form, FormikErrors, FormikProps, withFormik } from "formik";
import { assert, StructError } from "superstruct";
import set from "lodash/set";

import { routeDetails } from "../../constants";
import { SaveHabitFn } from "../../api";
import { FormValues } from "./useFormInitValues";
import { HabitFormValidationSchema } from "./validation.schema";

import type { ShowAlertFn } from "hooks/useShowAlert";
import { onFormSubmitErrorFn, useFormSubmitError } from "utils/form";

interface Props {
  initialValues: FormValues;
  onSubmit: SaveHabitFn;
  history: ReturnType<typeof useHistory>;
  showAlert: ShowAlertFn;
  className?: string;
}

const HabitForm: React.FC<Props & FormikProps<FormValues>> = ({
  isSubmitting,
  isValid,
  showAlert,
  children,
  className,
}) => {
  const showErrorAlertCb: onFormSubmitErrorFn = useCallback(
    (cause) => {
      if (cause === "validation") {
        showAlert({
          severity: "error",
          message: "Form contains errors",
        });
      }
    },
    [showAlert]
  );
  useFormSubmitError(showErrorAlertCb, isSubmitting, isValid);

  return <Form className={className}>{children}</Form>;
};

const applyError = (errors: FormikErrors<FormValues>, failure: StructError) => {
  switch (failure.key) {
    case "name": {
      errors.name = "Name should have between 3 and 20 letters";
      return;
    }
    case "description": {
      errors.description = "Description should be shorter than 50 letters";
      return;
    }
    default:
      set(errors, failure.path[0], failure.message);
  }
};

export default withFormik<Props, FormValues>({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    return props.initialValues;
  },
  validate: (values: FormValues) => {
    const errors: FormikErrors<FormValues> = {};

    try {
      assert(values, HabitFormValidationSchema);
    } catch (error) {
      for (const failure of error.failures()) {
        applyError(errors, failure);
      }
    }

    return errors;
  },
  handleSubmit: async (values, formikBag) => {
    const { onSubmit, history, showAlert } = formikBag.props;
    try {
      const id = await onSubmit(values);
      history.push({
        pathname: routeDetails(id),
        state: { id },
      });
    } catch (e) {
      showAlert({
        severity: "error",
        message: "Error, could not submit the form",
      });
    }
  },
})(HabitForm);
