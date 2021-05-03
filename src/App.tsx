import React from "react";
import DateFnsUtils from "@date-io/date-fns";
import { ThemeProvider } from "@material-ui/core/styles";
import MuiPickersUtilsProvider from "@material-ui/pickers/MuiPickersUtilsProvider";

import { AppRouter } from "./AppRouter";
import { UserContext } from "./contexts";
import appTheme from "./theme";

const App: React.FC<unknown> = () => {
  return (
    <ThemeProvider theme={appTheme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <UserContext>
          <AppRouter />
        </UserContext>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
};

export default App;
