import React, { lazy } from "react";
import { useParams } from "react-router-dom";

import { AppPage } from "pages/_shared";
import { useSingleColumnLayoutStyles } from "~hooks";

const Form = lazy(
  () => import(/* webpackChunkName: "habitsForm" */ "../../fragments/form")
);

// eslint is drunk?
// eslint-disable-next-line import/no-unused-modules
export default (): JSX.Element => {
  const styles = useSingleColumnLayoutStyles();
  const { id } = useParams<{ id?: string }>();
  const isEdit = id != null;

  return (
    <AppPage appMenuActiveItem={isEdit ? undefined : "create"}>
      <Form
        id={id}
        classes={{
          root: styles.root,
          content: styles.child,
        }}
      />
    </AppPage>
  );
};
