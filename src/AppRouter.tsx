import React, { lazy, Suspense } from "react";
import { Switch, Route, HashRouter as Router } from "react-router-dom";
import { useCurrentUser, withAppMenuActive } from "~contexts";
import { AppLayout, PageLoader } from "pages/_shared";

const Habits = lazy(() => import("./pages/habits"));
const User = lazy(() => import("./pages/user"));
import Home from "./pages/home"; // do not lazy load this. TODO just make this static page. Unless logged in?

const AppPages: React.FC<unknown> = ({ children }) => {
  return (
    <AppLayout>
      <Suspense fallback={<PageLoader />}>{children}</Suspense>
    </AppLayout>
  );
};

export const AppRouter: React.FC<unknown> = () => {
  const user = useCurrentUser();
  if (user == null) {
    return <Home />;
  }

  return (
    <Router>
      <AppPages>
        <Switch>
          <Route path="/me" component={withAppMenuActive(User, "me")} />
          <Route path="*" component={Habits} />
        </Switch>
      </AppPages>
    </Router>
  );
};
