import { AsyncData } from "~types";

type MaybeAsyncData<T> = AsyncData<T> | undefined;
type AsyncItems<T, P, R> = [
  MaybeAsyncData<T>,
  MaybeAsyncData<P>,
  MaybeAsyncData<R>
];

export const combineAsyncData = <Result, T, P = unknown, R = unknown>(
  mapper: (r0: T, r1: P, r2: R) => Result,
  ad0: AsyncData<T>,
  ad1?: AsyncData<P>,
  ad2?: AsyncData<R>
): AsyncData<Result> => {
  const asyncItems: AsyncItems<T, P, R> = [ad0, ad1, ad2];
  const findByStatus = (status: AsyncData<unknown>["status"]) =>
    asyncItems.find((ad) => ad != null && ad.status === status);

  const initItem = findByStatus("init");
  const loadingItem = findByStatus("loading");
  const errorItem = findByStatus("error");

  if (initItem != null) {
    return { status: "init" };
  }
  if (loadingItem != null) {
    return { status: "loading" };
  }
  if (errorItem != null && errorItem.status === "error") {
    // 2nd part of and is for typecheck..
    return { status: "error", error: errorItem.error };
  }

  const resultItems: [T, P, R] = asyncItems.map(
    (item) => (item?.status === "success" ? item.data : undefined)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ) as any;
  return {
    status: "success",
    data: mapper(...resultItems),
  };
};
