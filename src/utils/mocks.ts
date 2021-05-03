import { getFromEnum } from "~utils";

export const createMock = <T>(defaultVal: T) => {
  return (override: Partial<T> = {}): T => ({
    ...defaultVal,
    ...override,
  });
};

export const randomEnum = <T>(myEnum: T): T[keyof T] => {
  const randIdx = Object.values(myEnum).length * Math.random();
  return getFromEnum(myEnum, Math.floor(randIdx));
};
