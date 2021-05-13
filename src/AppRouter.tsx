import React, { lazy } from "react";
import { Switch, Route, HashRouter as Router } from "react-router-dom";
import { PageViewAnalytics } from "./components";

import { AppLayout } from "./pages/_shared";
import Habits from "./pages/habits";
import { useUserWithSuspense } from "~storage";

const User = lazy(() => import("./pages/user"));

export const AppRouter: React.FC<unknown> = () => {
  const user = useUserWithSuspense();
  if (user.status === "notlogged") {
    window.location.replace("/login");
    return null;
  }

  return (
    <Router>
      <AppLayout>
        <Switch>
          <Route path="/me" component={User} />
          <Route path="*" component={Habits} />
        </Switch>
        <PageViewAnalytics />
      </AppLayout>
    </Router>
  );
};
