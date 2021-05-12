import React, { useState } from "react";

import { useGetHabits } from "../../api";
import { ManageHeader } from "./ManageHeader";
import { HabitsManageList } from "./HabitsManageList";
import { HabitClickHandler } from "./HabitsManageListItem";
import { AppPageContent } from "pages/_shared";

interface Props {
  onItemClick: HabitClickHandler;
}

const ManageHabits: React.FC<Props> = ({ onItemClick }) => {
  const [search, setSearch] = useState("");
  const habitsAsync = useGetHabits();

  // TODO handle refetch on error
  return (
    <>
      <ManageHeader search={search} setSearch={setSearch} />

      <AppPageContent>
        <HabitsManageList
          search={search}
          habits={habitsAsync.data}
          onItemClick={onItemClick}
        />
      </AppPageContent>
    </>
  );
};

// used with React.Lazy, but eslint has problems
// eslint-disable-next-line import/no-unused-modules
export default ManageHabits;
