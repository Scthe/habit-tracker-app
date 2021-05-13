import useMediaQuery from "@material-ui/core/useMediaQuery";

// Could use https://material-ui.com/customization/breakpoints/ ,

// but let's have nicer hook API
export const useResponsive = (): "desktop" | "laptop" | "tablet" | "phone" => {
  const desktop = useMediaQuery("(min-width:1440px)");
  const laptop = useMediaQuery("(min-width:1265px)");
  const tablet = useMediaQuery("(min-width:800px)");

  if (desktop) {
    return "desktop";
  }
  if (laptop) {
    return "laptop";
  }
  if (tablet) {
    return "tablet";
  }

  return "phone";
};

export type ResponsiveSize = ReturnType<typeof useResponsive>;

export const useDesktopLayout = (): boolean => {
  const resp = useResponsive();
  return resp !== "phone";
};
