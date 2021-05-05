import React, { Suspense } from "react";
import DateFnsUtils from "@date-io/date-fns";
import { ThemeProvider } from "@material-ui/core/styles";
import MuiPickersUtilsProvider from "@material-ui/pickers/MuiPickersUtilsProvider";

import { FirebaseAppProvider, firebaseConfig } from "./firebaseUtils";

import { AppRouter } from "./AppRouter";
import { UserProvider } from "./storage";
import appTheme from "./theme";
import { PageLoader } from "./pages/_shared";

const App: React.FC<unknown> = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <FirebaseAppProvider firebaseConfig={firebaseConfig}>
        <UserProvider>
          <ThemeProvider theme={appTheme}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <AppRouter />
            </MuiPickersUtilsProvider>
          </ThemeProvider>
        </UserProvider>
      </FirebaseAppProvider>
    </Suspense>
  );
};

export default App;
