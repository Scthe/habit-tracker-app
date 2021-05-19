import React, { lazy } from "react";

import { AppPage } from "pages/_shared";

const UserSettingsFragment = lazy(() => import("../../fragments/settings"));

export default (): JSX.Element => {
  return (
    <AppPage appMenuActiveItem="me">
      <UserSettingsFragment />
    </AppPage>
  );
};
