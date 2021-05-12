import React from "react";
import { FallbackProps } from "react-error-boundary";

import { FullPageMessage, FullPageMessageProps } from "~components";

type Props = Partial<FullPageMessageProps>;

export const FullPageErrorMessage: React.FC<Props> = ({ icon, message }) => {
  return (
    <FullPageMessage
      icon={icon != null ? icon : "sentiment_dissatisfied"}
      message={message != null ? message : "Unexpected error ocurred"}
    />
  );
};

export const FullPageErrorMessageFallback: React.FC<FallbackProps> = () => {
  return <FullPageErrorMessage />;
};
