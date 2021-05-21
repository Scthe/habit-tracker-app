import { useCallback } from "react";
import { addDoc, Timestamp, updateDoc } from "firebase/firestore";

import { Habit } from "../../_types";
import { FormValues } from "../../fragments/form/useFormInitValues";
import { habitDocRef, habitsCollectionRef } from "../references";
import { Firestore, useFirestore } from "firebaseUtils/useFirestore";
import { CurrentUser, useLoggedUser } from "~storage";

type HabitId = Habit["id"];

export type SaveHabitFn = (values: FormValues) => Promise<HabitId>;

const createHabit = async (
  db: Firestore,
  values: FormValues,
  userId: CurrentUser["uid"]
): Promise<HabitId> => {
  const now = new Date();
  const collectionRef = habitsCollectionRef(db);
  const doc = await addDoc(collectionRef, {
    ...values,
    createdAt: Timestamp.fromDate(now),
    editedAt: Timestamp.fromDate(now),
    userId,
  });
  return doc.id;
};

const editHabit = async (
  db: Firestore,
  id: HabitId,
  values: FormValues
): Promise<HabitId> => {
  const now = new Date();
  const ref = habitDocRef(db, id);
  await updateDoc(ref, {
    ...values,
    editedAt: Timestamp.fromDate(now),
    // preserve `createdAt` and userId
  });
  return id;
};

export const useSaveHabit = (id: HabitId | undefined): SaveHabitFn => {
  const db = useFirestore();
  const { uid } = useLoggedUser();

  return useCallback(
    (values): Promise<HabitId> => {
      if (id == null) {
        return createHabit(db, values, uid);
      } else {
        return editHabit(db, id, values);
      }
    },
    [db, id, uid]
  );
};
