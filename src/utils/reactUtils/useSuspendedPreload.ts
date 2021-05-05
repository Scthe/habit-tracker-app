import { useRef } from "react";

/** Promise and some easy way to resolve it. */
const deconstructedPromise = (): {
  promise: Promise<unknown>;
  resolve: () => void;
} => {
  let resolve_: undefined | ((x: unknown) => void);
  const promise = new Promise((res) => {
    resolve_ = res;
  });
  return {
    promise,
    resolve: () => {
      if (resolve_) {
        // silence 'used before' errors...
        resolve_(undefined);
        resolve_ = undefined;
      }
    },
  };
};

type IsDonePredFn<T> = (t: T) => boolean;

/**
 * Throws promise till You provide to the hook object that passes predicate.
 * This works ok with Suspense.
 */
export const createSuspendedPreloadHook = <T>(isDonePred: IsDonePredFn<T>) =>
  function (resp: T): void {
    const hasEverBeenDone = useRef(false);
    const isDoneNow = isDonePred(resp);
    hasEverBeenDone.current = hasEverBeenDone.current || isDoneNow;

    const promiseRef = useRef(deconstructedPromise());

    if (isDoneNow) {
      promiseRef.current.resolve();
    }
    if (!hasEverBeenDone.current) {
      throw promiseRef.current.promise;
    }
  };
