export type AuthProviderId =
  | "google.com"
  | "password" // email
  | "anonymous"
  | "unknown";

export function isKnownProvider(provider: string): provider is AuthProviderId {
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
