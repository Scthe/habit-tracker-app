import { getAuth } from "firebase/auth";

import { useFirebaseApp } from "./firebaseApp";

// "messaging"? "performance"? "storage"? "remoteConfig"?
// TODO revert webpack prod: `chunkIds: "named"`

export const useAuth = (): ReturnType<typeof getAuth> => {
  const app = useFirebaseApp();
  return getAuth(app);
};
