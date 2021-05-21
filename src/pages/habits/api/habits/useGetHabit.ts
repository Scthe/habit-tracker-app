import { getDoc } from "firebase/firestore";

import { Habit } from "../../_types";
import { habitDocRef } from "../references";
import {
  useFirestore,
  useFirestoreOnce,
  UseFirestoreOnceType,
} from "firebaseUtils/useFirestore";

type HabitId = Habit["id"];
type Firestore = ReturnType<typeof useFirestore>;

const getById = async (db: Firestore, id?: HabitId): Promise<Habit | null> => {
  if (id == null) {
    return null;
  }

  const docSnapshot = await getDoc(habitDocRef(db, id));
  if (!docSnapshot.exists) {
    return null;
  }
  return docSnapshot.data()!;
};

export const useGetHabit = (
  id: HabitId | undefined,
  errorOnNotFound = true
): UseFirestoreOnceType<Habit | null> => {
  const result = useFirestoreOnce(getById, [id]);

  const isFinishedButNoData =
    result.data.status === "success" && result.data.data == null;
  if (errorOnNotFound && isFinishedButNoData) {
    return {
      ...result,
      data: {
        status: "error",
        error: new Error(`No Habit with id='${id}' found`),
      },
    };
  }

  return result;
};
