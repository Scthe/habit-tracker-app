import React, { lazy } from "react";
import { AppPage } from "pages/_shared";

const Calendar = lazy(() => import("../../fragments/calendar"));

export default (): JSX.Element => {
  return (
    <AppPage appMenuActiveItem={"calendar"}>
      <Calendar />
    </AppPage>
  );
};
