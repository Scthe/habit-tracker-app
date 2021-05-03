import { useEffect } from "react";
import create from "zustand";
import { CurrentActiveElement } from "../components/AppMenu/constants";

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
  useEffect(() => {
    if (itemId != null) {
      setActiveAppMenuItem(itemId);
    }
  }, [setActiveAppMenuItem, itemId]);
};
