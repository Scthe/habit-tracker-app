import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";

import { useGetHabits } from "../../api";
import { ManageHeader } from "./ManageHeader";
import { HabitsManageList } from "./HabitsManageList";
import { HabitClickHandler } from "./HabitsManageListItem";

const useStyles = makeStyles((theme) => ({
  toolbarOffset: theme.mixins.toolbar,
  content: {
    padding: "25px 25px 0",
    overflow: "auto",
    marginBottom: "20px",
  },
}));

interface Props {
  onItemClick: HabitClickHandler;
}

const ManageHabits: React.FC<Props> = ({ onItemClick }) => {
  const styles = useStyles();
  const [search, setSearch] = useState("");
  const habitsAsync = useGetHabits();

  // TODO handle refetch on error
  return (
    <>
      <ManageHeader search={search} setSearch={setSearch} />

      <div className={clsx(styles.toolbarOffset, styles.content)}>
        <HabitsManageList
          search={search}
          habits={habitsAsync.data}
          onItemClick={onItemClick}
        />
      </div>
    </>
  );
};

// used with React.Lazy, but eslint has problems
// eslint-disable-next-line import/no-unused-modules
export default ManageHabits;
