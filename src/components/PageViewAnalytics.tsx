import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { logPageView } from "firebaseUtils/analytics";
import { useTheme } from "theme";

/** remove id's */
const parsePathname = (pathname = ""): string => {
  const hasNumber = (s: string) => /\d/.test(s);

  const parts = pathname.split("/");
  const parts2 = parts.map((e) => (hasNumber(e) ? ":id" : e));
  return parts2.join("/");
};

export const PageViewAnalytics: React.FC = () => {
  const { pathname } = useLocation();
  const [theme] = useTheme();

  useEffect(() => {
    logPageView({ theme, pathname: parsePathname(pathname) });
  }, [pathname, theme]);

  return null;
};
