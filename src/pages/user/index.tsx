import React from "react";
import { Switch } from "react-router-dom";

import DetailsPage from "./layouts/shared/details";
import { ROUTES } from "./constants";
import { TracedRoute } from "utils/reactUtils/TracedRoute";

// eslint-disable-next-line import/no-unused-modules
export default (): JSX.Element => {
  return (
    <Switch>
      <TracedRoute path="*" component={DetailsPage} />
    </Switch>
  );
};

export { ROUTES as UserRoutes };
