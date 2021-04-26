import { createMuiTheme, Theme } from "@material-ui/core/styles";
// import grey from '@material-ui/core/colors/grey';

const customTheme = {
  palette: {
    actionOnWhiteBg: {
      activable: "rgba(0, 0, 0, 0.54)", // palette.text.secondary
      hover: "rgba(0, 0, 0, 0.87)", // palette.text.primary
      selected: "#3f51b5", // palette.primary.main
    },
  },
};

export const activableOnWhiteBg = (theme: AppTheme) => ({
  color: theme.palette.actionOnWhiteBg.activable,
  cursor: "pointer",
  "&:hover": {
    color: theme.palette.actionOnWhiteBg.hover,
  },
});

export type AppTheme = Theme & typeof customTheme;

export default createMuiTheme(customTheme as any);
