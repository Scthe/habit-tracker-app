import { lighten, Theme } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import { ThemeColor } from "./useTheme";

export const byThemeColor = <T>(theme: AppTheme, lightT: T, darkT: T): T =>
  theme.themeColor === "dark" ? darkT : lightT;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const customTheme = (themeColor: ThemeColor, theme: Theme) => {
  const byThemeColor = <T>(lightT: T, darkT: T): T =>
    themeColor === "dark" ? darkT : lightT;

  const p = theme.palette;
  const white = theme.palette.common.white;

  return {
    themeColor,
    palette: {
      primary: {
        // lighter than default, better contrast on dark theme (still quite bad tho)
        main: byThemeColor(p.primary.main, lighten(p.primary.main, 0.1)),
      },
      alerts: {
        error: {
          background: p.error.main,
          color: white,
        },
        warning: {
          background: p.warning.main,
          color: white,
        },
        info: {
          background: p.info.main,
          color: white,
        },
        success: {
          background: p.success.main,
          color: white,
        },
      },
      app: {
        fullPageMessage: {
          color: p.text.disabled,
        },
        habits: {
          done: green[500],
          notDone: p.error.main,
        },
        body: byThemeColor(
          {
            background: "#f3f7fa",
            color: "#212121",
          },
          {
            background: "#121212",
            color: "white",
          }
        ),
      },
    },
    mixins: {
      overflow: {
        textOverflow: "ellipsis" as const,
        overflow: "hidden" as const,
        whiteSpace: "nowrap" as const,
      },
      viewFragment: {
        display: "flex" as const,
        flexDirection: "column" as const, // or webkit-fill-available?
        height: "100vh",
      },
    },
  };
};

// eslint-disable-next-line import/no-unused-modules
export type AppTheme = Theme & ReturnType<typeof customTheme>;
