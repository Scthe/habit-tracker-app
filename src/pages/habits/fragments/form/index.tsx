import React from "react";
import { useHistory } from "react-router-dom";

import { useSaveHabit } from "../../api";
import { useFormInitValues } from "./useFormInitValues";
import HabitFormImpl from "./HabitForm";
import { useShowAlert } from "~hooks";

interface Props {
  id?: string;
}

const HabitForm: React.FC<Props> = ({ id }) => {
  const history = useHistory();
  const showAlert = useShowAlert();
  const [isEdit, initValuesAsync] = useFormInitValues(id);
  const saveHabit = useSaveHabit(id);

  return (
    <>
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
    </>
  );
};

// used with React.Lazy, but eslint has problems
// eslint-disable-next-line import/no-unused-modules
export default HabitForm;
