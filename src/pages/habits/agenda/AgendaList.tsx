import React from "react";

import { AsyncData } from "~types";
import { AsyncList } from "~components";
import { NoHabitsMessage } from "../_shared";
import { HabitAgendaItem } from "./useHabitAgenda";
import { AgendaListItem } from "./AgendaListItem";
import { SetHabitActivityStatusFn } from ".";

interface Props {
  data: AsyncData<HabitAgendaItem[]>;
  currentDate: Date;
  className?: string;
  setHabitActivityStatus: SetHabitActivityStatusFn;
}

export const AgendaList: React.FC<Props> = ({
  data,
  currentDate,
  className,
  setHabitActivityStatus,
}) => {
  return (
    <AsyncList
      data={data}
      className={className}
      keyExtractor="id"
      renderItem={(e) => (
        <AgendaListItem
          currentDate={currentDate}
          data={e}
          setHabitActivityStatus={setHabitActivityStatus}
        />
      )}
      emptyListMsg={NoHabitsMessage}
    />
  );
};
