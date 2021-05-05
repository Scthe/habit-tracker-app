import React, { lazy, Suspense } from "react";
import { Switch, Route, HashRouter as Router } from "react-router-dom";
import { PageViewAnalytics } from "./components";

// import Home from "./pages/home"; // do not lazy load this. TODO just make this static page. Unless logged in?
import { AppLayout, PageLoader } from "./pages/_shared";
import { useCurrentUserWithSuspense } from "~storage";

// TODO other subpages in habits also can be lazy loaded
const Habits = lazy(() => import("./pages/habits"));
const User = lazy(() => import("./pages/user"));

const AppPages: React.FC<unknown> = ({ children }) => {
  return (
    <AppLayout>
      <Suspense fallback={<PageLoader />}>{children}</Suspense>
    </AppLayout>
  );
};

export const AppRouter: React.FC<unknown> = () => {
  const user = useCurrentUserWithSuspense();
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
