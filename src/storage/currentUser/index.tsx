export * from "./types/CurrentUser";
export * from "./types/UserPreferences";
export { userPreferencesDoc } from "./internal/useUserPreferencesAsync";

import React, { useContext } from "react";

import { CurrentUser } from "./types/CurrentUser";
import { UserPreferences } from "./types/UserPreferences";
import {
  NotLogged,
  Logged as UserAuthLogged,
  useUserLoginState,
} from "./internal/useUserLoginState";
import { useUserPreferencesAsync } from "./internal/useUserPreferencesAsync";
import { createSuspendedPreloadHook } from "utils/reactUtils";

// TODO check if unplug is really needed (entries in package.json)

type Logged = UserAuthLogged & { userPreferences: UserPreferences };

type AuthCtxType =
  | { status: "init" }
  | NotLogged
  | Logged
  | { status: "error"; error: Error };

const CurrentUserContext = React.createContext<AuthCtxType>({
  status: "init",
});

const mergeUserAndPreferences = (
  userStatus: ReturnType<typeof useUserLoginState>,
  preferencesAsync: ReturnType<typeof useUserPreferencesAsync>
): AuthCtxType => {
  if (userStatus.status === "notlogged") {
    return userStatus;
  }

  // ok, so we have both responses, but one of them can be an error
  if (userStatus.status === "error") {
    return userStatus;
  }
  if (preferencesAsync.status === "error") {
    return preferencesAsync;
  }

  // loading
  if (
    userStatus.status === "init" ||
    preferencesAsync.status === "init" ||
    preferencesAsync.status === "loading" // we subscribe to firebase, so this happens only once
  ) {
    return { status: "init" };
  }

  // both responses are ok, combine
  return {
    status: "logged",
    user: userStatus.user,
    userPreferences: preferencesAsync.data,
  };
};

export const UserProvider: React.FC = ({ children }) => {
  const userStatus = useUserLoginState();
  const userPreferencesAsync = useUserPreferencesAsync(
    userStatus.status === "logged" ? userStatus.user.uid : undefined
  );
  const value = mergeUserAndPreferences(userStatus, userPreferencesAsync);

  return (
    <CurrentUserContext.Provider value={value}>
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

/** Get preferences for currently logged user. Throws if no user is logged in. */
export const useUserPreferences = (): UserPreferences => {
  const user = useUserStatus();
  if (user.status !== "logged") {
    throw new Error(
      "Tried to use preferences of current logged user, but we are not logged."
    );
  }
  return user.userPreferences;
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
  useUserSuspenseImpl(user); // throws if user is still in init

  if (user.status === "error") {
    throw user.error;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return user as any;
};
