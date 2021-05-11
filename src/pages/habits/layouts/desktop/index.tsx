import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ROUTES } from "../../constants";

import Agenda from "./agenda";
import Manage from "./manage";

const createComp = (name: string) => {
  return () => (<div>desktop-{name}</div>)
};

export default (): JSX.Element => {
  console.log("Render desktop");

  return (
    <Switch>
      <Route path={ROUTES.agenda} component={Agenda} />
      <Route exact path={ROUTES.calendar} component={createComp("Calendar")} />
      <Route exact path={ROUTES.manage} component={Manage} />
      <Route exact path={ROUTES.create} component={createComp("HabitForm")} />
      <Route exact path={ROUTES.edit} component={createComp("HabitForm")} />
      {/* Will set location.state.referrer */}
      <Redirect exact from={ROUTES.details} to={ROUTES.manage} />

      {/* fallback */}
      <Redirect path="*" to={ROUTES.agenda} />
    </Switch>
  );
};