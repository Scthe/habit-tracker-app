import { collection, doc, orderBy, query, where } from "firebase/firestore";
import type firestoreNS from "firebase/firestore";

import { Habit, HabitStatus } from "../_types";
import { habitConverter } from "./converters";
import type { Firestore } from "firebaseUtils/useFirestore";
import { MonthOfYear } from "~utils";

type DocReference<T> = firestoreNS.DocumentReference<T>;
type CollectionReference<T> = firestoreNS.CollectionReference<T>;
type Query<T> = firestoreNS.Query<T>;

////////////////////////
/// HABITS

export const habitDocRef = (
  db: Firestore,
  id: Habit["id"]
): DocReference<Habit> =>
  doc(collection(db, "habits"), id).withConverter(habitConverter);

export const habitsCollectionRef = (
  db: Firestore
): CollectionReference<unknown> => collection(db, "habits");

export const userHabitsQueryRef = (
  db: Firestore,
  userId: string
): Query<Habit> =>
  query(
    //
    collection(db, "habits"), //
    where("userId", "==", userId), //
    orderBy("name", "desc") //
  ).withConverter(habitConverter);

////////////////////////
/// HABIT ACTIVITY

export const habitMonthlyActivityDoc = (
  db: Firestore,
  userId: string,
  date: MonthOfYear
): DocReference<Record<string, HabitStatus>> => {
  const key = `${date.year}-${date.month}`;
  const userRef = doc(collection(db, "user"), userId);
  return doc(collection(userRef, "habit_activity"), key);
};
