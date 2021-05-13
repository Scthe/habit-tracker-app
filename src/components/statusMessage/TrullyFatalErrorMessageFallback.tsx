import Button from "@material-ui/core/Button";
import React from "react";
import { FallbackProps } from "react-error-boundary";
import { Link } from "react-router-dom";

import { FullPageErrorMessage } from "./FullPageErrorMessage";

/** Whole app just blown up. Assumes page is blank */
export const TrullyFatalErrorMessageFallback: React.FC<FallbackProps> = () => {
  return (
    <FullPageErrorMessage>
      <Link to="/">
        <Button variant="contained" color="primary">
          Go back to app
        </Button>
      </Link>
    </FullPageErrorMessage>
  );
};
