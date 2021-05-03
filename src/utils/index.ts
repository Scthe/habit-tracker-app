export * from "./extractProperty";
export * from "./mocks";
export * from "./reactUtils";
export * from "./stringifyNumber";
export * from "./time";

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

export const pluralize1 = (num: number, text1: string, textMany: string) =>
  num === 1 ? text1 : textMany;

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

export const getFromEnum = <T>(myEnum: T, idx: number): T[keyof T] => {
  const enumKeys = (Object.keys(myEnum).filter((n) =>
    Number.isNaN(Number.parseInt(n))
  ) as unknown) as T[keyof T][];
  const key = getFromArray(enumKeys, idx);
  return (myEnum as any)[key]; // return values
};

export const floorToDivisibleBy = (n: number, divisibleBy: number) =>
  Math.floor(n / divisibleBy) * divisibleBy;
