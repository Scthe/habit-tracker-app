import React from "react";
import format from "date-fns/format";

import { Habit } from "../../_types";
import { DetailHabitField } from "./DetailHabitField";
import {
  assertUnreachable,
  stringifyNumber,
  getWeekdayName,
  deconstructDate,
  isSameDay,
  getDateDiff,
  createDateFromDay,
  stringifyDateDiff,
} from "~utils";

// TODO [feature] count how many times done this habit

const createRepeatText = (repeat: Habit["repeat"]): [string, string] => {
  switch (repeat.type) {
    case "daily": {
      return ["Repeat", "Everyday"];
    }
    case "weekly": {
      const dayNames = repeat.weekdays.map((wd) => getWeekdayName(wd, "NNNN"));
      return ["On", dayNames.join(", ")];
    }
    case "weekly_summary": {
      return ["Every week till", getWeekdayName(repeat.endsOn, "NNNN")];
    }
    case "monthly_summary": {
      return ["Every month till", stringifyNumber(repeat.endsOn)];
    }
    default: {
      return assertUnreachable(repeat); // compile time error if some case is not handled
    }
  }
};

const getDateText = (createdAt: Date): string => {
  const dayCreatedAt = deconstructDate(createdAt);
  const dayNow = deconstructDate(new Date());
  if (isSameDay(dayCreatedAt, dayNow)) {
    return "Today";
  }

  const diff = getDateDiff(
    createDateFromDay(dayCreatedAt, 1, 0),
    createDateFromDay(dayNow, 1, 0)
  );
  const date = format(createdAt, "d LLLL yyyy");
  return `${date} (${stringifyDateDiff(diff)})`;
};

interface Props {
  habit: Habit;
  className?: string;
}

export const DetailsFields: React.FC<Props> = ({ habit, className }) => {
  const fieldProps = (id: string, label: string, value: string) => ({
    id,
    label,
    value,
  });
  const reminderText = `${habit.reminderTime.hour}:${habit.reminderTime.minute}`;
  const [repeatLabel, repeatTextRaw] = createRepeatText(habit.repeat);
  const repeatText = `${repeatTextRaw} at ${reminderText}`;

  return (
    <div className={className}>
      <DetailHabitField {...fieldProps("name", "I want to", habit.name)} />
      <DetailHabitField {...fieldProps(repeatLabel, "Repeat", repeatText)} />

      {habit.description.length > 0 ? (
        <DetailHabitField
          linkify
          {...fieldProps("description", "Notes", habit.description)}
        />
      ) : null}

      <DetailHabitField
        {...fieldProps(
          "created_at",
          "I've done this since",
          getDateText(habit.createdAt)
        )}
      />
    </div>
  );
};
