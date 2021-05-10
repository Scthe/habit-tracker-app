import { HabitStatus } from "../../_types";
import { habitActivityDoc } from "../references";
import {
  useFirestore,
  useFirestoreOnce,
  UseFirestoreOnceType,
} from "~firebaseUtils";
import { MonthOfYear } from "~utils";
import { useLoggedUser } from "~storage";

type Firestore = ReturnType<typeof useFirestore>;

const getAllStatuses = async (
  db: Firestore,
  userId: string,
  year: number,
  month: number
): Promise<HabitStatus[]> => {
  const docSnapshot = await habitActivityDoc(db, userId, { year, month }).get();
  const item = docSnapshot.data();
  return Object.values(item || {});
};

export const useGetHabitStatuses = ({
  month,
  year,
}: MonthOfYear): UseFirestoreOnceType<HabitStatus[]> => {
  const { uid } = useLoggedUser();
  return useFirestoreOnce(getAllStatuses, [uid, year, month]);
};
