import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ROUTES } from "../../constants";

import Agenda from "./agenda";
import Details from "./details";
import Manage from "./manage";

const createComp = (name: string) => {
  return () => (<div>phone-{name}</div>)
};

export default (): JSX.Element => {
  return (
    <Switch>
      <Route path={ROUTES.agenda} component={Agenda} />
      <Route exact path={ROUTES.calendar} component={createComp("Calendar")} />
      <Route exact path={ROUTES.manage} component={Manage} />
      <Route exact path={ROUTES.create} component={createComp("HabitForm")} />
      <Route exact path={ROUTES.edit} component={createComp("HabitForm")} />
      <Route exact path={ROUTES.details} component={Details} />

      {/* fallback */}
      <Redirect path="*" to={ROUTES.agenda} />
    </Switch>
  );
};