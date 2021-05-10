import { Habit } from "../../_types";
import { habitsQueryRef } from "../references";
import {
  collectQueryResults,
  useFirestore,
  useFirestoreOnce,
  UseFirestoreOnceType,
} from "~firebaseUtils";
import { useLoggedUser } from "~storage";

type Firestore = ReturnType<typeof useFirestore>;

const getAll = async (db: Firestore, userId: string): Promise<Habit[]> => {
  const querySnapshot = await habitsQueryRef(db, userId)
    .orderBy("name", "desc")
    .get();
  return collectQueryResults(querySnapshot);
};

export const useGetHabits = (): UseFirestoreOnceType<Habit[]> => {
  const { uid } = useLoggedUser();
  return useFirestoreOnce(getAll, [uid]);
};
