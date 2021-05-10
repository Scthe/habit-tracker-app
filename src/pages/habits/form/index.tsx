import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import { AppPage } from "../../_shared";
import { useSaveHabit } from "../api";
import { useFormInitValues } from "./useFormInitValues";
import HabitFormImpl from "./HabitForm";
import { useShowAlert } from "~hooks";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
}));

const HabitForm: React.FC<unknown> = () => {
  const styles = useStyles();
  const { id } = useParams<{ id?: string }>();
  const history = useHistory();
  const showAlert = useShowAlert();
  const [isEdit, initValuesAsync] = useFormInitValues(id);
  const saveHabit = useSaveHabit(id);

  return (
    <AppPage
      className={styles.root}
      appMenuActiveItem={isEdit ? undefined : "create"}
    >
      {initValuesAsync.status === "success" && initValuesAsync.data != null ? (
        <HabitFormImpl
          isEdit={isEdit}
          initialValues={initValuesAsync.data}
          onSubmit={saveHabit}
          history={history}
          showAlert={showAlert}
        />
      ) : (
        <span>TODO handle erros and loading</span>
      )}
    </AppPage>
  );
};

export default HabitForm;
