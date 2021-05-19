import React from "react";

import { ContentMessage, ContentMessageProps } from "./ContentMessage";

type Props = Partial<ContentMessageProps>;
export type ContentErrorMessageProps = Props;

/**
 * Error message with nice defaults.
 *
 * It does not display toolbar or drawer, so if this component is fullscreen,
 * The user cannot do anything else.
 */
export const ContentErrorMessage: React.FC<Props> = ({
  icon,
  message,
  children,
}) => {
  return (
    <ContentMessage
      icon={icon != null ? icon : "sentiment_dissatisfied"}
      message={message != null ? message : "Unexpected error ocurred"}
    >
      {children}
    </ContentMessage>
  );
};
