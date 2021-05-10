import React, { Suspense } from "react";
import DateFnsUtils from "@date-io/date-fns";
import { ThemeProvider } from "@material-ui/core/styles";
import MuiPickersUtilsProvider from "@material-ui/pickers/MuiPickersUtilsProvider";

import { FirebaseAppProvider, firebaseConfig } from "./firebaseUtils";

import { AppRouter } from "./AppRouter";
import { UserProvider } from "./storage";
import appTheme from "./theme";
import { PageLoader } from "./pages/_shared";
import { GlobalErrorBoundary } from "./components/GlobalErrorBoundary";
import { AlertProvider } from "./hooks/useShowAlert";

const App: React.FC<unknown> = () => {
  return (
    <GlobalErrorBoundary>
      <Suspense fallback={<PageLoader />}>
        <FirebaseAppProvider firebaseConfig={firebaseConfig}>
          <UserProvider>
            <ThemeProvider theme={appTheme}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <AlertProvider>
                  <AppRouter />
                </AlertProvider>
              </MuiPickersUtilsProvider>
            </ThemeProvider>
          </UserProvider>
        </FirebaseAppProvider>
      </Suspense>
    </GlobalErrorBoundary>
  );
};

export default App;
