import sample from "lodash/sample";

export const createMock = <T>(defaultVal: T) => {
  return (override: Partial<T> = {}): T => ({
    ...defaultVal,
    ...override,
  });
};

export const getFromArray = <T>(arr: T[], idx: number): T => {
  if (arr.length === 0) {
    throw new Error(
      `getFromArray received array of length 0. How can I select something from this?`
    );
  }
  return arr[Math.abs(idx) % arr.length];
};

export const randomEnum = <T>(myEnum: T): T[keyof T] => {
  return sample(Object.values(myEnum)) as any;
};

export const getFromEnum = <T>(myEnum: T, idx: number): T[keyof T] => {
  const enumKeys = (Object.keys(myEnum).filter((n) =>
    Number.isNaN(Number.parseInt(n))
  ) as unknown) as T[keyof T][];
  const key = getFromArray(enumKeys, idx);
  return (myEnum as any)[key]; // return values
};
