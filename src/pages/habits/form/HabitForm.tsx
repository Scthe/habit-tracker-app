import React, { useCallback } from "react";
import { Form, FormikErrors, FormikProps, withFormik } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import { assert, StructError } from "superstruct";
import set from "lodash/set";
import clsx from "clsx";
import { useHistory } from "react-router-dom";

import { SaveHabitFn } from "../api";
import { FormValues } from "./useFormInitValues";
import { HabitFormHeader } from "./HabitFormHeader";
import { HabitFormValidationSchema } from "./validation.schema";
import {
  NameField,
  ColorField,
  DescriptionField,
  RepeatField,
  ReminderField,
} from "./fields";
import { ShowAlertFn } from "~hooks";
import { onFormSubmitErrorFn, useFormSubmitError } from "~utils";

const useStyles = makeStyles((theme) => ({
  toolbarOffset: theme.mixins.toolbar,
  content: {
    padding: "25px 25px 0",
    // overflow: "auto",
    marginBottom: "20px",
  },
  fieldSpacing: {
    marginBottom: theme.spacing(3),
  },
}));

interface Props {
  isEdit: boolean;
  initialValues: FormValues;
  onSubmit: SaveHabitFn;
  history: ReturnType<typeof useHistory>;
  showAlert: ShowAlertFn;
}

const HabitForm: React.FC<Props & FormikProps<FormValues>> = (props) => {
  const { isEdit, showAlert } = props;

  const styles = useStyles();
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
  useFormSubmitError(props, showErrorAlertCb);

  return (
    <Form>
      <HabitFormHeader isEdit={isEdit} />

      <div className={clsx(styles.toolbarOffset, styles.content)}>
        <NameField name="name" className={styles.fieldSpacing} />
        <ColorField name="color" className={styles.fieldSpacing} />
        <RepeatField name="repeat" className={styles.fieldSpacing} />
        <ReminderField name="reminderTime" className={styles.fieldSpacing} />
        <DescriptionField name="description" />
      </div>
    </Form>
  );
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
      history.push(`/habits/${id}/details`);
    } catch (e) {
      showAlert({
        severity: "error",
        message: "Error, could not submit the form",
      });
      throw e; // throw for sentry
    }
  },
})(HabitForm);
