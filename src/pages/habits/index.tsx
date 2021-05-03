import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Agenda from "./agenda";
import Calendar from "./calendar";
import ManageHabits from "./manage";
import Details from "./detail";
import HabitForm from "./form";

const path = "/habits";

// TODO router is different between mobile/desktop. e.g. details view is same as agenda on desktop
//      or maybe remove details view from desktop altogether?
//      useDesktopLayout();
//      You can always use HOC that will make responsive data availabie in makeStyles

// eslint-disable-next-line import/no-unused-modules
export default (): JSX.Element => {
  return (
    <Switch>
      <Route path={`${path}/agenda`} component={Agenda} />
      <Route exact path={`${path}/calendar`} component={Calendar} />
      <Route exact path={`${path}/manage`} component={ManageHabits} />
      <Route exact path={`${path}/create`} component={HabitForm} />
      <Route exact path={`${path}/:id/edit`} component={HabitForm} />
      <Route exact path={`${path}/:id/details`} component={Details} />

      {/* fallback */}
      <Redirect path="*" to={`${path}/agenda`} />
    </Switch>
  );
};
