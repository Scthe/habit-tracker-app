import React from "react";
import times from "lodash/times";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Icon from "@material-ui/core/Icon";
import { makeStyles } from "@material-ui/core/styles";

import { ValuePickDialog } from "components";
import { numberOrdering } from "~utils";

const useStyles = makeStyles((theme) => ({
  active: {
    color: theme.palette.primary.main,
  },
}));

interface Props {
  onClose: (nextValue: number) => void;
  open: boolean;
  selectedValue: number;
}

export const DayOfMonthSelectDialog: React.FC<Props> = ({
  onClose,
  open,
  selectedValue,
}) => {
  const styles = useStyles();

  return (
    <ValuePickDialog<number>
      name="day-of-month"
      title="Select day of month"
      data={times(31, (i) => i + 1)}
      open={open}
      onClose={onClose}
      selectedValue={selectedValue}
    >
      {(item) => (
        <>
          <ListItemIcon>
            {item.isSelected ? (
              <Icon className={styles.active}>check</Icon>
            ) : (
              " "
            )}
          </ListItemIcon>
          <span>
            {numberOrdering(item.item)} {item.isSelected ? "(selected)" : ""}
          </span>
        </>
      )}
    </ValuePickDialog>
  );
};
