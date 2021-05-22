import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";

import { AppPage } from "../AppPage";
import { AppPageContent } from "../AppPageContent";
import { AppMenuToggleButton } from "components/AppMenu";

const useStyles = makeStyles(() => ({
  content: { width: "100%" },
}));

export const EmptyStaticPage: React.FC = ({ children }) => {
  const styles = useStyles();
  return (
    <AppPage className={styles.content}>
      <AppBar position="static">
        <Toolbar>
          <AppMenuToggleButton />
        </Toolbar>
      </AppBar>

      <AppPageContent>{children}</AppPageContent>
    </AppPage>
  );
};
