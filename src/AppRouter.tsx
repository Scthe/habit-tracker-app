import React from "react";
import { Switch, Route, Router } from "react-router-dom";
import type { History } from "history";

import { AppLayout } from "./pages/_shared";
import Habits from "./pages/habits";
import User, { UserRoutes } from "./pages/user";
import { useUserWithSuspense } from "~storage";
import { PageViewAnalytics } from "components/PageViewAnalytics";

export const AppRouter: React.FC<{ history: History }> = ({ history }) => {
  const user = useUserWithSuspense();
  if (user.status === "notlogged") {
    window.location.replace("/login");
    return null;
  }

  return (
    <Router history={history}>
      <AppLayout>
        <Switch>
          <Route path={UserRoutes.base} component={User} />
          <Route path="*" component={Habits} />
        </Switch>
        <PageViewAnalytics />
      </AppLayout>
    </Router>
  );
};
