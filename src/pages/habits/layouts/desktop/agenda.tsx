import React, { lazy, useCallback, useState } from "react";

import { Habit } from "../../_types";
import { AppPage } from "pages/_shared";
import {
  DetailsView,
  MasterDetailsLayout,
  MasterView,
} from "components/MasterDetailsLayout";

const Agenda = lazy(
  () => import(/* webpackChunkName: "habitsAgenda" */ "../../fragments/agenda")
);
const HabitDetails = lazy(
  () =>
    import(/* webpackChunkName: "habitsDetails" */ "../../fragments/details")
);

export default (): JSX.Element => {
  const [selectedItem, setSelectedItem] = useState<Habit | null>(null);

  const handleItemClick = useCallback(
    (habit: Habit) => setSelectedItem(habit),
    []
  );

  return (
    <AppPage appMenuActiveItem="agenda" documentTitle="Agenda">
      <MasterDetailsLayout>
        <MasterView>
          <Agenda
            onItemClick={handleItemClick}
            selectedItem={selectedItem?.id}
          />
        </MasterView>

        <DetailsView
          hasItem={selectedItem !== null}
          detailKey={selectedItem?.id}
          itemFallback={{ message: "No habit selected" }}
        >
          {selectedItem !== null ? (
            <HabitDetails
              id={selectedItem.id}
              habit={selectedItem}
              isInMasterDetailLayout={true}
            />
          ) : null}
        </DetailsView>
      </MasterDetailsLayout>
    </AppPage>
  );
};
