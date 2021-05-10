import { useEffect, useState } from "react";

import { Habit } from "../../_types";
import { habitsQueryRef } from "../references";
import { collectQueryResults, useFirestore } from "~firebaseUtils";
import { useLoggedUser } from "~storage";
import { AsyncData } from "~types";

export const useGetHabitsSubscription = (): AsyncData<Habit[]> => {
  const { uid } = useLoggedUser();
  const db = useFirestore();

  const [asyncData, setAsyncData] = useState<AsyncData<Habit[]>>({
    status: "init",
  });

  useEffect(() => {
    setAsyncData({ status: "loading" });

    const unsubscribe = habitsQueryRef(db, uid).onSnapshot(
      (querySnapshot) => {
        setAsyncData({
          status: "success",
          data: collectQueryResults(querySnapshot),
        });
      },
      (error) => {
        console.log("useGetHabitsSubscription SUB err:", error);
        setAsyncData({ status: "error", error });
      }
    );

    return unsubscribe;
  }, [db, uid]);

  console.log("useGetHabitsSubscription, asyncData:", asyncData);
  return asyncData;
};
