import { darken, lighten, Theme } from "@material-ui/core/styles";
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
        today: p.primary.main,
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
            backgroundSecondary: darken("#f3f7fa", 0.2),
            color: "#212121",
          },
          {
            background: "#121212",
            backgroundSecondary: lighten("#121212", 0.3),
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
        flexDirection: "column" as const, // TODO or webkit-fill-available on phone?
        height: "100vh",
      },
    },
  };
};

// eslint-disable-next-line import/no-unused-modules
export type AppTheme = Theme & ReturnType<typeof customTheme>;
