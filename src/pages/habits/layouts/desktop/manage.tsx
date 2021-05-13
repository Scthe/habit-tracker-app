import React, { lazy, useCallback, useState } from "react";
import { useLocation } from "react-router-dom";
import get from "lodash/get";

import { Habit } from "../../_types";
import { AppPage } from "pages/_shared";
import { DetailsView, MasterDetailsLayout, MasterView } from "~components";

const Manage = lazy(() => import("../../fragments/manage"));
const HabitDetails = lazy(() => import("../../fragments/details"));

interface SelectedItemState {
  id: string | undefined;
  habit: Habit | undefined;
}

export default (): JSX.Element => {
  const { state } = useLocation();
  const preselectedId = get(state, "from.state.id", undefined);

  const [selectedItem, setSelectedItem] = useState<SelectedItemState>({
    id: preselectedId != null ? preselectedId : undefined,
    habit: undefined,
  });

  const handleItemClick = useCallback(
    (habit: Habit) => setSelectedItem({ id: habit.id, habit }),
    []
  );

  const { id: selectedId, habit: selectedHabit } = selectedItem;

  return (
    <AppPage appMenuActiveItem="manage">
      <MasterDetailsLayout>
        <MasterView>
          <Manage onItemClick={handleItemClick} selectedItem={selectedId} />
        </MasterView>

        <DetailsView
          hasItem={selectedId != null}
          detailKey={selectedId}
          itemFallback={{ message: "No habit selected" }}
        >
          {selectedId != null ? (
            <HabitDetails
              id={selectedId}
              habit={selectedHabit}
              isInMasterDetailLayout={true}
            />
          ) : null}
        </DetailsView>
      </MasterDetailsLayout>
    </AppPage>
  );
};
