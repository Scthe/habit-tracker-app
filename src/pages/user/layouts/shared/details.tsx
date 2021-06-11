import React, { lazy } from "react";
import { AppPage } from "pages/_shared";

const UserDetailsFragment = lazy(
  () => import(/* webpackChunkName: "userDetails" */ "../../fragments/details")
);

export default (): JSX.Element => {
  return (
    <AppPage appMenuActiveItem="me" documentTitle="My Account">
      <UserDetailsFragment />
    </AppPage>
  );
};
