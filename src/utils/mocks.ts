import sample from "lodash/sample";

export const createMock = <T>(defaultVal: T) => {
  return (override: Partial<T> = {}): T => ({
    ...defaultVal,
    ...override,
  });
};

export const randomEnum = <T>(myEnum: T): T[keyof T] => {
  return sample(Object.values(myEnum)) as any;
};
