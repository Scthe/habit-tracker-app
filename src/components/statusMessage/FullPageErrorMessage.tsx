import React from "react";

import { FullPageMessage, FullPageMessageProps } from "./FullPageMessage";

type Props = Partial<FullPageMessageProps>;

/** Error message with nice defaults */
export const FullPageErrorMessage: React.FC<Props> = ({
  icon,
  message,
  children,
}) => {
  return (
    <FullPageMessage
      icon={icon != null ? icon : "sentiment_dissatisfied"}
      message={message != null ? message : "Unexpected error ocurred"}
    >
      {children}
    </FullPageMessage>
  );
};
