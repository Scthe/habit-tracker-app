import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { logPageView } from "firebaseUtils/analytics";
import { useTheme } from "theme";
import { pathnameRemoveIds } from "utils";

export const PageViewAnalytics: React.FC = () => {
  const { pathname } = useLocation();
  const [theme] = useTheme();

  useEffect(() => {
    logPageView({ theme, pathname: pathnameRemoveIds(pathname) });
  }, [pathname, theme]);

  return null;
};
