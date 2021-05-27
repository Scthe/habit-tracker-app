import React from "react";

import { Habit } from "../../_types";
import { ReadonlyField } from "components/ReadonlyField";
import { assertUnreachable, stringifyNumber } from "utils";
import { getWeekdayName, displayDateWithDiff } from "utils/date";
import { useUserDateSettings } from "hooks/useUserDateSettings";
import { getCurrentRepeatData } from "pages/habits/utils";

// TODO [feature] count how many times done this habit

interface Props {
  habit: Habit;
  className?: string;
}

export const DetailsFields: React.FC<Props> = ({ habit, className }) => {
  const dateUtils = useUserDateSettings();
  const reminderText = dateUtils.formatTime(
    habit.reminderTime.hour,
    habit.reminderTime.minute
  );
  const [repeatLabel, repeatValueRaw] = createRepeatText(habit.repeat);
  const repeatText =
    repeatValueRaw != null ? `${repeatValueRaw} at ${reminderText}` : null;

  return (
    <div className={className}>
      <ReadonlyField id="name" label="I want to" value={habit.name} />
      <ReadonlyField
        id="repeat"
        label={repeatLabel}
        value={repeatText}
        onMissingValue="hide"
      />

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

function createRepeatText(
  repeatHistory: Habit["repeat"]
): [string, string | null] {
  const repeat = getCurrentRepeatData(repeatHistory);
  if (repeat == null) {
    return ["Repeat", null];
  }

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
