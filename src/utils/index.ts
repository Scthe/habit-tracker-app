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
