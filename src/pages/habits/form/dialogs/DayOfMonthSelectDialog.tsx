import React from "react";
import times from "lodash/times";

import { ValuePickDialog } from "components";
import { numberOrdering } from "~utils";

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
  return (
    <ValuePickDialog<number>
      name="day-of-month"
      title="Select day of month"
      data={times(31, (i) => i + 1)}
      open={open}
      onClose={onClose}
      selectedValue={selectedValue}
    >
      {/* TODO mark is selected. Simple color background? */}
      {(item) => <span>{numberOrdering(item.item)}</span>}
    </ValuePickDialog>
  );
};
