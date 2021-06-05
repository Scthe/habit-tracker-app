import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import type firebaseNS from "firebase/auth";

import {
  AuthProviderData,
  CurrentUser,
  isKnownProvider,
} from "../types/CurrentUser";
import { useAuth } from "firebaseUtils/useAuth";
import { logSimpleEvent } from "firebaseUtils/analytics";

export type NotLogged = { status: "notlogged" };

export type Logged = {
  status: "logged";
  user: CurrentUser;
};

type UserLoggedState =
  | { status: "init" }
  | NotLogged
  | Logged
  | { status: "error"; error: Error };

export const useUserLoginState = (): UserLoggedState => {
  // NOTE: auth().currentUser is not a magic bypass to get user data. It's null on first render
  // and TBH. we might as well do it by hand.
  const [userData, setUserData] = useState<UserLoggedState>({ status: "init" });
  const auth = useAuth();

  useEffect(() => {
    const onSuccess = (firebaseUser: firebaseNS.User | null) => {
      // console.log("onAuthStateChanged:", firebaseUser);
      if (firebaseUser == null) {
        setUserData({ status: "notlogged" });
      } else {
        const user = adaptFirebaseUser(firebaseUser);
        logSimpleEvent("user_account_data", {
          isAnonymous: String(user.isAnonymous),
          providers: user.providersData.map((p) => p.providerId).join(", "),
        });
        setUserData({
          status: "logged",
          user,
        });
      }
    };
    const onError = (error: Error) => {
      console.error("AuthStateSyncError", error);
      setUserData({ status: "error", error });
    };
    return onAuthStateChanged(auth, onSuccess, onError);
  }, [auth, setUserData]);

  return userData;
};

function adaptFirebaseUser(user: firebaseNS.User): CurrentUser {
  return {
    uid: user.uid,
    displayName: user.displayName,
    isAnonymous: user.isAnonymous,
    email: user.email,
    emailVerified: user.emailVerified,
    providersData: adaptProvidersData(user),
    creationTime: parseDate(user.metadata.creationTime),
    lastSignInTime: parseDate(user.metadata.lastSignInTime),
  };
}

function parseDate(d: string | undefined) {
  return d != null ? new Date(d) : undefined;
}

function adaptProvidersData(data: firebaseNS.User): AuthProviderData[] {
  const isProviderData = (
    e: firebaseNS.UserInfo | null
  ): e is firebaseNS.UserInfo => e != null;

  return data.providerData
    .filter(isProviderData)
    .map((e: firebaseNS.UserInfo) => ({
      displayName: e.displayName,
      email: e.email,
      providerId: isKnownProvider(e.providerId) ? e.providerId : "unknown",
      uid: e.uid,
    }));
}
