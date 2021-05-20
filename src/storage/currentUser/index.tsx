import React, { useContext, useState, useEffect } from "react";

import {
  AuthProviderId,
  AuthProviderData,
  CurrentUser,
  adaptFirebaseUser,
} from "./CurrentUser";
import { useAuth } from "~firebaseUtils";
import { createSuspendedPreloadHook } from "~utils";

export { AuthProviderId, AuthProviderData, CurrentUser };

type NotLogged = { status: "notlogged" };
type Logged = { status: "logged"; user: CurrentUser };
type AuthCtxType = { status: "init" } | NotLogged | Logged;

const CurrentUserContext = React.createContext<AuthCtxType>({
  status: "init",
});

export const UserProvider: React.FC = ({ children }) => {
  // NOTE: auth().currentUser is not a magic bypass to get user data. It's null on first render
  // and TBH. we might as well do it by hand.
  const [userData, setUserData] = useState<AuthCtxType>({ status: "init" });
  const auth = useAuth();

  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      console.log("onAuthStateChanged:", user);
      if (user == null) {
        setUserData({ status: "notlogged" });
      } else {
        setUserData({
          status: "logged",
          user: adaptFirebaseUser(user),
        });
      }
    });
  }, [auth, setUserData]);

  return (
    <CurrentUserContext.Provider value={userData}>
      {children}
    </CurrentUserContext.Provider>
  );
};

/**
 * Returns user regrdless of the status. Can be no user if still "init",
 * can be user that is null (not logged). This is more of a util method,
 * as it will be hard to get `user.uid` from it. If you need user that
 * is logged, use `useLoggedUser`, that automatically throws.
 */
export const useUserStatus = (): AuthCtxType => {
  const ctx = useContext(CurrentUserContext);
  return ctx;
};

/** Get currently logged user (with uid, email etc.). Throws if no user is logged in. */
export const useLoggedUser = (): CurrentUser => {
  const user = useUserStatus();
  if (user.status !== "logged") {
    throw new Error("Tried to use current logged user, but we are not logged.");
  }
  return user.user;
};

/** Throws till status is different than 'init' */
const useUserSuspenseImpl = createSuspendedPreloadHook(
  (c: AuthCtxType): c is Logged => c.status !== "init"
);

/**
 * Throws a promise till status is different than 'init'. This is a hook to use
 * with `Suspense`, probably only once in the whole app.
 */
export const useUserWithSuspense = (): Logged | NotLogged => {
  const user = useUserStatus();
  useUserSuspenseImpl(user);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return user as any;
};
