import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { withAppMenuActive } from "~contexts";

import Agenda from "./agenda";
import Calendar from "./calendar";
import ManageHabits from "./manage";

const HabitDefault = (props: unknown) => {
  return (
    <div>
      <h1>HabitDefault</h1>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </div>
  );
};

const path = "/habits";

// TODO router is different between mobile/desktop. e.g. details view is same as agenda on desktop
//      or maybe remove details view from desktop altogether?
//      useDesktopLayout();
//      You can always use HOC that will make responsive data availabie in makeStyles
export default () => {
  return (
    <Switch>
      <Route path={`${path}/agenda`} component={Agenda} />
      <Route
        exact
        path={`${path}/calendar`}
        component={withAppMenuActive(Calendar, "calendar")}
      />
      <Route
        exact
        path={`${path}/manage`}
        component={withAppMenuActive(ManageHabits, "manage")}
      />
      <Route
        exact
        path={`${path}/create`}
        component={withAppMenuActive(HabitDefault, "create")}
      />
      <Route exact path={`${path}/:id/edit`} component={HabitDefault} />
      <Route exact path={`${path}/:id/details`} component={HabitDefault} />

      {/* fallback */}
      <Redirect path="*" to={`${path}/agenda`} />
    </Switch>
  );
};
