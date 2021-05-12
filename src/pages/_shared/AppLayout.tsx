import React from "react";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";

import { AppMenuDrawer } from "~components";
import { useAppMenuActiveLink } from "~storage";

const useStyles = makeStyles(() => ({
  root: {},
  drawer: {
    flexShrink: 0,
    flexGrow: 0,
  },
  content: {
    flex: 1,
    height: "100vh",
  },
}));

export const AppLayout: React.FC<unknown> = ({ children }) => {
  const currentItem = useAppMenuActiveLink();
  const styles = useStyles();

  // IMPORTANT: do not trigger unmount/mount of children on media responsive change!
  return (
    <Box display="flex">
      <AppMenuDrawer currentItem={currentItem} className={styles.drawer} />

      <div className={styles.content}>{children}</div>
    </Box>
  );
};
