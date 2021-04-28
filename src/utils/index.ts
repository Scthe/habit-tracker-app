import { PickByValueType } from "~types";

export * from "./mocks";
export * from "./reactUtils";
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

export const stringifyNumber = (n: number) => {
  const special = [
    "zeroth",
    "first",
    "second",
    "third",
    "fourth",
    "fifth",
    "sixth",
    "seventh",
    "eighth",
    "ninth",
    "tenth",
    "eleventh",
    "twelfth",
    "thirteenth",
    "fourteenth",
    "fifteenth",
    "sixteenth",
    "seventeenth",
    "eighteenth",
    "nineteenth",
  ];
  const deca = [
    "twent",
    "thirt",
    "fort",
    "fift",
    "sixt",
    "sevent",
    "eight",
    "ninet",
  ];

  if (n < 0 || n >= 100) {
    throw new Error(
      `Invalid argument '${n}' was provided to 'stringifyNumber'. Expected: 0 <= n < 100`
    );
  }
  if (n < 20) {
    return special[n];
  }
  if (n % 10 === 0) {
    return deca[Math.floor(n / 10) - 2] + "ieth";
  }
  return deca[Math.floor(n / 10) - 2] + "y-" + special[n % 10];
};

export const assertUnreachable = (x: never): never => {
  throw new Error(`Didn't expect to get here with x: '${JSON.stringify(x)}'`);
};

type ValueExtractorFn<ObjType, RetType> = (obj: ObjType) => RetType;
export type ValueExtractor<ObjType, RetType> =
  | ValueExtractorFn<ObjType, RetType> // function (v: Value)=>RetType
  | keyof PickByValueType<ObjType, RetType>; // property name

/** Extract value from object. Can provide object's key as string or a function */
export const extractProperty = function <ObjType, RetType>(
  item: ObjType,
  keyExtractor: ValueExtractor<ObjType, RetType>
): RetType {
  const defaultExtractor = (e: ObjType) => (e as any)[keyExtractor];
  const keyExtractFn: ValueExtractor<ObjType, RetType> =
    typeof keyExtractor === "function" ? keyExtractor : defaultExtractor;
  return keyExtractFn(item);
};
