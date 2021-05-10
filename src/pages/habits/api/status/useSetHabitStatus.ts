import { useCallback } from "react";
import { useAsyncCallback, UseAsyncReturn } from "react-async-hook";
import { HabitStatus } from "../../_types";
import { habitActivityDoc } from "../references";
import { CurrentUser, useLoggedUser } from "~storage";
import { useFirestore } from "~firebaseUtils";

type SetHabitDoneArg = Omit<HabitStatus, "userId">;
type Firestore = ReturnType<typeof useFirestore>;

// semantic:
// habit_activity[userId, year-month, habitId] = DONE etc.

const setStatus = async (
  db: Firestore,
  data: SetHabitDoneArg,
  uid: CurrentUser["uid"]
) => {
  const nextStatus: HabitStatus = {
    ...data,
    userId: uid,
  };
  await habitActivityDoc(db, uid, data.day).set(
    {
      [nextStatus.habitId]: nextStatus,
    },
    { merge: true }
  );

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
