import { createMuiTheme, Theme } from "@material-ui/core/styles";
// import grey from '@material-ui/core/colors/grey';

// TODO define all colors here
const customTheme = {
  palette: {},
  mixins: {
    overflow: {
      textOverflow: "ellipsis" as const,
      overflow: "hidden" as const,
      whiteSpace: "nowrap" as const,
    },
  },
};

export type AppTheme = Theme & typeof customTheme;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default createMuiTheme(customTheme as any);
