import { getDoc } from "firebase/firestore";
import type firestoreNS from "firebase/firestore";

import { HabitStatus } from "../../_types";
import { habitMonthlyActivityDoc } from "../references";
import {
  useFirestoreOnce,
  UseFirestoreOnceType,
} from "firebaseUtils/firestore/useFirestoreOnce";
import { MonthOfYear } from "utils/date";
import { useLoggedUser } from "~storage";

const getAllHabitStatuses = async (
  db: firestoreNS.FirebaseFirestore,
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
  return useFirestoreOnce(getAllHabitStatuses, [uid, year, month]);
};
