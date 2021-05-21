import firebase from "firebase/compat/app";
import * as React from "react";

const FirebaseAppContext = React.createContext<firebase.app.App | undefined>(
  undefined
);

interface Props {
  firebaseConfig: Record<string, unknown>;
}

export const FirebaseAppProvider: React.FC<Props> = ({
  firebaseConfig,
  children,
}) => {
  const firebaseApp: firebase.app.App = React.useMemo(() => {
    const reactVersion = React.version || "unknown";
    firebase.registerVersion("react", reactVersion);
    return firebase.initializeApp(firebaseConfig);
  }, [firebaseConfig]);

  return (
    <FirebaseAppContext.Provider value={firebaseApp}>
      {children}
    </FirebaseAppContext.Provider>
  );
};

export const useFirebaseApp = (): firebase.app.App => {
  const firebaseApp = React.useContext(FirebaseAppContext);
  if (!firebaseApp) {
    throw new Error(
      "Cannot call useFirebaseApp unless your component is within a FirebaseAppProvider"
    );
  }

  return firebaseApp;
};
