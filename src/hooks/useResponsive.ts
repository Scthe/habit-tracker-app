import useMediaQuery from "@material-ui/core/useMediaQuery";

// Could use https://material-ui.com/customization/breakpoints/ ,

// but let's have nicer hook API
export const useResponsive = (): "desktop" | "laptop" | "tablet" | "phone" => {
  const mq = (width: number): Parameters<typeof useMediaQuery> => [
    `(min-width:${width}px)`,
    {
      defaultMatches: document.body.clientWidth >= width,
    },
  ];

  const desktop = useMediaQuery(...mq(1440));
  const laptop = useMediaQuery(...mq(1265));
  const tablet = useMediaQuery(...mq(800));

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
