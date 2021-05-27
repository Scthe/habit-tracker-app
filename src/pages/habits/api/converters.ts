import type firestoreNS from "firebase/firestore";

import { Habit, HabitRepetition, HabitRepetitionHistory } from "../_types";
import { sortStringCmpFn } from "utils";
import { deconstructDate, isValidDate, stringifyDay } from "utils/date";

type HabitConverter = firestoreNS.FirestoreDataConverter<Habit>;

export const habitConverter: HabitConverter = {
  toFirestore: () => {
    throw new Error("Please do it manually");
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data({
      serverTimestamps: options?.serverTimestamps || "estimate",
    });
    const createdAt = data.createdAt.toDate();
    return {
      ...data,
      createdAt,
      editedAt: data.editedAt.toDate(),
      repeat: deserializeRepeatHistory(data.repeat, createdAt),
      id: snapshot.id,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any; // we can't verify this without full validation anyway
  },
};

type SerializedHabitRepetitionHistory = Record<string, HabitRepetition>;

function deserializeRepeatHistory(
  data: SerializedHabitRepetitionHistory,
  createdAt: Date
): HabitRepetitionHistory {
  const datesSorted = Object.keys(data)
    .filter(isValidDate)
    .sort(sortStringCmpFn);
  const result = datesSorted.map((dateStr) => ({
    dateFrom: deconstructDate(new Date(dateStr)),
    repeat: data[dateStr],
  }));

  if (result.length === 0) {
    result.push({
      repeat: { type: "daily" },
      dateFrom: deconstructDate(createdAt),
    });
  }

  return result;
}

export function createRepeatHistoryKey(date: Date): string {
  return stringifyDay(deconstructDate(date));
}
