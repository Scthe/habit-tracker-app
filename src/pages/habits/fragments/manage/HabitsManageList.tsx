import React from "react";

import { NoHabitsMessage } from "../../components";
import { Habit } from "../../_types";
import {
  HabitClickHandler,
  HabitsManageListItem,
} from "./HabitsManageListItem";
import { AsyncData } from "~types";
import { AsyncList, ListEmptyProps } from "components/List";

const EmptyMsg: React.FC<ListEmptyProps> = (props) => (
  <NoHabitsMessage {...props}>
    Create a habit and it will show up here.
  </NoHabitsMessage>
);

interface Props {
  search: string;
  habits: AsyncData<Habit[]>;
  className?: string;
  onItemClick: HabitClickHandler;
  selectedItem?: string;
}

const filterHabitsByName = (expectedName: string) => {
  const expName = expectedName.toLowerCase();
  return (habit: Habit) => habit.name.toLowerCase().indexOf(expName) !== -1;
};

export const HabitsManageList: React.FC<Props> = ({
  search,
  habits,
  className,
  onItemClick,
  selectedItem,
}) => {
  return (
    <AsyncList
      data={habits}
      filterPredicate={filterHabitsByName(search)}
      className={className}
      keyExtractor="id"
      renderItem={(habit) => (
        <HabitsManageListItem
          habit={habit}
          onClick={onItemClick}
          isSelected={selectedItem === habit.id}
        />
      )}
      emptyListMsg={EmptyMsg}
    />
  );
};
