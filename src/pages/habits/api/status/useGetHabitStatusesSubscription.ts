import { useCallback } from "react";

import { HabitStatus } from "../../_types";
import { habitMonthlyActivityDoc } from "../references";
import { AsyncData } from "~types";
import { MonthOfYear } from "~utils";
import { useLoggedUser } from "~storage";
import {
  FirestoreErrorHandler,
  useFirestoreDocSubscription,
} from "~firebaseUtils";

export const useGetHabitStatusesSubscription = (
  { month, year }: MonthOfYear,
  onError?: FirestoreErrorHandler
): AsyncData<HabitStatus[]> => {
  const { uid } = useLoggedUser();

  const createReference = useCallback(
    (db) => habitMonthlyActivityDoc(db, uid, { year, month }),
    [uid, year, month]
  );

  return useFirestoreDocSubscription(
    createReference,
    useCallback((data) => Object.values(data || {}), []),
    onError
  );
};
