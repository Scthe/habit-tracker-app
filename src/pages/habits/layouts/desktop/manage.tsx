import React, { lazy, useCallback, useState } from "react";

import { AppPage } from "pages/_shared";
import { Habit } from "../../_types";
import { DetailsView, MasterDetailsLayout, MasterView } from "~components";

const Manage = lazy(() => import("../../fragments/manage"));
const HabitDetails = lazy(() => import("../../fragments/details"));

// TODO highlight shown/selected item?

export default (): JSX.Element => {
  const [selectedItem, setSelectedItem] = useState<Habit | null>(null);

  const handleItemClick = useCallback(
    (habit: Habit) => setSelectedItem(habit),
    []
  );

  return (
    <AppPage appMenuActiveItem="manage">
      <MasterDetailsLayout>
        <MasterView>
          <Manage onItemClick={handleItemClick} />
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
            />
          ) : null}
        </DetailsView>
      </MasterDetailsLayout>
    </AppPage >
  );
};

