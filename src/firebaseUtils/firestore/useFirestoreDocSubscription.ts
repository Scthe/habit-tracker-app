import { onSnapshot } from "firebase/firestore";
import type firestoreNS from "firebase/firestore";
import { useEffect, useState } from "react";

import { useFirestore } from "../useFirestore";
import { AsyncData } from "~types";

type Firestore = firestoreNS.FirebaseFirestore;
type DocumentReference<T> = firestoreNS.DocumentReference<T>;
export type FirestoreErrorHandler = (err: firestoreNS.FirestoreError) => void;

/** Subscribe to a single doc */
export const useFirestoreDocSubscription = <R = unknown, U = unknown>(
  createReference: (db: Firestore) => DocumentReference<R>, // please useCallback this!!!
  mapper: (item: R | undefined) => U,
  onError?: FirestoreErrorHandler
): AsyncData<U> => {
  const db = useFirestore();

  const [asyncData, setAsyncData] = useState<AsyncData<U>>({ status: "init" });

  useEffect(() => {
    // this works differently than one time request. "loading" happens only once at startup and will NEVER go came back
    setAsyncData({ status: "loading" });

    const ref = createReference(db);
    const unsubscribe = onSnapshot(
      ref,
      (docSnapshot) => {
        const data = docSnapshot.data();
        setAsyncData({
          status: "success",
          data: mapper(data),
        });
      },
      (error) => {
        onError && onError(error);
        setAsyncData({ status: "error", error });
      }
    );

    return unsubscribe;
  }, [db, createReference, mapper, onError]);

  return asyncData;
};
