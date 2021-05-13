import React, { lazy } from "react";
import { useParams } from "react-router-dom";

import { AppPage } from "pages/_shared";

const HabitDetails = lazy(() => import("../../fragments/details"));

export default (): JSX.Element => {
  const { id } = useParams<{ id: string }>();

  return (
    <AppPage>
      <HabitDetails id={id} isInMasterDetailLayout={false} />
    </AppPage>
  );
};
