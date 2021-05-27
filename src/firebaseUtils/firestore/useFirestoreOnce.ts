import type firestoreNS from "firebase/firestore";
import {
  AsyncState,
  useAsync,
  UseAsyncOptionsNormalized,
} from "react-async-hook";

import { useFirestore } from "../useFirestore";
import { AsyncData } from "~types";

type Firestore = firestoreNS.FirebaseFirestore;

const adaptFromAsyncHook = <T>(data: AsyncState<T>): AsyncData<T> => {
  switch (data.status) {
    case "not-requested":
      return { status: "init" };
    case "loading":
      return { status: "loading" };
    case "error": {
      // TODO [error] verify we rethrow or inform sentry. TBH why not here?
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
