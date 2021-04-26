import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";

import { AppRouter } from "./AppRouter";
import { UserContext } from "./contexts";
import appTheme from "./theme";

const App: React.FC<unknown> = () => {
  return (
    <ThemeProvider theme={appTheme}>
      <UserContext>
        <AppRouter />
      </UserContext>
    </ThemeProvider>
  );
};

export default App;
