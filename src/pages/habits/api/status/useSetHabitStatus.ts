import { useCallback } from "react";
import { useAsyncCallback, UseAsyncReturn } from "react-async-hook";
import { setDoc } from "firebase/firestore";

import { HabitStatus } from "../../_types";
import { habitMonthlyActivityDoc } from "../references";
import { CurrentUser, useLoggedUser } from "~storage";
import { useFirestore } from "firebaseUtils/useFirestore";

type SetHabitDoneArg = Omit<HabitStatus, "userId">;
type Firestore = ReturnType<typeof useFirestore>;

// semantic:
// habit_activity[userId, year-month, day-habitId] = DONE etc.

const setStatus = async (
  db: Firestore,
  data: SetHabitDoneArg,
  uid: CurrentUser["uid"]
) => {
  const nextStatus: HabitStatus = {
    ...data,
    userId: uid,
  };
  const day = nextStatus.day;
  const key = `${day.year}-${day.month}-${day.day}-${nextStatus.habitId}`;
  const ref = habitMonthlyActivityDoc(db, uid, data.day);

  await setDoc(ref, { [key]: nextStatus }, { merge: true });

  return nextStatus;
};

export const useSetHabitDone = (): UseAsyncReturn<
  HabitStatus,
  [SetHabitDoneArg]
> => {
  const { uid } = useLoggedUser();
  const db = useFirestore();

  const implFn = useCallback(
    (data: SetHabitDoneArg) => setStatus(db, data, uid),
    [db, uid]
  );

  return useAsyncCallback(implFn);
};

export type SetHabitDoneFn = ReturnType<typeof useSetHabitDone>["execute"];
