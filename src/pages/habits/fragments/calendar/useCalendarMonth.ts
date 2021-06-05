import { useCallback, useEffect, useState } from "react";

import { logMonthEvent } from "firebaseUtils/analytics";
import { deconstructDateToMonth, MonthOfYear } from "utils/date";

const ANALYTICS_EVENT = "calendar_month_seen";

export const useCalendarMonth = (): [
  MonthOfYear,
  (nm: MonthOfYear) => void
] => {
  const [shownMonth, setShownMonthRAW] = useState(
    deconstructDateToMonth(new Date())
  );

  const setShownMonth = useCallback(
    (nextMonth: MonthOfYear) => {
      logMonthEvent(ANALYTICS_EVENT, nextMonth);
      setShownMonthRAW(nextMonth);
    },
    [setShownMonthRAW]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => logMonthEvent(ANALYTICS_EVENT, shownMonth), []);

  return [shownMonth, setShownMonth];
};
