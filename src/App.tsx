import React, { Suspense } from "react";
import DateFnsUtils from "@date-io/date-fns";
import MuiPickersUtilsProvider from "@material-ui/pickers/MuiPickersUtilsProvider";

import { FirebaseAppProvider, firebaseConfig } from "./firebaseUtils";

import { AppRouter } from "./AppRouter";
import { UserProvider } from "./storage";
import { AppThemeProvider } from "./theme";
import { GlobalErrorBoundary } from "./components/GlobalErrorBoundary";
import { PageLoader } from "./components/PageLoader";
import { AlertProvider } from "./hooks/useShowAlert";

const App: React.FC<unknown> = () => {
  return (
    <GlobalErrorBoundary>
      <Suspense fallback={<PageLoader />}>
        <FirebaseAppProvider firebaseConfig={firebaseConfig}>
          <UserProvider>
            <AppThemeProvider>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <AlertProvider>
                  <AppRouter />
                </AlertProvider>
              </MuiPickersUtilsProvider>
            </AppThemeProvider>
          </UserProvider>
        </FirebaseAppProvider>
      </Suspense>
    </GlobalErrorBoundary>
  );
};

export default App;
