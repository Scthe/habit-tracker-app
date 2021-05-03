import React from "react";

import { NoHabitsMessage } from "../_shared";
import { Habit } from "../_types";
import { HabitsManageListItem } from "./HabitsManageListItem";
import { AsyncData } from "~types";
import { AsyncList } from "~components";

interface Props {
  search: string;
  habits: AsyncData<Habit[]>;
  className?: string;
}

const filterHabitsByName = (expectedName: string) => {
  const expName = expectedName.toLowerCase();
  return (habit: Habit) => habit.name.toLowerCase().indexOf(expName) !== -1;
};

export const HabitsManageList: React.FC<Props> = ({
  search,
  habits,
  className,
}) => {
  return (
    <AsyncList
      data={habits}
      filterPredicate={filterHabitsByName(search)}
      className={className}
      keyExtractor="id"
      renderItem={(habit) => <HabitsManageListItem habit={habit} />}
      emptyListMsg={NoHabitsMessage}
    />
  );
};
