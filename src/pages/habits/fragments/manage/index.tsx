import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";

import { AppPage } from "../../../_shared";
import { useGetHabits } from "../../api";
import { ManageHeader } from "./ManageHeader";
import { HabitsManageList } from "./HabitsManageList";
import { HabitClickHandler } from "./HabitsManageListItem";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  toolbarOffset: theme.mixins.toolbar,
  content: {
    overflow: "auto",
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
    <AppPage className={styles.root} appMenuActiveItem="manage">
      <ManageHeader search={search} setSearch={setSearch} />

      <div className={clsx(styles.toolbarOffset, styles.content)}>
        <HabitsManageList
          search={search}
          habits={habitsAsync.data}
          onItemClick={onItemClick}
        />
      </div>
    </AppPage>
  );
};

export default ManageHabits;
