import { createMuiTheme, Theme } from "@material-ui/core/styles";

// TODO define all colors here
const customTheme = {
  palette: {},
  mixins: {
    overflow: {
      textOverflow: "ellipsis" as const,
      overflow: "hidden" as const,
      whiteSpace: "nowrap" as const,
    },
    viewFragment: {
      display: "flex" as const,
      flexDirection: "column" as const, // or webkit-fill-available on phone?
    },
  },
};

export type AppTheme = Theme & typeof customTheme;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default createMuiTheme(customTheme as any);
