import React, { lazy } from "react";
import { AppPage } from "pages/_shared";

const UserDetailsFragment = lazy(() => import("../../fragments/details"));

export default (): JSX.Element => {
  return (
    <AppPage appMenuActiveItem="me">
      <UserDetailsFragment />
    </AppPage>
  );
};