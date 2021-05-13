import React from "react";

import { Habit } from "../../_types";
import { DetailHabitField } from "./DetailHabitField";
import { assertUnreachable, stringifyNumber, getWeekdayName } from "~utils";

// TODO count how many times done

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
      <DetailHabitField
        {...fieldProps("description", "Notes", habit.description)}
      />
      {/* TODO [feature] <DetailHabitField {...fieldProps("created_at", "I've done this since", habit.createdAt)} /> */}
    </div>
  );
};