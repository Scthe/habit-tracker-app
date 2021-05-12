import React from "react";

import { useAgendaData } from "./useAgendaData";
import { AgendaList } from "./AgendaList";
import { useCurrentDay } from "./useCurrentDay";
import { AgendaHeader } from "./AgendaHeader";
import { HabitClickHandler } from "./AgendaListItem";
import { AppPageContent } from "pages/_shared";

// TOOD swipe left/right for prev/next item
// TODO make sure <AgendaHeader> is always visible, even when there is an exception in useAgendaData. Create content.tsx?

interface Props {
  onItemClick: HabitClickHandler;
}

const HabitsAgenda: React.FC<Props> = ({ onItemClick }) => {
  const [currentDay, setCurrentDay] = useCurrentDay();
  const agendaData = useAgendaData(currentDay);

  return (
    <>
      <AgendaHeader currentDate={currentDay} setCurrentDate={setCurrentDay} />

      <AppPageContent>
        <AgendaList
          currentDate={currentDay}
          data={agendaData}
          onItemClick={onItemClick}
        />
      </AppPageContent>
    </>
  );
};

// used with React.Lazy, but eslint has problems
// eslint-disable-next-line import/no-unused-modules
export default HabitsAgenda;
