import { Habit } from "../../_types";
import { habitDocRefWithConverter } from "../references";
import {
  useFirestore,
  useFirestoreOnce,
  UseFirestoreOnceType,
} from "~firebaseUtils";

type HabitId = Habit["id"];
type Firestore = ReturnType<typeof useFirestore>;

const getById = async (db: Firestore, id?: HabitId): Promise<Habit | null> => {
  if (id == null) {
    return null;
  }

  const docSnapshot = await habitDocRefWithConverter(db, id).get();
  if (!docSnapshot.exists) {
    return null;
  }
  return docSnapshot.data()!;
};

export const useGetHabit = (
  id: HabitId | undefined
): UseFirestoreOnceType<Habit | null> => {
  return useFirestoreOnce(getById, [id]);
};
