// const handleClick = () => {
// history.push(`/habits/${habit.id}/details`);
// };

import React, { lazy, useCallback } from "react";
import { useHistory } from "react-router-dom";

import { AppPage } from "pages/_shared";
import { routeDetails } from "../../constants";
import { Habit } from "../../_types";

const Manage = lazy(() => import("../../fragments/manage"));

export default (): JSX.Element => {
  const history = useHistory();

  const handleItemClick = useCallback(
    (habit: Habit) => history.push(routeDetails(habit.id)),
    []
  );

  return (
    <AppPage appMenuActiveItem="manage">
      <Manage onItemClick={handleItemClick} />
    </AppPage>
  );
};
