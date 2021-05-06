import { AsyncState } from "react-async-hook";
import firebase from "firebase/app";
import { Habit } from "../_types";
import { AsyncData } from "~types";

type HabitConverter = firebase.firestore.FirestoreDataConverter<Habit>;

export const habitConverter: HabitConverter = {
  toFirestore: (habit: Habit) => {
    console.log("HabitConverter.toFirestore", habit);
    return {
      // TODO what about `Partial<Habit>` when merging?
      ...habit,
      createdAt: firebase.firestore.Timestamp.fromDate(habit.createdAt),
      editedAt: firebase.firestore.Timestamp.fromDate(habit.editedAt),
    };
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

export const adaptFromAsyncHook = <T>(data: AsyncState<T>): AsyncData<T> => {
  switch (data.status) {
    case "not-requested":
      return { status: "init" };
    case "loading":
      return { status: "loading" };
    case "error":
      return { status: "error", error: data.error! };
    case "success":
      return { status: "success", data: data.result! };
  }
};
