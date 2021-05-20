import { makeStyles } from "@material-ui/core/styles";
import { useDesktopLayout } from "./useResponsive";

const useStyles = makeStyles(() => ({
  desktopRoot: {
    alignItems: "center",
  },
  desktopChild: {
    maxWidth: "500px",
    minWidth: "50%",
  },
}));

export const useSingleColumnLayoutStyles = (): {
  root: string;
  child: string;
} => {
  const styles = useStyles();
  const isDesktop = useDesktopLayout();
  return isDesktop
    ? {
        root: styles.desktopRoot,
        child: styles.desktopChild,
      }
    : {
        root: "",
        child: "",
      };
};
