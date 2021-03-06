import React from "react";

import { HabitsListItem } from "../../components";
import { Habit } from "../../_types";
import { assertUnreachable } from "utils";
import { getCurrentRepeatData } from "pages/habits/utils";

export type HabitClickHandler = (habit: Habit) => void;

interface Props {
  habit: Habit;
  onClick: HabitClickHandler;
  isSelected: boolean;
}

const getSubtext = (habit: Habit): string => {
  const repeat = getCurrentRepeatData(habit.repeat);
  if (repeat == null) {
    return "Disabled";
  }

  switch (repeat.type) {
    case "daily":
      return "Everyday";
    case "weekly":
      return `${repeat.weekdays.length} times a week`;
    case "weekly_summary":
      return "Every week";
    case "monthly_summary":
      return "Every month";
    default: {
      return assertUnreachable(repeat); // compile time error if some case is not handled
    }
  }
};

export const HabitsManageListItem: React.FC<Props> = ({
  habit,
  onClick,
  isSelected,
}) => {
  const subtext = getSubtext(habit);

  return (
    <HabitsListItem
      item={habit}
      renderSubtext={() => subtext}
      onClick={() => onClick(habit)}
      isSelected={isSelected}
    />
  );
};
