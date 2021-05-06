import { useAsync } from "react-async-hook";

import { Habit } from "../_types";
import { adaptFromAsyncHook, habitConverter } from "./converters";
import { useFirestore } from "~firebaseUtils";
import { useLoggedUser } from "~storage";

// TODO or have a backgorund/context-like realtime subscription for current habits?
// TODO use collectionGroup(habit_activity) query to get all activity across user's habits. Add composite index

type Firestore = ReturnType<typeof useFirestore>;

const getAll = async (db: Firestore, userId: string): Promise<Habit[]> => {
  try {
    const querySnapshot = await db
      .collection("habits")
      .where("userId", "==", userId)
      .orderBy("name", "desc")
      .withConverter(habitConverter)
      .get();

    const results: Habit[] = [];
    querySnapshot.forEach((doc) => {
      results.push(doc.data());
    });
    return results;
  } catch (e) {
    console.error("Error in getAll");
    console.log(e);
    throw e;
  }
};

export const useGetHabits = () => {
  const db = useFirestore();
  const { uid } = useLoggedUser();
  const asyncGet = useAsync(getAll, [db, uid]);

  return {
    data: adaptFromAsyncHook(asyncGet),
    currentPromise: asyncGet.currentPromise,
    refetch: () => asyncGet.execute(db, uid),
  };
};
