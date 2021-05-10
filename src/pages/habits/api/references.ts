import firebase from "firebase/app";

import { Habit, HabitStatus } from "../_types";
import { habitConverter } from "./converters";
import type { useFirestore } from "~firebaseUtils";
import { MonthOfYear } from "~utils";

type Firestore = ReturnType<typeof useFirestore>;
type DocReference<T> = firebase.firestore.DocumentReference<T>;
type CollectionReference<T> = firebase.firestore.CollectionReference<T>;
type Query<T> = firebase.firestore.Query<T>;

////////////////////////
/// HABITS

export const habitDocRef = (
  db: Firestore,
  id?: Habit["id"]
): DocReference<Habit> =>
  db.collection("habits").doc(id).withConverter(habitConverter);

export const habitDocRefWithConverter = (
  db: Firestore,
  id?: Habit["id"]
): DocReference<Habit> =>
  db.collection("habits").doc(id).withConverter(habitConverter);

export const habitsCollectionRef = (
  db: Firestore
): CollectionReference<unknown> => db.collection("habits");

export const habitsQueryRef = (db: Firestore, userId: string): Query<Habit> =>
  db
    .collection("habits")
    .where("userId", "==", userId)
    .withConverter(habitConverter);

////////////////////////
/// HABIT ACTIVITY

export const habitActivityDoc = (
  db: Firestore,
  userId: string,
  date: MonthOfYear
): DocReference<Record<string, HabitStatus>> =>
  db
    .collection("user")
    .doc(userId)
    .collection("habit_activity")
    .doc(`${date.year}-${date.month}`);
