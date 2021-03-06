import React, { lazy, useCallback } from "react";
import { useHistory } from "react-router-dom";

import { routeDetails } from "../../constants";
import { Habit } from "../../_types";
import { AppPage } from "pages/_shared";

const Agenda = lazy(
  () => import(/* webpackChunkName: "habitsAgenda" */ "../../fragments/agenda")
);

export default (): JSX.Element => {
  const history = useHistory();

  const handleItemClick = useCallback(
    (habit: Habit) => history.push(routeDetails(habit.id)),
    [history]
  );

  return (
    <AppPage appMenuActiveItem="agenda" documentTitle="Agenda">
      <Agenda onItemClick={handleItemClick} selectedItem={undefined} />
    </AppPage>
  );
};
