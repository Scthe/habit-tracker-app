import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ROUTES } from "../../constants";

import Agenda from "./agenda";
import Manage from "./manage";
import Form from "../shared/form";
import Calendar from "../shared/calendar";

export default (): JSX.Element => {
  return (
    <Switch>
      <Route path={ROUTES.agenda} component={Agenda} />
      <Route exact path={ROUTES.calendar} component={Calendar} />
      <Route exact path={ROUTES.manage} component={Manage} />
      <Route exact path={ROUTES.create} component={Form} />
      <Route exact path={ROUTES.edit} component={Form} />
      {/* Will set location.state.referrer */}
      <Redirect exact from={ROUTES.details} to={ROUTES.manage} />

      {/* fallback */}
      <Redirect path="*" to={ROUTES.agenda} />
    </Switch>
  );
};
