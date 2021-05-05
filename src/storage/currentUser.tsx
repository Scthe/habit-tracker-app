import React, { useRef, useContext } from "react";
import cloneDeep from "lodash/cloneDeep";
import { useAuth } from "~firebaseUtils";
// import { auth } from "firebaseUtils/init";

export type CurrentUser = {
  uid: string;
  displayName: string | null;
  isAnonymous: boolean;
  email: string | null;
  emailVerified: boolean;
  creationTime?: string; // from metadata
  lastSignInTime?: string; // from metadata
  providerId: string;
};
type AuthCtxType = { user: CurrentUser } | null;


export const CurrentUserContext = React.createContext<AuthCtxType>(null);

export const UserProvider: React.FC = ({ children }) => {
  const appState = useRef<AuthCtxType>(null);

  // usePreloadUser();
  // usePreloadQuery(); // for light/dark theme and other settings

  const auth = useAuth();

  auth.onAuthStateChanged((user) => {
    console.log("auth.onAuthStateChanged", user);
  });

  return (
    <CurrentUserContext.Provider value={appState.current}>
      {children}
    </CurrentUserContext.Provider>
  );
};

// export const useCurrentUser = (): CurrentUser | null => {
  // const ctx = useContext(CurrentUserContext);
  // return ctx.user;
// };
