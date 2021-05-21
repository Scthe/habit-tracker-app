import { useResponsive } from "hooks/useResponsive";

export type AppMenuVariant =
  | "temporary"
  | "permanent-small"
  | "permanent-large";

const getResponsiveSize = (
  responsiveSize: ReturnType<typeof useResponsive>
): AppMenuVariant => {
  switch (responsiveSize) {
    case "phone":
      return "temporary";
    case "tablet":
      return "permanent-small";
    case "laptop":
    case "desktop":
      return "permanent-large";
  }
};

export const useAppMenuVariant = (): AppMenuVariant => {
  const responsiveSize = useResponsive();
  return getResponsiveSize(responsiveSize);
};
