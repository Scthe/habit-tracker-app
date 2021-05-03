import { createMuiTheme, Theme } from "@material-ui/core/styles";
// import grey from '@material-ui/core/colors/grey';

// TODO define all colors here
const customTheme = {
  palette: {
    actionOnWhiteBg: {
      activable: "rgba(0, 0, 0, 0.54)", // palette.text.secondary
      hover: "rgba(0, 0, 0, 0.87)", // palette.text.primary
      selected: "#3f51b5", // palette.primary.main
    },
  },
};

// TODO remove?
export const activableOnWhiteBg = (theme: AppTheme) => ({
  color: theme.palette.actionOnWhiteBg.activable,
  cursor: "pointer",
  "&:hover": {
    color: theme.palette.actionOnWhiteBg.hover,
  },
});

export type AppTheme = Theme & typeof customTheme;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default createMuiTheme(customTheme as any);
