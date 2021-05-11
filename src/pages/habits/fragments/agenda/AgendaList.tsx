import React from "react";

import { NoHabitsMessage } from "../../_shared";
import { HabitAgendaItem } from "./useAgendaData";
import { AgendaListItem, HabitClickHandler } from "./AgendaListItem";
import { AsyncList, ListEmptyProps } from "~components";
import { AsyncData } from "~types";
import { DayOfYear } from "~utils";

// TODO sort order
// today/future:
// - first NOT_DONE in [time_left, name] order
// - first DONE in [time_left, name] order
// past:
// - [time_left, name] order
// BUT: cache/ref this on first mount, so checking DONE the item does not change order.
// add the beforeRender prop to AsyncList or smth. Be careful on day change, as id's will not match
// maybe useEffect(function resort(){...}, [stringify(currentDate), data.status]);

const EmptyMsg: React.FC<ListEmptyProps> = (props) => (
  <NoHabitsMessage {...props}>Today is a free day!</NoHabitsMessage>
);

interface Props {
  data: AsyncData<HabitAgendaItem[]>;
  currentDate: DayOfYear;
  className?: string;
  onItemClick: HabitClickHandler;
}

export const AgendaList: React.FC<Props> = ({
  data,
  currentDate,
  className,
  onItemClick,
}) => {
  /*
  type HabitId = Habit["id"];
  const sortOrder = useState<HabitId[]>[];
  useEffect(() => { // not optimal, will run after the first render
    if (data.status === "success") {
      sortOrder = sortHabits(data.data);
    }
  }, [stringifyDay(currentDate), data.status]);
  */

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
          onClick={onItemClick}
        />
      )}
    />
  );
};
