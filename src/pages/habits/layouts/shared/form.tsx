import React, { lazy } from "react";
import { useParams } from "react-router-dom";

import { AppPage } from "pages/_shared";

const Form = lazy(() => import("../../fragments/form"));

export default (): JSX.Element => {
  const { id } = useParams<{ id?: string }>();
  const isEdit = id != null;

  return (
    <AppPage appMenuActiveItem={isEdit ? undefined : "create"}>
      <Form id={id} />
    </AppPage>
  );
};
