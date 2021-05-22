import { useCallback } from "react";
import { collection, doc } from "firebase/firestore";
import type firestoreNS from "firebase/firestore";
import merge from "lodash/merge";

import { UserPreferences, DEFAULT_PREFERENCES } from "../types/UserPreferences";
import { AsyncData } from "~types";
import {
  CreateReferenceFn,
  useFirestoreDocSubscription,
} from "firebaseUtils/firestore/useFirestoreDocSubscription";

type Firestore = firestoreNS.FirebaseFirestore;
type DocReference<T> = firestoreNS.DocumentReference<T>;

export const userPreferencesDoc = (
  db: Firestore,
  userId: string
): DocReference<unknown> => {
  return doc(collection(db, "user"), userId);
};

const mergeUserPreferences = (prefs: unknown): UserPreferences => {
  return merge(DEFAULT_PREFERENCES, prefs || {});
};

export const useUserPreferencesAsync = (
  userId: string | undefined
): AsyncData<UserPreferences> => {
  const createReference: CreateReferenceFn<unknown> = useCallback(
    (db) => (userId == null ? null : userPreferencesDoc(db, userId)),
    [userId]
  );

  return useFirestoreDocSubscription(createReference, mergeUserPreferences);
};
