import { Habit } from "../../_types";
import { habitConverter } from "../converters";
import {
  collectQueryResults,
  useFirestore,
  useFirestoreOnce,
  UseFirestoreOnceType,
} from "~firebaseUtils";
import { useLoggedUser } from "~storage";

// TODO or have a backgorund/context-like realtime subscription for current habits?

type Firestore = ReturnType<typeof useFirestore>;

const getAll = async (db: Firestore, userId: string): Promise<Habit[]> => {
  const querySnapshot = await db
    .collection("habits")
    .where("userId", "==", userId)
    .orderBy("name", "desc")
    .withConverter(habitConverter)
    .get();
  return collectQueryResults(querySnapshot);
};

export const useGetHabits = (): UseFirestoreOnceType<Habit[]> => {
  const { uid } = useLoggedUser();
  return useFirestoreOnce(getAll, [uid]);
};
