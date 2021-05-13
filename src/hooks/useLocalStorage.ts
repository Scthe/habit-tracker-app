import { useCallback, useState } from "react";

export const useLocalStorage = <T>(
  key: string,
  initialValue: T
): [T, (v: T) => void] => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: T) => {
      try {
        setStoredValue(value);
        window.localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {} // eslint-disable-line no-empty
    },
    [key]
  );

  return [storedValue, setValue];
};
