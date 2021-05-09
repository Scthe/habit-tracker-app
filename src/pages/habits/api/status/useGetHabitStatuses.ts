import { HabitStatus } from "../../_types";
import { MonthOfYear } from "~utils";
import { useLoggedUser } from "~storage";
import {
  useFirestore,
  useFirestoreOnce,
  UseFirestoreOnceType,
} from "~firebaseUtils";

/*
Use cases:
- agenda: (all habits, statuses for a single day)
- calendar: (all habits, statuses for a month)
- details:
  today status (one habit, statuses for a single day)
  monthly statuses for a single habitId (one habit, statuses for a month)
*/

type Firestore = ReturnType<typeof useFirestore>;

const getAllStatuses = async (
  db: Firestore,
  userId: string,
  year: number,
  month: number
): Promise<HabitStatus[]> => {
  const docSnapshot = await db
    .collection("user")
    .doc(userId)
    .collection("habit_activity")
    .doc(`${year}-${month}`)
    .get();

  if (!docSnapshot.exists) {
    return [];
  }

  const item = docSnapshot.data()!;
  return Object.values(item);
};

export const useGetHabitStatuses = ({
  month,
  year,
}: MonthOfYear): UseFirestoreOnceType<HabitStatus[]> => {
  const { uid } = useLoggedUser();
  return useFirestoreOnce(getAllStatuses, [uid, year, month]);
};
