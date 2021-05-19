import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import React from "react";

/**
 * Fill the whole space with giant loader. Use it as a page CONTENT loader.
 *
 * It does not display toolbar or drawer, so if this component is fullscreen,
 * The user cannot do anything else.
 */
export const ContentLoader: React.FC<unknown> = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100%"
      minHeight="150px"
    >
      <CircularProgress />
    </Box>
  );
};
