import React, { lazy } from "react";

import { AppPage } from "pages/_shared";
import { DetailsView, MasterDetailsLayout, MasterView } from "~components";

const UserDetailsFragment = lazy(() => import("../../fragments/details"));
const UserSettingsFragment = lazy(() => import("../../fragments/settings"));

export default (): JSX.Element => {
  return (
    <AppPage appMenuActiveItem="me">
      <MasterDetailsLayout>
        <MasterView>
          <UserDetailsFragment />
        </MasterView>

        <DetailsView hasItem={true} detailKey="settings" itemFallback={null}>
          <UserSettingsFragment />
        </DetailsView>
      </MasterDetailsLayout>
    </AppPage>
  );
};
