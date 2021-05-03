import React from "react";

import { Habit, HabitCompletionStatus } from "../_types";
import { DetailHabitField } from "./DetailHabitField";
import { HabitTodayStatus } from "./HabitTodayStatus";
import { assertUnreachable, stringifyNumber, getWeekdayName } from "~utils";

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
  currentStatus: HabitCompletionStatus;
  today: Date;
  className?: string;
}

export const DetailsFields: React.FC<Props> = ({
  habit,
  currentStatus,
  today,
  className,
}) => {
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
      <HabitTodayStatus
        habit={habit}
        currentStatus={currentStatus}
        today={today}
      />
      <DetailHabitField {...fieldProps("name", "I want to", habit.name)} />
      <DetailHabitField {...fieldProps(repeatLabel, "Repeat", repeatText)} />
      <DetailHabitField
        {...fieldProps("description", "Notes", habit.description)}
      />
      {/* TODO <DetailHabitField {...fieldProps("created_at", "I've done this since", habit.createdAt)} /> */}
    </div>
  );
};
