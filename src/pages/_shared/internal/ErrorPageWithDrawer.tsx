import Button from "@material-ui/core/Button";
import React from "react";
import { Link } from "react-router-dom";

import { EmptyStaticPage } from "./EmptyStaticPage";
import { ContentErrorMessage } from "~components";

/**
 * Show toolbar, drawer (or drawer button on mobile) and error message.
 * Whole app just blown up. Assumes page is blank and adds all basic elements.
 */
export const ErrorPageWithDrawer: React.FC = () => {
  return (
    <EmptyStaticPage>
      <ContentErrorMessage>
        <Link to="/">
          <Button variant="contained" color="primary">
            Go back to app
          </Button>
        </Link>
      </ContentErrorMessage>
    </EmptyStaticPage>
  );
};
