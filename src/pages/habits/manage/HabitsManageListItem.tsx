import React from "react";
import { useHistory } from "react-router-dom";

import { HabitsListItem } from "../_shared";
import { Habit } from "../_types";
import { assertUnreachable } from "~utils";

interface Props {
  habit: Habit;
}

const getSubtext = (habit: Habit): string => {
  const { repeat } = habit;

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

export const HabitsManageListItem: React.FC<Props> = ({ habit }) => {
  const history = useHistory();

  const handleClick = () => {
    history.push(`/habits/${habit.id}/details`);
  };

  // TODO overflow?
  const subtext = getSubtext(habit);

  return (
    <HabitsListItem
      item={habit}
      renderSubtext={() => subtext}
      onClick={handleClick}
    />
  );
};
