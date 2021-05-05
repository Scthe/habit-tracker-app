import React, { useContext, useState, useEffect } from "react";
import type firebaseNS from "firebase";
import { useAuth } from "~firebaseUtils";
import { createSuspendedPreloadHook } from "~utils";

export type CurrentUser = {
  uid: string;
  displayName: string | null;
  isAnonymous: boolean;
  email: string | null;
  emailVerified: boolean;
  providerId: string;
  creationTime?: string; // from metadata
  lastSignInTime?: string; // from metadata
};

type NotLogged = { status: "notlogged" };
type Logged = { status: "logged"; user: CurrentUser };
type AuthCtxType = { status: "init" } | NotLogged | Logged;

export const CurrentUserContext = React.createContext<AuthCtxType>({
  status: "init",
});

const adaptFirebaseUser = (user: firebaseNS.User): CurrentUser => ({
  uid: user.uid,
  displayName: user.displayName,
  isAnonymous: user.isAnonymous,
  email: user.email,
  emailVerified: user.emailVerified,
  providerId: user.providerId,
  creationTime: user.metadata.creationTime,
  lastSignInTime: user.metadata.lastSignInTime,
});

export const UserProvider: React.FC = ({ children }) => {
  const [userData, setUserData] = useState<AuthCtxType>({ status: "init" });
  const auth = useAuth();

  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      console.log("auth.onAuthStateChanged", user?.uid);
      if (user == null) {
        setUserData({ status: "notlogged" });
      } else {
        setUserData({
          status: "logged",
          user: adaptFirebaseUser(user),
        });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CurrentUserContext.Provider value={userData}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export const useCurrentUser = (): AuthCtxType => {
  const ctx = useContext(CurrentUserContext);
  return ctx;
};

/** Throws till status is different than 'init' */
const useUserSuspenseImpl = createSuspendedPreloadHook(
  (c: AuthCtxType): c is Logged => c.status !== "init"
);

export const useCurrentUserWithSuspense = (): Logged | NotLogged => {
  const user = useCurrentUser();
  useUserSuspenseImpl(user);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return user as any;
};
