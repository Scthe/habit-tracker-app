import React from "react";
import { ContentMessage } from "~components";

export interface ListEmptyProps {
  icon?: string;
  wasFilteredOut: boolean;
}

export const ListEmpty: React.FC<ListEmptyProps> = ({
  icon,
  wasFilteredOut,
  children,
}) => {
  let textToShow = children;
  if (textToShow == null) {
    textToShow = wasFilteredOut ? "No matching results" : "No results";
  }

  return <ContentMessage icon={icon!} message={textToShow} />;
};

ListEmpty.defaultProps = {
  icon: "block", // ugh, not the greatest choice
};
