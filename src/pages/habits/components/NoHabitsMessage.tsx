import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

import { ROUTES } from "../constants";
import { ListEmpty, ListEmptyProps } from "~components";

const useStyles = makeStyles((theme) => ({
  createHabit: {
    marginTop: theme.spacing(2),
  },
}));

// TODO this has children? how it is used?!
export const NoHabitsMessage: React.FC<ListEmptyProps> = ({
  children,
  ...rest
}) => {
  const styles = useStyles();

  return (
    <ListEmpty {...rest}>
      {children}

      <div className={styles.createHabit}>
        <Link to={ROUTES.create}>
          <Button variant="contained" color="primary">
            Create a new habit
          </Button>
        </Link>
      </div>
    </ListEmpty>
  );
};
