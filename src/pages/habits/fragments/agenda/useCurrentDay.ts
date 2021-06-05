import { useCallback, useEffect, useState } from "react";
import get from "lodash/get";
import { useLocation } from "react-router-dom";

import { DayOfYear, deconstructDate, isSameDay } from "utils/date";
import { logDayEvent } from "firebaseUtils/analytics";

const ANALYTICS_EVENT = "agenda_day_seen";

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
        logDayEvent(ANALYTICS_EVENT, d);
        setCurrentDayRAW(d);
      }
    },
    [currentDay]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => logDayEvent(ANALYTICS_EVENT, currentDay), []);

  return [currentDay, setCurrentDay];
};
