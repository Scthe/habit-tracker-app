import React, { Suspense } from "react";
import DateFnsUtils from "@date-io/date-fns";
import MuiPickersUtilsProvider from "@material-ui/pickers/MuiPickersUtilsProvider";
import type { History } from "history";

import { FirebaseAppProvider } from "./firebaseUtils/firebaseApp";
import { firebaseConfig } from "./firebaseUtils/firebase.config";

import { AppRouter } from "./AppRouter";
import { UserProvider } from "./storage";
import { AppThemeProvider } from "./theme";
import { GlobalErrorBoundary } from "./pages/_shared";
import { ContentLoader } from "./components/contentStatus";
import { AlertProvider } from "./hooks/useShowAlert";

// import css
require("./app.css").default;

const App: React.FC<{ history: History }> = ({ history }) => {
  return (
    <GlobalErrorBoundary>
      <Suspense fallback={<ContentLoader />}>
        <FirebaseAppProvider firebaseConfig={firebaseConfig}>
          <AppThemeProvider>
            <UserProvider>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <AlertProvider>
                  <AppRouter history={history} />
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
