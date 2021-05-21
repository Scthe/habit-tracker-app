import React from "react";

import { Habit } from "../../_types";
import { ReadonlyField } from "components/ReadonlyField";
import {
  assertUnreachable,
  stringifyNumber,
  getWeekdayName,
  displayDateWithDiff,
} from "~utils";

// TODO [feature] count how many times done this habit

interface Props {
  habit: Habit;
  className?: string;
}

export const DetailsFields: React.FC<Props> = ({ habit, className }) => {
  const reminderText = `${habit.reminderTime.hour}:${habit.reminderTime.minute}`;
  const [repeatLabel, repeatTextRaw] = createRepeatText(habit.repeat);
  const repeatText = `${repeatTextRaw} at ${reminderText}`;

  return (
    <div className={className}>
      <ReadonlyField id="name" label="I want to" value={habit.name} />
      <ReadonlyField id="repeat" label={repeatLabel} value={repeatText} />

      {habit.description.length > 0 ? (
        <ReadonlyField
          linkify
          id="description"
          label="Notes"
          value={habit.description}
        />
      ) : null}

      <ReadonlyField
        id="created_at"
        label="I've done this since"
        value={displayDateWithDiff(habit.createdAt)}
      />
    </div>
  );
};

function createRepeatText(repeat: Habit["repeat"]): [string, string] {
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
}
