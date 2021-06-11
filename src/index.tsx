import React from "react";
import * as ReactDOM from "react-dom";
import { createHashHistory, History } from "history";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import { Offline as OfflineIntegration } from "@sentry/integrations";

import App from "./App";
import { pathnameRemoveIds } from "utils";

const history = createHashHistory();

Sentry.init({
  dsn:
    "https://03dbb043c93c4d1d9c1c01af58139888@o825934.ingest.sentry.io/5811183",
  integrations: [
    new Integrations.BrowserTracing({
      routingInstrumentation: Sentry.reactRouterV5Instrumentation(
        history,
        [{ path: "/" }],
        (pathname: string) => ({
          isExact: true,
          params: {},
          path: pathnameRemoveIds(pathname),
          url: pathname,
        })
      ),
    }),
    new OfflineIntegration(),
  ],
  release: "habit_tracker@" + NPM_PACKAGE_VERSION,
  environment: process.env.NODE_ENV,
  beforeSend: (event) => {
    event.tags = event.tags || {};
    event.tags["pathname"] = pathnameRemoveIds(history.location.pathname);
    return event;
  },
});

require("./index.css").default;

// <StrictMode> is not used as it conflicts with material-ui
const renderApp = (ReactApp: React.ComponentType<{ history: History }>) =>
  ReactDOM.render(
    <ReactApp history={history} />,
    document.getElementById("root") as HTMLElement
  );

renderApp(App);

if (module.hot) {
  module.hot.accept("./App", () => {
    const NextApp = require("./App").default;
    renderApp(NextApp);
  });
}
