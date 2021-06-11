import type firestoreNS from "firebase/firestore";
import {
  useAsyncCallback,
  UseAsyncOptionsNormalized,
  UseAsyncReturn,
} from "react-async-hook";

import { useFirestore } from "../useFirestore";
import { logApiError } from "utils/errorHandler";
import { useLatest } from "hooks/useLatest";

type Firestore = firestoreNS.FirebaseFirestore;

/** Do a create/edit of a single document */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useFirestoreWrite = <R = unknown, Args extends any[] = any[]>(
  asyncFunction: (db: Firestore, ...args: Args) => Promise<R>,
  opts?: UseAsyncOptionsNormalized<R>
): UseAsyncReturn<R, Args> => {
  const db = useFirestore();

  const implFmRef = useLatest(
    async (...args: Args): Promise<R> => {
      try {
        return asyncFunction(db, ...args);
      } catch (e) {
        logApiError(
          {
            name: asyncFunction.name,
            args: JSON.stringify(args),
            rw: "write",
          },
          e
        );
        throw e; // rethrow just in case
      }
    }
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useAsyncCallback<R, Args>(implFmRef.current, {
    ...opts,
    onError: (e, options) => {
      opts?.onError && opts?.onError(e, options);
    },
  });
};
