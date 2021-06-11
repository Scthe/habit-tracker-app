import { useCallback } from "react";
import { UseAsyncReturn } from "react-async-hook";
import { setDoc } from "firebase/firestore";

import {
  CurrentUser,
  useLoggedUser,
  UserPreferences,
  userPreferencesDoc,
} from "~storage";
import { useFirestore } from "firebaseUtils/useFirestore";
import { useFirestoreWrite } from "firebaseUtils/firestore/useFirestoreWrite";

type UserPrefEditData = Partial<UserPreferences>;
type Firestore = ReturnType<typeof useFirestore>;

const setUserPreferences = async (
  db: Firestore,
  data: UserPrefEditData,
  uid: CurrentUser["uid"]
) => {
  const ref = userPreferencesDoc(db, uid);
  await setDoc(ref, data, { merge: true });
};

export const useSetUserPreferences = (): UseAsyncReturn<
  void,
  [UserPrefEditData]
> => {
  const { uid } = useLoggedUser();
  const implFn = useCallback(
    (db: Firestore, data: UserPrefEditData) =>
      setUserPreferences(db, data, uid),
    [uid]
  );
  return useFirestoreWrite(implFn);
};
