import firebase from "firebase/app";
import { useCallback } from "react";

import { Habit } from "../_types";
import { FormValues } from "../form/useFormInitValues";
import { useFirestore } from "~firebaseUtils";
import { CurrentUser, useLoggedUser } from "~storage";

type HabitId = Habit["id"];
type Firestore = ReturnType<typeof useFirestore>;

export type SaveHabitFn = (values: FormValues) => Promise<HabitId>;

const createHabit = async (
  db: Firestore,
  values: FormValues,
  userId: CurrentUser["uid"]
): Promise<HabitId> => {
  console.log("CREATE", values);
  const now = new Date();
  const doc = await db.collection("habits").add({
    ...values,
    createdAt: firebase.firestore.Timestamp.fromDate(now),
    editedAt: firebase.firestore.Timestamp.fromDate(now),
    userId,
  });
  return doc.id;
};

const editHabit = async (
  db: Firestore,
  id: HabitId,
  values: FormValues
): Promise<HabitId> => {
  console.log(`EDIT '${id}'`, values);
  const now = new Date();
  await db
    .collection("habits")
    .doc(id)
    .update({
      ...values,
      editedAt: firebase.firestore.Timestamp.fromDate(now),
      // preserve `createdAt` and userId
    });
  return id;
};

export const useSaveHabit = (id: HabitId | undefined): SaveHabitFn => {
  const db = useFirestore();
  const { uid } = useLoggedUser();

  return useCallback(
    (values): Promise<HabitId> => {
      console.log("SUBMIT", { id, values });
      if (id == null) {
        return createHabit(db, values, uid);
      } else {
        return editHabit(db, id, values);
      }
    },
    [db, id, uid]
  );
};
