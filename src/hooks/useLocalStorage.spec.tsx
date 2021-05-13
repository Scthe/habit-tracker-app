import "@testing-library/jest-dom";
import { renderHook } from "@testing-library/react-hooks";
import { act } from "react-dom/test-utils";

import { useLocalStorage } from "./useLocalStorage";

describe("useLocalStorage", () => {
  const initValue = { a: 1, b: 2 };

  test("return initial value", () => {
    const { result } = renderHook(() => useLocalStorage("my-key", initValue));

    const value = result.current[0];
    expect(value).toEqual(initValue);
  });

  test("should set new value", () => {
    const { result } = renderHook(() => useLocalStorage("my-key", initValue));

    act(() => {
      const setNext = result.current[1];
      setNext({ a: 1, b: 99 });
    });

    const value = result.current[0];
    expect(value).toEqual({ a: 1, b: 99 });
  });
});
