import React, { Suspense } from "react";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import { ErrorBoundary } from "react-error-boundary";

import { LoadingPageWithDrawer } from "./internal/LoadingPageWithDrawer";
import { ErrorPageWithDrawer } from "./internal/ErrorPageWithDrawer";
import { AppMenuDrawer } from "components/AppMenu";
import { useAppMenuActiveLink } from "~storage";
import { globalErrorHandler } from "~utils";

const useStyles = makeStyles(() => ({
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

  // IMPORTANT: do not trigger unmount/mount of children on media responsive change! It resets form state.
  return (
    <Box display="flex">
      <AppMenuDrawer currentItem={currentItem} className={styles.drawer} />

      <ErrorBoundary
        FallbackComponent={ErrorPageWithDrawer}
        onError={globalErrorHandler}
      >
        <Suspense fallback={<LoadingPageWithDrawer />}>
          <div className={styles.content}>{children}</div>
        </Suspense>
      </ErrorBoundary>
    </Box>
  );
};
