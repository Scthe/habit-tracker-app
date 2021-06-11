import { Route } from "react-router-dom";
import { withSentryRouting } from "@sentry/react";

/** Add tracking integration to <Route>, e.g. sentry */
const TracedRoute = withSentryRouting(Route);
export { TracedRoute };
