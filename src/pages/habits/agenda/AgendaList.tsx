import React from "react";

import { NoHabitsMessage } from "../_shared";
import { HabitAgendaItem } from "./api/useAgendaData";
import { AgendaListItem } from "./AgendaListItem";
import { AsyncList } from "~components";
import { AsyncData } from "~types";

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
      renderItem={(e) => (
        <AgendaListItem
          currentDate={currentDate}
          habit={e.habit}
          status={e.status}
        />
      )}
      emptyListMsg={NoHabitsMessage}
    />
  );
};
