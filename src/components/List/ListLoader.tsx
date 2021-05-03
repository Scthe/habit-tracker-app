import React from "react";

import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";

export const ListLoader: React.FC<unknown> = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100px"
    >
      <CircularProgress />
    </Box>
  );
};
