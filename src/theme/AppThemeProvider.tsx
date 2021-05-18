import React, { useMemo } from "react";
import merge from "lodash/merge";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/core/styles";

import { customTheme } from "./config";
import { ThemeColor, useTheme } from "./useTheme";

const themeLight = createMuiTheme({
  palette: { type: "light" },
});
const themeDark = createMuiTheme({
  palette: { type: "dark" },
});

const createThemeOpts = (themeColor: ThemeColor) => {
  return merge(
    {
      palette: {
        type: themeColor,
      },
    },
    customTheme(themeColor, themeColor === "dark" ? themeDark : themeLight)
  );
};

export const AppThemeProvider: React.FC = ({ children }) => {
  const [themeColor] = useTheme();

  const theme = useMemo(() => {
    const themeOpts = createThemeOpts(themeColor);
    document.body.style.background = themeOpts.palette.app.body.background;
    document.body.style.color = themeOpts.palette.app.body.color;
    setMetaTheme(themeOpts.palette.primary.main);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return createMuiTheme(themeOpts as any);
  }, [themeColor]);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

function setMetaTheme(colorHex: string) {
  let el = document.querySelector('meta[name="theme-color"]');
  if (el == null) {
    el = document.createElement("meta");
    el.setAttribute("name", "theme-color");
    document.head.appendChild(el);
  }
  el.setAttribute("content", colorHex);
}
