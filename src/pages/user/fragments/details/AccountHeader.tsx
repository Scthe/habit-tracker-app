import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import { ToolbarTitle } from "components/ToolbarTitle";
import { AppMenuToggleButton } from "components/AppMenu";

export const AccountHeader: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <AppMenuToggleButton />
        <ToolbarTitle>Account details</ToolbarTitle>
      </Toolbar>
    </AppBar>
  );
};
