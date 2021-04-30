import { useState } from "react";
import get from "lodash/get";
import isSameDay from "date-fns/isSameDay";
import { useLocation } from "react-router-dom";

import { zeroeTime } from "~utils";

export const useCurrentDay = (): [Date, (d: Date) => void] => {
  const location = useLocation();
  const initCurrentDay = get(location, "state.day", new Date());

  const [currentDay, setCurrentDayRAW] = useState(zeroeTime(initCurrentDay));

  const setCurrentDay = (d: Date) => {
    if (!isSameDay(d, currentDay)) {
      setCurrentDayRAW(zeroeTime(d));
    }
  };

  return [currentDay, setCurrentDay];
};
