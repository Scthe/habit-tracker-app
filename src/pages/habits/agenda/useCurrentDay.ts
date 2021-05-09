import { useCallback, useState } from "react";
import get from "lodash/get";
import { useLocation } from "react-router-dom";

import { DayOfYear, deconstructDate, isSameDay } from "~utils";

export const useCurrentDay = (): [DayOfYear, (d: DayOfYear) => void] => {
  const location = useLocation();
  const initDate: DayOfYear = get(
    location,
    "state.day",
    deconstructDate(new Date())
  );

  const [currentDay, setCurrentDayRAW] = useState<DayOfYear>(initDate);

  const setCurrentDay = useCallback(
    (d: DayOfYear) => {
      if (!isSameDay(d, currentDay)) {
        setCurrentDayRAW(d);
      }
    },
    [currentDay]
  );

  return [currentDay, setCurrentDay];
};
