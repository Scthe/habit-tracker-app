import Button from "@material-ui/core/Button";
import React from "react";
import { Link } from "react-router-dom";
import { ListEmpty, ListEmptyProps } from "~components";

export const NoHabitsMessage: React.FC<ListEmptyProps> = ({
  children,
  ...rest
}) => (
  <ListEmpty {...rest}>
    {children}

    <div style={{ marginTop: "10px" }}>
      <Link to="/habits/create">
        <Button variant="contained" color="primary">
          Create a new habit
        </Button>
      </Link>
    </div>
  </ListEmpty>
);
