import { AuthProviderId } from "~storage";

export const getProviderName = (providerId: AuthProviderId): string | null => {
  switch (providerId) {
    case "google.com":
      return "Google account";
    case "password":
      return "Email";
    case "anonymous":
      return "Anonymous";
    case "unknown":
      return null;
  }
};
