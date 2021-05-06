import firebase from "firebase/app";
import { Habit } from "../_types";

type HabitConverter = firebase.firestore.FirestoreDataConverter<Habit>;

export const habitConverter: HabitConverter = {
  toFirestore: () => {
    throw new Error("Please do it manually");
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data({
      serverTimestamps: options.serverTimestamps || "estimate",
    });
    return {
      ...data,
      createdAt: data.createdAt.toDate(),
      editedAt: data.editedAt.toDate(),
      id: snapshot.id,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any; // we can't verify this without full validation anyway
  },
};
