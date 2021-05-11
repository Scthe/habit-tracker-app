import React, { lazy, useCallback, useState } from "react";

import { Habit } from "../../_types";
import { AppPage } from "pages/_shared";
import { DetailsView, MasterDetailsLayout, MasterView } from "~components";

const Agenda = lazy(() => import("../../fragments/agenda"));
const HabitDetails = lazy(() => import("../../fragments/details"));

// TODO highlight shown/selected item?

export default (): JSX.Element => {
  const [selectedItem, setSelectedItem] = useState<Habit | null>(null);

  const handleItemClick = useCallback(
    (habit: Habit) => setSelectedItem(habit),
    []
  );

  return (
    <AppPage appMenuActiveItem="agenda">
      <MasterDetailsLayout>
        <MasterView>
          <Agenda onItemClick={handleItemClick} />
        </MasterView>

        <DetailsView
          hasItem={selectedItem !== null}
          detailKey={selectedItem?.id}
          itemFallback={{ message: "No habit selected" }}
        >
          {selectedItem !== null ? (
            <HabitDetails id={selectedItem.id} habit={selectedItem} />
          ) : null}
        </DetailsView>
      </MasterDetailsLayout>
    </AppPage>
  );
};
