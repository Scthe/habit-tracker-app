import React from "react";

import { NoHabitsMessage } from "../_shared";
import { HabitAgendaItem } from "./api/useAgendaData";
import { AgendaListItem } from "./AgendaListItem";
import { AsyncList, ListEmptyProps } from "~components";
import { AsyncData } from "~types";

const EmptyMsg: React.FC<ListEmptyProps> = (props) => (
  <NoHabitsMessage {...props}>Today is a free day!</NoHabitsMessage>
);

interface Props {
  data: AsyncData<HabitAgendaItem[]>;
  currentDate: Date;
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
      keyExtractor="id"
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
