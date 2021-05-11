import React, { lazy } from "react";
import { AppPage } from "pages/_shared";

const Calendar = lazy(() => import("../../fragments/calendar"));

// eslint is drunk?
// eslint-disable-next-line import/no-unused-modules
export default (): JSX.Element => {
  return (
    <AppPage appMenuActiveItem={"calendar"}>
      <Calendar />
    </AppPage>
  );
};
