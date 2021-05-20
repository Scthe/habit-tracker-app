import React from "react";

import { TimeDisplay } from "../../../_types";
import { SelectFromConst } from "~components";

interface ValueType {
  type: TimeDisplay;
  label: string;
}

const VALUES: Array<ValueType> = [
  {
    type: "12h",
    label: "12-hour clock",
  },
  {
    type: "24h",
    label: "24-hour clock",
  },
];

interface Props {
  currentValue: TimeDisplay;
  className?: string;
}

export const TimeDisplaySelect: React.FC<Props> = ({
  currentValue,
  className,
}) => {
  // TODO add API hook here
  const handleChange = (wd: TimeDisplay) => {
    console.log("TimeDisplaySelect.handleChange", wd);
    // const newValue = createRepetitionObjectFromType(
    // e.target.value as RepeatType
    // );
    // helpers.setValue(newValue);
  };

  return (
    <SelectFromConst<TimeDisplay>
      id="time-display"
      label="Time display"
      currentValue={currentValue}
      onChange={handleChange}
      values={VALUES}
      className={className}
    />
  );
};
