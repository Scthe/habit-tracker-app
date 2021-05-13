import { useRef } from "react";

///////////////////
// IMPORTANT
// Suspense resets the hooks. You need to store data externally for it to work.
//   * https://stackoverflow.com/questions/54678618/react-suspended-component-doesnt-run-the-useeffect-hook
//   * https://github.com/facebook/react/issues/14563#issuecomment-453184356
//   * https://charles-stover.medium.com/react-suspense-with-the-fetch-api-a1b7369b0469
// No, this is not a joke.
///////////////////

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
