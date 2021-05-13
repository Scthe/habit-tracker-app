import React from "react";

import { useAgendaData } from "./useAgendaData";
import { AgendaList } from "./AgendaList";
import { useCurrentDay } from "./useCurrentDay";
import { AgendaHeader } from "./AgendaHeader";
import { HabitClickHandler } from "./AgendaListItem";
import { AppPageContent } from "pages/_shared";
import { useGlobalKeyDown } from "~hooks";
import { addDays } from "~utils";

// TOOD [feature] swipe left/right for prev/next item

interface Props {
  onItemClick: HabitClickHandler;
  selectedItem: string | undefined;
}

const HabitsAgenda: React.FC<Props> = ({ onItemClick, selectedItem }) => {
  const [currentDay, setCurrentDay] = useCurrentDay();
  const agendaData = useAgendaData(currentDay);

  useGlobalKeyDown(true, {
    ArrowLeft: () => setCurrentDay(addDays(currentDay, -1)),
    ArrowRight: () => setCurrentDay(addDays(currentDay, 1)),
    ArrowUp: () => setCurrentDay(addDays(currentDay, -7)),
    ArrowDown: () => setCurrentDay(addDays(currentDay, 7)),
  });

  return (
    <>
      <AgendaHeader currentDate={currentDay} setCurrentDate={setCurrentDay} />

      <AppPageContent>
        <AgendaList
          currentDate={currentDay}
          data={agendaData}
          onItemClick={onItemClick}
          selectedItem={selectedItem}
        />
      </AppPageContent>
    </>
  );
};

// used with React.Lazy, but eslint has problems
// eslint-disable-next-line import/no-unused-modules
export default HabitsAgenda;
