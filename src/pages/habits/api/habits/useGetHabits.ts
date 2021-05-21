import { Habit } from "../../_types";
import { userHabitsQueryRef } from "../references";
import {
  collectQueryResults,
  useFirestore,
  useFirestoreOnce,
  UseFirestoreOnceType,
} from "~firebaseUtils";
import { useLoggedUser } from "~storage";
import { getDocs } from "firebase/firestore";

type Firestore = ReturnType<typeof useFirestore>;

const getAll = async (db: Firestore, userId: string): Promise<Habit[]> => {
  const q = userHabitsQueryRef(db, userId);
  const querySnapshot = await getDocs(q);
  return collectQueryResults(querySnapshot);
};

export const useGetHabits = (): UseFirestoreOnceType<Habit[]> => {
  const { uid } = useLoggedUser();
  return useFirestoreOnce(getAll, [uid]);
};
