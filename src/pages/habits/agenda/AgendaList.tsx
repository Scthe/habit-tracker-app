import React from "react";

import { NoHabitsMessage } from "../_shared";
import { HabitAgendaItem } from "./useAgendaData";
import { AgendaListItem } from "./AgendaListItem";
import { AsyncList, ListEmptyProps } from "~components";
import { AsyncData } from "~types";
import { DayOfYear } from "~utils";

const EmptyMsg: React.FC<ListEmptyProps> = (props) => (
  <NoHabitsMessage {...props}>Today is a free day!</NoHabitsMessage>
);

interface Props {
  data: AsyncData<HabitAgendaItem[]>;
  currentDate: DayOfYear;
  className?: string;
}

export const AgendaList: React.FC<Props> = ({
  data,
  currentDate,
  className,
}) => {
  return (
    <AsyncList
      data={data}
      className={className}
      keyExtractor={(e) => e.habit.id}
      emptyListMsg={EmptyMsg}
      renderItem={(e) => (
        <AgendaListItem
          currentDate={currentDate}
          habit={e.habit}
          status={e.status}
        />
      )}
    />
  );
};
