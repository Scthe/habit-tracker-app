import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

import { useFirebaseApp } from "./";

// "messaging"? "performance"? "storage"? "remoteConfig"?

export const useAuth = (): ReturnType<typeof getAuth> => {
  const app = useFirebaseApp();
  return getAuth(app);
};

export const useFirestore = (): ReturnType<typeof getFirestore> => {
  const app = useFirebaseApp();
  return getFirestore(app);
};

export const useAnalytics = (): ReturnType<typeof getAnalytics> => {
  const app = useFirebaseApp();
  return getAnalytics(app);
};
