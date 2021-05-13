import React, { lazy, Suspense } from "react";
import { Switch, Route, HashRouter as Router } from "react-router-dom";
import { PageViewAnalytics, PageLoader } from "./components";

import { AppLayout } from "./pages/_shared";
import Habits from "./pages/habits";
import { useUserWithSuspense } from "~storage";

const User = lazy(() => import("./pages/user"));

const AppPages: React.FC<unknown> = ({ children }) => {
  // TODO verify Suspense strategy. May change with final layouts/split-views
  return (
    <AppLayout>
      <Suspense fallback={<PageLoader />}>{children}</Suspense>
    </AppLayout>
  );
};

export const AppRouter: React.FC<unknown> = () => {
  const user = useUserWithSuspense();
  console.log("[AppRouter] user:", user);
  if (user.status === "notlogged") {
    window.location.replace("/login");
    return null;
  }

  return (
    <Router>
      <AppPages>
        <Switch>
          <Route path="/me" component={User} />
          <Route path="*" component={Habits} />
        </Switch>
        <PageViewAnalytics />
      </AppPages>
    </Router>
  );
};
