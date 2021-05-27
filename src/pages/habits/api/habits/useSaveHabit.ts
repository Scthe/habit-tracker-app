import { useCallback } from "react";
import { addDoc, Timestamp, updateDoc } from "firebase/firestore";
import type firestoreNS from "firebase/firestore";
import omit from "lodash/omit";

import { Habit } from "../../_types";
import { FormValues } from "../../fragments/form/useFormInitValues";
import { createRepeatHistoryKey } from "../converters";
import { habitDocRef, habitsCollectionRef } from "../references";
import { useFirestore } from "firebaseUtils/useFirestore";
import { CurrentUser, useLoggedUser } from "~storage";

type HabitId = Habit["id"];

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
  return doc.id;
};

const editHabit = async (
  db: firestoreNS.FirebaseFirestore,
  id: HabitId,
  values: FormValues
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
