import React from "react";
import { Redirect, Switch } from "react-router-dom";

import DesktopViews from "./layouts/desktop";
import MobileViews from "./layouts/mobile";
import Calendar from "./layouts/shared/calendar";
import Form from "./layouts/shared/form";

import { ROUTES } from "./constants";
import { useDesktopLayout } from "hooks/useResponsive";
import { RedirectPreserveState } from "utils/reactUtils";
import { TracedRoute } from "utils/reactUtils/TracedRoute";

// TODO [firebase improvement] subscribe to habits here? And do not fetch in subviews?

// NOTE: this code may seem weird, but our goal is to never trigger
// umnmount/mount on `isDesktop` change. This needs to be precise..

const MOBILE_ROUTES = [
  <TracedRoute path={ROUTES.agenda} component={MobileViews.Agenda} />,
  <TracedRoute exact path={ROUTES.manage} component={MobileViews.Manage} />,
  <TracedRoute exact path={ROUTES.details} component={MobileViews.Details} />,
] as JSX.Element[];

const DESKTOP_ROUTES = [
  <TracedRoute path={ROUTES.agenda} component={DesktopViews.Agenda} />,
  <TracedRoute exact path={ROUTES.manage} component={DesktopViews.Manage} />,
  <RedirectPreserveState exact from={ROUTES.details} to={ROUTES.manage} />,
] as JSX.Element[];

// eslint-disable-next-line import/no-unused-modules
export default (): JSX.Element => {
  const isDesktop = useDesktopLayout();

  const routes: JSX.Element[] = isDesktop ? DESKTOP_ROUTES : MOBILE_ROUTES;
  return (
    <Switch>
      <TracedRoute exact path={ROUTES.calendar} component={Calendar} />
      <TracedRoute exact path={ROUTES.create} component={Form} />
      <TracedRoute exact path={ROUTES.edit} component={Form} />

      {routes.map((e, i) => ({ ...e, key: i }))}

      {/* fallback */}
      <Redirect path="*" to={ROUTES.agenda} />
    </Switch>
  );
};
