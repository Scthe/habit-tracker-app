import React from "react";

import { AsyncData } from "~types";
import { AsyncList } from "~components";
import { NoHabitsMessage } from "../_shared";
import { HabitAgendaItem } from "./api/useAgendaData";
import { AgendaListItem } from "./AgendaListItem";

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
