import { onSnapshot } from "firebase/firestore";
import type firestoreNS from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  AsyncState,
  useAsync,
  UseAsyncOptionsNormalized,
} from "react-async-hook";
import { useFirestore } from "~firebaseUtils";

import { AsyncData } from "~types";

export type Firestore = ReturnType<typeof useFirestore>;
type QuerySnapshot<T> = firestoreNS.QuerySnapshot<T>;
type DocumentReference<T> = firestoreNS.DocumentReference<T>;

export type FirestoreErrorHandler = (err: firestoreNS.FirestoreError) => void;

const adaptFromAsyncHook = <T>(data: AsyncState<T>): AsyncData<T> => {
  switch (data.status) {
    case "not-requested":
      return { status: "init" };
    case "loading":
      return { status: "loading" };
    case "error": {
      // TODO [error-handling] verify we rethrow or inform sentry. TBH why not here?
      console.error("Firestore request error", data.error);
      return { status: "error", error: data.error! };
    }
    case "success":
      return { status: "success", data: data.result! };
  }
};

export interface UseFirestoreOnceType<T> {
  data: AsyncData<T>;
  currentPromise: Promise<T> | null;
  refetch: () => Promise<T>;
}

/** Do a single query of a single document */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useFirestoreOnce = <R = unknown, Args extends any[] = any[]>(
  asyncFunction: (db: Firestore, ...args: Args) => Promise<R>,
  params: Args,
  opts?: UseAsyncOptionsNormalized<R>
): UseFirestoreOnceType<R> => {
  const db = useFirestore();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const asyncGet = useAsync(asyncFunction, [db, ...params], opts);

  return {
    data: adaptFromAsyncHook(asyncGet),
    currentPromise: asyncGet.currentPromise,
    refetch: () => asyncGet.execute(db, ...params),
  };
};

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
