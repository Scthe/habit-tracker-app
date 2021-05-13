import React, { useState } from "react";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";

import { DayOfMonthSelectDialog } from "../../dialogs/DayOfMonthSelectDialog";
import { numberOrdering } from "~utils";

const useStyles = makeStyles(() => ({
  dialogButton: {
    flex: "1",
  },
}));

interface Props {
  label: string;
  currentValue: number;
  onChange: (day: number) => void;
  className?: string;
}

export const DayOfMonthSelection: React.FC<Props> = ({
  label,
  currentValue,
  onChange,
  className,
}) => {
  const styles = useStyles();
  const [isDialogOpen, setDialogOpen] = useState(false);

  const onClose = (nextValue: number) => {
    setDialogOpen(false);
    onChange(nextValue);
  };

  return (
    <div className={className}>
      <InputLabel shrink>{label}</InputLabel>

      <Box marginTop={1}>
        <Button
          onClick={() => setDialogOpen(true)}
          className={styles.dialogButton}
        >
          {numberOrdering(currentValue)} day of the month
        </Button>
      </Box>

      <DayOfMonthSelectDialog
        open={isDialogOpen}
        onClose={onClose}
        selectedValue={currentValue}
      />
    </div>
  );
};
