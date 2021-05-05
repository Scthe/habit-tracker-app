interface AsyncDataSuccess<T> {
  status: "success";
  data: T;
}
interface AsyncDataError {
  status: "error";
  message: string;
}
interface AsyncDataLoading {
  status: "loading";
}
interface AsyncDataInit {
  status: "init";
}

export type AsyncData<T> =
  | AsyncDataSuccess<T>
  | AsyncDataError
  | AsyncDataLoading
  | AsyncDataInit;

/** Filter object properties by value type */
export type PickByValueType<T, ValueType> = {
  [k in keyof T as T[k] extends ValueType ? k : never]: T[k];
};

declare global {
  const NODE_ENV: string;
}
