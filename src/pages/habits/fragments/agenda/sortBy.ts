import partition from "lodash/partition";

import { HabitCompletionStatus } from "../../_types";
import { HabitAgendaItem } from "./useAgendaData";
import { hasSameElements, sortStringCmpFn } from "utils";
import { DayOfYear, relativeToToday } from "utils/date";

// SORT ORDER
//
// today/future:
// - first NOT_DONE in [time_left, name] order
// - then DONE in [time_left, name] order
// past:
// - [time_left, name] order

const sortByReminder = (items: HabitAgendaItem[]): HabitAgendaItem[] => {
  return items.sort(({ habit: a }, { habit: b }) => {
    const rta = a.reminderTime;
    const rtb = b.reminderTime;

    if (rta.hour != rtb.hour) {
      return rta.hour - rtb.hour;
    }
    if (rta.minute != rtb.minute) {
      return rta.minute - rtb.minute;
    }
    return sortStringCmpFn(a.name, b.name);
  });
};

const sortByStatusAndReminder = (
  items: HabitAgendaItem[],
  currentDate: DayOfYear
): HabitAgendaItem[] => {
  if (relativeToToday(currentDate) === "past") {
    return sortByReminder(items);
  }

  const [done, notDone] = partition(
    items,
    (e) => e.status === HabitCompletionStatus.DONE
  );
  return [...sortByReminder(notDone), ...sortByReminder(done)];
};

type SortFnReturn = (d: HabitAgendaItem[]) => HabitAgendaItem[];
/**
 * As long as the `currentDate` is same, we will not change the order.
 * This way checking things `done` will not change sorting
 */
export const sortBy = (currentDate: DayOfYear): SortFnReturn => {
  let cache: string[] | null = null; // cached ids

  return (data: HabitAgendaItem[]): HabitAgendaItem[] => {
    const dataIds = data.map((e) => e.habit.id);
    const sameIds = hasSameElements(cache || [], dataIds);

    if (cache == null || !sameIds) {
      cache = sortByStatusAndReminder(data, currentDate).map((e) => e.habit.id);
    }

    const sortedHabits = cache.map(
      (id) => data.find((e) => e.habit.id === id)!
    );
    return sortedHabits.filter((e) => e !== undefined);
  };
};
