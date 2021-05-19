import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import DesktopViews from "./layouts/desktop";
import MobileViews from "./layouts/mobile";

import { ROUTES } from "./constants";
import { useDesktopLayout } from "~hooks";
import { RedirectPreserveState } from "~utils";

const MOBILE_ROUTES = [
  <Route exact path={ROUTES.edit} component={MobileViews.UserEdit} />,
  <Route path={ROUTES.base} component={MobileViews.UserDetails} />,
] as JSX.Element[];

const DESKTOP_ROUTES = [
  <Route path={ROUTES.base} component={DesktopViews.UserDetails} />,
  <RedirectPreserveState exact from={ROUTES.edit} to={ROUTES.base} />,
] as JSX.Element[];

// eslint-disable-next-line import/no-unused-modules
export default (): JSX.Element => {
  const isDesktop = useDesktopLayout();

  const routes: JSX.Element[] = isDesktop ? DESKTOP_ROUTES : MOBILE_ROUTES;
  return (
    <Switch>
      {routes.map((e, i) => ({ ...e, key: i }))}

      {/* fallback */}
      <Redirect path="*" to={ROUTES.base} />
    </Switch>
  );
};

export { ROUTES as UserRoutes };
