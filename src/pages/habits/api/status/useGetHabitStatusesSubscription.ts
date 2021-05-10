import { useEffect, useState } from "react";

import { HabitStatus } from "../../_types";
import { habitActivityDoc } from "../references";
import { AsyncData } from "~types";
import { MonthOfYear } from "~utils";
import { useLoggedUser } from "~storage";
import { FirestoreErrorHandler, useFirestore } from "~firebaseUtils";

// TODO use useFirestoreDocSubscription
export const useGetHabitStatusesSubscription = (
  { month, year }: MonthOfYear,
  onError?: FirestoreErrorHandler
): AsyncData<HabitStatus[]> => {
  const { uid } = useLoggedUser();
  const db = useFirestore();

  const [asyncData, setAsyncData] = useState<AsyncData<HabitStatus[]>>({
    status: "init",
  });

  useEffect(() => {
    // this works differently than one time request. "loading" happens only once at startup and will NEVER go came back
    setAsyncData({ status: "loading" });

    const unsubscribe = habitActivityDoc(db, uid, { year, month }).onSnapshot(
      (docSnapshot) => {
        const data = docSnapshot.data();
        setAsyncData({
          status: "success",
          data: Object.values(data || {}),
        });
      },
      (error) => {
        console.log("useGetHabitStatuses SUB err:", error);
        onError && onError(error);
        setAsyncData({ status: "error", error });
      }
    );

    return unsubscribe;
  }, [db, uid, year, month]);

  return asyncData;
};
