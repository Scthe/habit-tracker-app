import { getAuth } from "firebase/auth";

import { useFirebaseApp } from "./firebaseApp";

// "messaging"? "performance"? "storage"? "remoteConfig"?

export const useAuth = (): ReturnType<typeof getAuth> => {
  const app = useFirebaseApp();
  return getAuth(app);
};
