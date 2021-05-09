import { useRef } from "react";

///////////////////
// IMPORTANT
// Suspense resets the hooks. You need to store data externally for it to work.
//   * https://stackoverflow.com/questions/54678618/react-suspended-component-doesnt-run-the-useeffect-hook
//   * https://github.com/facebook/react/issues/14563#issuecomment-453184356
// No, this is not a joke.
///////////////////

// TODO in suspense use class and just `myData = suspendableData.unpack()` that throws promise/error etc.
// TODO refactor this file

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

/*
// Suspense state.update(async1, async2),?
// It's the suspense state that triggers fetch, so set fetchoncreate to false

type DeconstructedPromise = ReturnType<typeof deconstructedPromise>;

// TODO remove 3 functions below
const asyncDataDone = (e: AsyncData<unknown>): boolean =>
e.status === "error" || e.status === "success";

const useSuspendTillAsyncFinished = createSuspendedPreloadHook<
AsyncData<unknown>
>((e) => e != null && asyncDataDone(e));

export function useSuspenseOnAsyncData<T>(asyncData: AsyncData<T>): T {
useSuspendTillAsyncFinished(asyncData);

if (asyncData.status === "error") {
  throw asyncData.error; // TODO fix me!
}
if (asyncData.status === "success") {
  return asyncData.data;
}
throw new Error(
  `Suspense on async data should be done by now, but status is '${asyncData.status}'`
);
}

const isStatusDone = (status: AsyncData<unknown>["status"]): boolean =>
status === "error" || status === "success";

export type SuspensableData<T> = [Promise<unknown>, null] | [null, T];

export function useSuspenseOnAsyncData2<T>(
asyncData: AsyncData<T>
): SuspensableData<T> {
console.log("useSuspenseOnAsyncData, asyncData:", asyncData)
const { status } = asyncData;
const promiseWrapper = useRef<null | DeconstructedPromise>(deconstructedPromise());

if (isStatusDone(status)) {
  promiseWrapper.current?.resolve();
  promiseWrapper.current == null;

  if (asyncData.status === "error") {
    throw asyncData.error;
  }
  if (asyncData.status === "success") {
    return [null, asyncData.data];
  }
}

if (promiseWrapper.current == null) {
  promiseWrapper.current = deconstructedPromise();
}
console.log("will throw for suspense: ", promiseWrapper.current.promise);
return [promiseWrapper.current.promise, null];
};
*/
