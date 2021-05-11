import React, { lazy, useCallback } from "react";
import { useHistory } from "react-router-dom";

import { AppPage } from "pages/_shared";
import { routeDetails } from "../../constants";
import { Habit } from "../../_types";

const Agenda = lazy(() => import("../../fragments/agenda"));

export default (): JSX.Element => {
  const history = useHistory();

  const handleItemClick = useCallback(
    (habit: Habit) => history.push(routeDetails(habit.id)),
    []
  );

  return (
    <AppPage appMenuActiveItem="agenda">
      <Agenda onItemClick={handleItemClick} />
    </AppPage>
  );
};
