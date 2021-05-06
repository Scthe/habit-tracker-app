import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import { AppPage } from "../../_shared";
import { useSaveHabit } from "../api/useSaveHabit";
import { useFormInitValues } from "./useFormInitValues";
import HabitFormImpl from "./HabitForm";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
}));

const HabitForm: React.FC<unknown> = () => {
  const styles = useStyles();
  const [isEdit, initValuesAsync] = useFormInitValues();
  const saveHabit = useSaveHabit();

  // TODO add loading/error handling
  // if (!hasAsyncData(habitAsync)) { return <AsyncDataStatusNotDone/> }

  return (
    <AppPage
      className={styles.root}
      appMenuActiveItem={isEdit ? undefined : "create"}
    >
      <HabitFormImpl
        isEdit={isEdit}
        initialValues={(initValuesAsync as any).data}
        onSubmit={saveHabit}
      />
    </AppPage>
  );
};

export default HabitForm;
