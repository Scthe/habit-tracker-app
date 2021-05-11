import React from "react";

import DesktopRouter from "./layouts/desktop";
import MobileRouter from "./layouts/mobile";
import { useDesktopLayout } from "~hooks";

// TODO subscribe to habits here? And do not fetch in subviews?

// eslint-disable-next-line import/no-unused-modules
export default (): JSX.Element => {
  const isDesktop = useDesktopLayout();
  return isDesktop ? <DesktopRouter /> : <MobileRouter />;
};
