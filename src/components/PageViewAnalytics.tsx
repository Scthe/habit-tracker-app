import React, { useEffect } from "react";
// import { useAnalytics, useUser } from 'reactfire';

export const PageViewAnalytics: React.FC = () => {
  // const analytics = useAnalytics();
  // const u = useUser();
  // console.log("user", u);

  useEffect(() => {
    // console.log(NODE_ENV, `'${location.pathname}'`); // TODO not in dev
    // TODO anonymize location wrt. ids (replace with :id)
    // analytics.logEvent('page-view', { path_name: location.pathname });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return null;
};
