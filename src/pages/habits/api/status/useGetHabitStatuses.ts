import { getDoc } from "firebase/firestore";

import { HabitStatus } from "../../_types";
import { habitMonthlyActivityDoc } from "../references";
import {
  useFirestore,
  useFirestoreOnce,
  UseFirestoreOnceType,
} from "firebaseUtils/useFirestore";
import { MonthOfYear } from "~utils";
import { useLoggedUser } from "~storage";

type Firestore = ReturnType<typeof useFirestore>;

const getAllStatuses = async (
  db: Firestore,
  userId: string,
  year: number,
  month: number
): Promise<HabitStatus[]> => {
  const ref = habitMonthlyActivityDoc(db, userId, {
    year,
    month,
  });
  const docSnapshot = await getDoc(ref);
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
