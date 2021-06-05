import React, { Suspense } from "react";
import DateFnsUtils from "@date-io/date-fns";
import MuiPickersUtilsProvider from "@material-ui/pickers/MuiPickersUtilsProvider";

import { FirebaseAppProvider } from "./firebaseUtils/firebaseApp";
import { firebaseConfig } from "./firebaseUtils/firebase.config";

import { AppRouter } from "./AppRouter";
import { UserProvider } from "./storage";
import { AppThemeProvider } from "./theme";
import { GlobalErrorBoundary } from "./pages/_shared";
import { ContentLoader } from "./components/contentStatus";
import { AlertProvider } from "./hooks/useShowAlert";

const App: React.FC<unknown> = () => {
  return (
    <GlobalErrorBoundary>
      <Suspense fallback={<ContentLoader />}>
        <FirebaseAppProvider firebaseConfig={firebaseConfig}>
          <AppThemeProvider>
            <UserProvider>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <AlertProvider>
                  <AppRouter />
                </AlertProvider>
              </MuiPickersUtilsProvider>
            </UserProvider>
          </AppThemeProvider>
        </FirebaseAppProvider>
      </Suspense>
    </GlobalErrorBoundary>
  );
};

export default App;
