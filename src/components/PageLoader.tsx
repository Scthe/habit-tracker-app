import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import React from "react";

export const PageLoader: React.FC<unknown> = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      width="100%"
    >
      <CircularProgress />
    </Box>
  );
};
