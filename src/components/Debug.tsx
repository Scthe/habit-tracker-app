import React from "react";

interface Props {
  v: unknown;
}

export const Debug: React.FC<Props> = ({ children, v }) => {
  return <pre>{JSON.stringify(v || children, null, 2)}</pre>;
};
