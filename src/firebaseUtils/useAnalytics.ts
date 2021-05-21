import { getAnalytics } from "firebase/analytics";

import { useFirebaseApp } from "./firebaseApp";

export const useAnalytics = (): ReturnType<typeof getAnalytics> => {
  const app = useFirebaseApp();
  return getAnalytics(app);
};
