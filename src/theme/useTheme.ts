import { useCallback } from "react";
import create from "zustand";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import { useLocalStorage } from "../hooks/useLocalStorage";

export type ThemeColor = "light" | "dark";

export const oppositeThemeColor = (c: ThemeColor | undefined): ThemeColor =>
  c === "dark" ? "light" : "dark";

type ThemeColorStorage = {
  themeColor: ThemeColor | undefined;
  setThemeColor: (themeColor: ThemeColor) => void;
};

const useThemeColorStorage = create<ThemeColorStorage>((set) => ({
  themeColor: undefined,
  setThemeColor: (themeColor: ThemeColor) => set({ themeColor }),
}));

export const useTheme = (): [ThemeColor, () => void] => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)")
    ? "dark"
    : "light";

  const [
    locStorageThemeColor,
    setLocStorageThemeColor,
  ] = useLocalStorage<ThemeColor>("appTheme", prefersDarkMode);

  // eslint-disable-next-line prefer-const
  let { themeColor, setThemeColor } = useThemeColorStorage();
  if (themeColor == null) {
    themeColor = locStorageThemeColor;
    setThemeColor(themeColor);
  }

  const toggleTheme = useCallback(() => {
    const nextThemeColor = oppositeThemeColor(themeColor);
    setThemeColor(nextThemeColor);
    setLocStorageThemeColor(nextThemeColor);
  }, [themeColor, setThemeColor, setLocStorageThemeColor]);
  return [themeColor, toggleTheme];
};
