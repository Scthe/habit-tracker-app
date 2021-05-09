export * from "./async";
export * from "./extractProperty";
export * from "./mocks";
export * from "./reactUtils";
export * from "./stringifyNumber";
export * from "./date";

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
export const sortStringCmpFn = (a: string, b: string): 1 | -1 | 0 => {
  const nameA = a.toUpperCase();
  const nameB = b.toUpperCase();
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }
  return 0;
};

export const pluralize1 = (
  num: number,
  text1: string,
  textMany: string
): string => (num === 1 ? text1 : textMany);

export const assertUnreachable = (x: never): never => {
  throw new Error(`Didn't expect to get here with x: '${JSON.stringify(x)}'`);
};

export const getFromArray = <T>(arr: T[], idx: number): T => {
  if (arr.length === 0) {
    throw new Error(
      `getFromArray received array of length 0. How can I select something from this?`
    );
  }
  return arr[Math.abs(idx) % arr.length];
};

type EnumKeys<T> = T[keyof T][];
/** Works both with `enum Color {Red, Blue}` and `enum Color {Red="red", Blue="blue"}` */
const getEnumKeys = <T>(myEnum: T): EnumKeys<T> => {
  const keys = Object.keys(myEnum).filter((n) =>
    Number.isNaN(Number.parseInt(n))
  );

  return (keys as unknown) as EnumKeys<T>;
};

export const getFromEnum = <T>(myEnum: T, idx: number): T[keyof T] => {
  const enumKeys = getEnumKeys(myEnum);

  const key = getFromArray(enumKeys, idx);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (myEnum as any)[key]; // return values
};

export const floorToDivisibleBy = (n: number, divisibleBy: number): number =>
  Math.floor(n / divisibleBy) * divisibleBy;
