import { useCallback } from "react";
import { addDoc, Timestamp, updateDoc } from "firebase/firestore";
import type firestoreNS from "firebase/firestore";
import { UseAsyncReturn } from "react-async-hook";
import omit from "lodash/omit";

import { Habit } from "../../_types";
import { FormValues } from "../../fragments/form/useFormInitValues";
import { createRepeatHistoryKey } from "../converters";
import { habitDocRef, habitsCollectionRef } from "../references";
import { useFirestore } from "firebaseUtils/useFirestore";
import { CurrentUser, useLoggedUser } from "~storage";
import { logSimpleEvent } from "firebaseUtils/analytics";
import { useFirestoreWrite } from "firebaseUtils/firestore/useFirestoreWrite";

type HabitId = Habit["id"];

type Firestore = ReturnType<typeof useFirestore>;
type DocReference<T> = firestoreNS.DocumentReference<T>;
export type SaveHabitFn = (values: FormValues) => Promise<HabitId>;

const createHabit = async (
  db: firestoreNS.FirebaseFirestore,
  values: FormValues,
  userId: CurrentUser["uid"]
): Promise<HabitId> => {
  const now = new Date();
  const repeatKey = createRepeatHistoryKey(now);
  const collectionRef = habitsCollectionRef(db);

  const doc = await addDoc(collectionRef, {
    ...omit(values, "repeat"),
    createdAt: Timestamp.fromDate(now),
    editedAt: Timestamp.fromDate(now),
    repeat: { [repeatKey]: values.repeat },
    userId,
  });

  logSimpleEvent("habit_created", { userId, repeat: values.repeat.type });
  return doc.id;
};

const editHabit = async (
  db: firestoreNS.FirebaseFirestore,
  id: HabitId,
  values: FormValues,
  userId: CurrentUser["uid"]
): Promise<HabitId> => {
  const now = new Date();
  const repeatKey = createRepeatHistoryKey(now);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref: DocReference<any> = habitDocRef(db, id);

  await updateDoc(ref, {
    ...omit(values, "repeat"),
    editedAt: Timestamp.fromDate(now),
    [`repeat.${repeatKey}`]: values.repeat, // partial object update
    // preserve `createdAt` and userId
  });

  logSimpleEvent("habit_edited", { userId, repeat: values.repeat.type });
  return id;
};

export const useSaveHabit = (
  id: HabitId | undefined
): UseAsyncReturn<HabitId, [FormValues]> => {
  const { uid } = useLoggedUser();
  const implFn = useCallback(
    (db: Firestore, values: FormValues) => {
      if (id == null) {
        return createHabit(db, values, uid);
      } else {
        return editHabit(db, id, values, uid);
      }
    },
    [id, uid]
  );
  return useFirestoreWrite(implFn);
};
