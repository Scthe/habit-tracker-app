import React from "react";
import { Route, Switch } from "react-router-dom";

import DetailsPage from "./layouts/shared/details";

import { ROUTES } from "./constants";

// eslint-disable-next-line import/no-unused-modules
export default (): JSX.Element => {
  return (
    <Switch>
      <Route path="*" component={DetailsPage} />
    </Switch>
  );
};

export { ROUTES as UserRoutes };
