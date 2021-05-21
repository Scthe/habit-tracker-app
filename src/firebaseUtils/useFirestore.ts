import { getFirestore } from "firebase/firestore";
import type firestoreNS from "firebase/firestore";
import { useFirebaseApp } from "./firebaseApp";

type Firestore = ReturnType<typeof getFirestore>;
type QuerySnapshot<T> = firestoreNS.QuerySnapshot<T>;

export const useFirestore = (): Firestore => {
  const app = useFirebaseApp();
  return getFirestore(app);
};

/** Iterate over QuerySnapshot and collect resuts into array */
export const collectQueryResults = <T>(
  querySnapshot: QuerySnapshot<T>
): T[] => {
  const results: T[] = [];
  querySnapshot.forEach((doc) => {
    results.push(doc.data());
  });
  return results;
};
