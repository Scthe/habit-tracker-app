import type firebaseNS from "firebase/auth";

export type AuthProviderId =
  | "google.com"
  | "password" // email
  | "anonymous"
  | "unknown";

function isKnownProvider(provider: string): provider is AuthProviderId {
  const KNOWN_PROVIDERS = ["google.com", "password", "anonymous"];
  return KNOWN_PROVIDERS.includes(provider);
}

export interface AuthProviderData {
  displayName: string | null;
  email: string | null;
  providerId: AuthProviderId;
  uid: string;
}

export interface CurrentUser {
  uid: string;
  displayName: string | null;
  isAnonymous: boolean;
  email: string | null;
  emailVerified: boolean;
  providersData: AuthProviderData[];
  creationTime?: Date;
  lastSignInTime?: Date;
}

export const adaptFirebaseUser = (user: firebaseNS.User): CurrentUser => ({
  uid: user.uid,
  displayName: user.displayName,
  isAnonymous: user.isAnonymous,
  email: user.email,
  emailVerified: user.emailVerified,
  providersData: adaptProvidersData(user),
  creationTime: parseDate(user.metadata.creationTime),
  lastSignInTime: parseDate(user.metadata.lastSignInTime),
});

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
