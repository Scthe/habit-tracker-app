import React, { useEffect } from "react";

// TODO [analytics]: not in dev mode, anonymize location wrt. ids (replace with :id)

export const PageViewAnalytics: React.FC = () => {
  // const analytics = useAnalytics();
  // const u = useUser();
  // console.log("user", u);

  useEffect(() => {
    // console.log(NODE_ENV, `'${location.pathname}'`);
    // analytics.logEvent('page-view', { path_name: location.pathname });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return null;
};
