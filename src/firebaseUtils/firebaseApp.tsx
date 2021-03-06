import { getApps, initializeApp, registerVersion } from "firebase/app";
import type { FirebaseApp } from "firebase/app";
import * as React from "react";

const FirebaseAppContext = React.createContext<FirebaseApp | undefined>(
  undefined
);

interface Props {
  firebaseConfig: Record<string, unknown>;
}

const _FIREBASE_APP: FirebaseApp | null = null;

export const __getFirebaseApp = (): FirebaseApp | null => {
  if (_FIREBASE_APP != null) {
    return _FIREBASE_APP;
  }

  const apps = getApps();
  return apps.length > 0 ? apps[0] : null;
};

export const FirebaseAppProvider: React.FC<Props> = ({
  firebaseConfig,
  children,
}) => {
  const firebaseApp = React.useMemo(() => {
    const reactVersion = React.version || "unknown";
    registerVersion("react", reactVersion);
    return initializeApp(firebaseConfig);
  }, [firebaseConfig]);

  return (
    <FirebaseAppContext.Provider value={firebaseApp}>
      {children}
    </FirebaseAppContext.Provider>
  );
};

export const useFirebaseApp = (): FirebaseApp => {
  const firebaseApp = React.useContext(FirebaseAppContext);
  if (!firebaseApp) {
    throw new Error(
      "Cannot call useFirebaseApp unless your component is within a FirebaseAppProvider"
    );
  }

  return firebaseApp;
};
