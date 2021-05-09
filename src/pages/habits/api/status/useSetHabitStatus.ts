import { useCallback } from "react";
import { useAsyncCallback, UseAsyncReturn } from "react-async-hook";
import { HabitStatus } from "../../_types";
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
  console.log("Set habit status", nextStatus);

  await db
    .collection("user")
    .doc(uid)
    .collection("habit_activity")
    .doc(`${data.day.year}-${data.day.month}`)
    .set(
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

  // TODO how to refetch after? Intercept the "execute" and add '.then()'?  Rely on live reload?
  const implFn = useCallback(
    (data: SetHabitDoneArg) => {
      return setStatus(db, data, uid);
    },
    [db, uid]
  );

  return useAsyncCallback(implFn);
};

export type SetHabitDoneFn = ReturnType<typeof useSetHabitDone>["execute"];
