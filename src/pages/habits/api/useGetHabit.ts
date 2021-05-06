import { useAsync } from "react-async-hook";

import { Habit } from "../_types";
import { adaptFromAsyncHook, habitConverter } from "./converters";
import { useFirestore } from "~firebaseUtils";

type HabitId = Habit["id"];
type Firestore = ReturnType<typeof useFirestore>;

const getById = async (db: Firestore, id: HabitId): Promise<Habit | null> => {
  console.log(`getByID '${id}'`);
  const docSnapshot = await db
    .collection("habits")
    .doc(id)
    .withConverter(habitConverter)
    .get();

  if (!docSnapshot.exists) {
    return null;
  }
  return docSnapshot.data()!;
};

export const useGetHabit = (id: HabitId) => {
  const db = useFirestore();
  const asyncGet = useAsync(getById, [db, id]);

  return {
    data: adaptFromAsyncHook(asyncGet),
    currentPromise: asyncGet.currentPromise,
    refetch: () => asyncGet.execute(db, id),
  };
};
