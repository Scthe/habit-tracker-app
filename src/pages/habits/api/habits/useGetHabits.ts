import { getDocs } from "firebase/firestore";
import type firestoreNS from "firebase/firestore";

import { Habit } from "../../_types";
import { userHabitsQueryRef } from "../references";
import { collectQueryResults } from "firebaseUtils/useFirestore";
import {
  useFirestoreOnce,
  UseFirestoreOnceType,
} from "firebaseUtils/firestore/useFirestoreOnce";
import { useLoggedUser } from "~storage";

const getAll = async (
  db: firestoreNS.FirebaseFirestore,
  userId: string
): Promise<Habit[]> => {
  const q = userHabitsQueryRef(db, userId);
  const querySnapshot = await getDocs(q);
  return collectQueryResults(querySnapshot);
};

export const useGetHabits = (): UseFirestoreOnceType<Habit[]> => {
  const { uid } = useLoggedUser();
  return useFirestoreOnce(getAll, [uid]);
};
