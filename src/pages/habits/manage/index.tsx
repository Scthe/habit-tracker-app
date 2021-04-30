import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";

import { AppPage } from "../../_shared";
import { useHabits } from "./api/useHabits";
import { ManageHeader } from "./ManageHeader";
import { HabitsManageList } from "./HabitsManageList";

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

const ManageHabits: React.FC<unknown> = () => {
  const styles = useStyles();
  const [search, setSearch] = useState("");
  const habitsAsync = useHabits();

  return (
    <AppPage className={styles.root} appMenuActiveItem="manage">
      <ManageHeader search={search} setSearch={setSearch} />

      <div className={clsx(styles.toolbarOffset, styles.content)}>
        <HabitsManageList search={search} habits={habitsAsync} />
      </div>
    </AppPage>
  );
};

export default ManageHabits;
