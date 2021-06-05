import { useCallback, useEffect, useState } from "react";

import { deconstructDateToMonth, MonthOfYear } from "utils/date";
import { logMonthEvent } from "firebaseUtils/analytics";

const ANALYTICS_EVENT = "details_month_seen";

export const useDetailsMonth = (): [MonthOfYear, (nm: MonthOfYear) => void] => {
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
