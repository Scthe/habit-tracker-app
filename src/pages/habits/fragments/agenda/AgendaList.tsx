import React, { useCallback } from "react";

import { NoHabitsMessage } from "../../components";
import { HabitAgendaItem } from "./useAgendaData";
import { AgendaListItem, HabitClickHandler } from "./AgendaListItem";
import { sortBy } from "./sortBy";
import { AsyncList, ListEmptyProps } from "components/List";
import { AsyncData } from "~types";
import { DayOfYear } from "~utils";

const EmptyMsg: React.FC<ListEmptyProps> = (props) => (
  <NoHabitsMessage {...props}>
    No activities found.
    <br />
    Please enjoy your day!
  </NoHabitsMessage>
);

interface Props {
  data: AsyncData<HabitAgendaItem[]>;
  currentDate: DayOfYear;
  className?: string;
  onItemClick: HabitClickHandler;
  selectedItem: string | undefined;
}

export const AgendaList: React.FC<Props> = ({
  data,
  currentDate,
  className,
  onItemClick,
  selectedItem,
}) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const beforeRender = useCallback(sortBy(currentDate), [currentDate]);

  return (
    <AsyncList
      data={data}
      className={className}
      keyExtractor={(e) => e.habit.id}
      beforeRender={beforeRender}
      emptyListMsg={EmptyMsg}
      renderItem={(e) => (
        <AgendaListItem
          currentDate={currentDate}
          habit={e.habit}
          status={e.status}
          onClick={onItemClick}
          isSelected={e.habit.id === selectedItem}
        />
      )}
    />
  );
};
