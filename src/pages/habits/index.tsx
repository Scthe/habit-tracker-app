import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import DesktopViews from "./layouts/desktop";
import MobileViews from "./layouts/mobile";
import { ROUTES } from "./constants";
import Calendar from "./layouts/shared/calendar";
import Form from "./layouts/shared/form";
import { useDesktopLayout } from "~hooks";

// TODO subscribe to habits here? And do not fetch in subviews?

// NOTE: this code may seem weird, but our goal is to never trigger
// umnmount/mount on `isDesktop` change. This needs to be precise..

const MOBILE_ROUTES = [
  <Route path={ROUTES.agenda} component={MobileViews.Agenda} />,
  <Route exact path={ROUTES.manage} component={MobileViews.Manage} />,
  <Route exact path={ROUTES.details} component={MobileViews.Details} />,
] as JSX.Element[];

const DESKTOP_ROUTES = [
  <Route path={ROUTES.agenda} component={DesktopViews.Agenda} />,
  <Route exact path={ROUTES.manage} component={DesktopViews.Manage} />,
  <Redirect exact from={ROUTES.details} to={ROUTES.manage} />,
] as JSX.Element[];

// eslint-disable-next-line import/no-unused-modules
export default (): JSX.Element => {
  const isDesktop = useDesktopLayout();

  const routes: JSX.Element[] = isDesktop ? DESKTOP_ROUTES : MOBILE_ROUTES;
  return (
    <Switch>
      <Route exact path={ROUTES.calendar} component={Calendar} />
      <Route exact path={ROUTES.create} component={Form} />
      <Route exact path={ROUTES.edit} component={Form} />

      {routes.map((e, i) => ({ ...e, key: i }))}

      {/* fallback */}
      <Redirect path="*" to={ROUTES.agenda} />
    </Switch>
  );
};
