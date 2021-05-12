import { useEffect } from "react";
import create from "zustand";

import { CurrentActiveElement } from "../components/AppMenu/constants";
import { useHideDrawer } from "~components";

type ActiveAppMenuStorage = {
  activeItemId?: CurrentActiveElement;
  setActiveItem: (activeItemId: CurrentActiveElement) => void;
};

const useActiveAppMenuStorage = create<ActiveAppMenuStorage>((set) => ({
  activeItemId: undefined, // prevent preselected item on refresh
  setActiveItem: (activeItemId: CurrentActiveElement) => set({ activeItemId }),
}));

export const useAppMenuActiveLink = (): ActiveAppMenuStorage["activeItemId"] => {
  return useActiveAppMenuStorage((s) => s.activeItemId);
};

export const useSetAppMenuActiveLink = (
  itemId?: ActiveAppMenuStorage["activeItemId"]
): void => {
  const setActiveAppMenuItem = useActiveAppMenuStorage((s) => s.setActiveItem);
  const hideDrawer = useHideDrawer();

  useEffect(() => {
    if (itemId != null) {
      setActiveAppMenuItem(itemId);
      hideDrawer();
    }
  }, [setActiveAppMenuItem, hideDrawer, itemId]);
};
