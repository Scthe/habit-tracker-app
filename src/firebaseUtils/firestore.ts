import firebase from "firebase/app";
import { useEffect, useState } from "react";
import {
  AsyncState,
  useAsync,
  UseAsyncOptionsNormalized,
} from "react-async-hook";
import { useFirestore } from "~firebaseUtils";

import { AsyncData } from "~types";

type Firestore = ReturnType<typeof useFirestore>;
type QuerySnapshot<T> = firebase.firestore.QuerySnapshot<T>;
type DocumentReference<T> = firebase.firestore.DocumentReference<T>;

export type FirestoreErrorHandler = (
  err: firebase.firestore.FirestoreError
) => void;

const adaptFromAsyncHook = <T>(data: AsyncState<T>): AsyncData<T> => {
  switch (data.status) {
    case "not-requested":
      return { status: "init" };
    case "loading":
      return { status: "loading" };
    case "error": {
      // TODO verify we rethrow or inform sentry. TBH why not here?
      console.error("Async request error", data.error);
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

export const useFirestoreDocSubscription = <R = unknown, U = unknown>(
  createReference: (db: Firestore) => DocumentReference<R>,
  mapper: (item: R | undefined) => U,
  onError?: FirestoreErrorHandler,
  opts: firebase.firestore.SnapshotListenOptions = {}
): AsyncData<U> => {
  const db = useFirestore();

  const [asyncData, setAsyncData] = useState<AsyncData<U>>({ status: "init" });

  useEffect(() => {
    // this works differently than one time request. "loading" happens only once at startup and will NEVER go came back
    setAsyncData({ status: "loading" });

    const unsubscribe = createReference(db).onSnapshot(
      opts,
      (docSnapshot) => {
        const data = docSnapshot.data();
        setAsyncData({
          status: "success",
          data: mapper(data),
        });
      },
      (error) => {
        // TODO show alert "Error synchronizing data"
        onError && onError(error);
        setAsyncData({ status: "error", error });
      }
    );

    return unsubscribe;
  }, [db, createReference]);

  return asyncData;
};

export const collectQueryResults = <T>(
  querySnapshot: QuerySnapshot<T>
): T[] => {
  const results: T[] = [];
  querySnapshot.forEach((doc) => {
    results.push(doc.data());
  });
  return results;
};
