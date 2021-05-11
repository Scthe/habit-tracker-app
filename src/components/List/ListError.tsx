import React from "react";
import Button from "@material-ui/core/Button";
import { FullPageMessage } from "~components";

interface Props {
  retry?: () => void;
}

export const ListError: React.FC<Props> = ({ retry }) => {
  return (
    <FullPageMessage
      icon="cloud_off"
      message="Can't load the results"
    >{retry ? (
      <Button onClick={retry} color="primary">
        Try again
      </Button>
    ) : null}
    </FullPageMessage>
  );
};
