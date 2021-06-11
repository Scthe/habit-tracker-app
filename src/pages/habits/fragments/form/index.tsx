import React from "react";
import clsx from "clsx";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import { useSaveHabit } from "../../api";
import HabitForm from "./HabitForm";
import { DEFAULT_VALUES, useFormInitValues } from "./useFormInitValues";
import { HabitFormHeader } from "./HabitFormHeader";
import {
  NameField,
  ColorField,
  DescriptionField,
  RepeatField,
  ReminderField,
} from "./fields";
import { useShowAlert } from "hooks/useShowAlert";
import { adaptAsyncDataForContent, AppPageContent } from "pages/_shared";
import { AppTheme } from "theme";

interface Props {
  id?: string;
  classes?: {
    root?: string;
    content?: string;
  };
}

const useStyles = makeStyles((theme: AppTheme) => ({
  fieldSpacing: {
    marginBottom: theme.spacing(3),
  },
  form: {
    ...theme.mixins.viewFragment,
    flex: 1,
  },
}));

const HabitFormPage: React.FC<Props> = ({ id, classes }) => {
  const styles = useStyles();
  const history = useHistory();
  const showAlert = useShowAlert();
  const [isEdit, initValuesAsync] = useFormInitValues(id);
  const saveHabit = useSaveHabit(id);

  return (
    <HabitForm
      onSubmit={saveHabit.execute}
      history={history}
      showAlert={showAlert}
      className={clsx(styles.form, classes?.root)}
      initialValues={
        initValuesAsync.status == "success"
          ? initValuesAsync.data
          : DEFAULT_VALUES
      }
    >
      <HabitFormHeader isEdit={isEdit} />

      <AppPageContent
        {...adaptAsyncDataForContent(initValuesAsync)}
        className={classes?.content}
      >
        {initValuesAsync.status === "success" ? (
          <>
            <NameField name="name" className={styles.fieldSpacing} />
            <ColorField name="color" className={styles.fieldSpacing} />
            <RepeatField name="repeat" className={styles.fieldSpacing} />
            <ReminderField
              name="reminderTime"
              className={styles.fieldSpacing}
            />
            <DescriptionField name="description" />
          </>
        ) : null}
      </AppPageContent>
    </HabitForm>
  );
};

// used with React.Lazy, but eslint has problems
// eslint-disable-next-line import/no-unused-modules
export default HabitFormPage;
