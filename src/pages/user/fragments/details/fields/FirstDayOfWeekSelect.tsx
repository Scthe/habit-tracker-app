import React from "react";

import { getWeekdayName, Weekday } from "~utils";
import { SelectFromConst } from "components/SelectFromConst";

interface ValueType {
  type: Weekday;
  label: string;
}

const createItem = (wd: Weekday): ValueType => ({
  type: wd,
  label: getWeekdayName(wd, "NNNN"),
});

const VALUES: Array<ValueType> = [
  createItem(Weekday.Monday),
  createItem(Weekday.Saturday),
  createItem(Weekday.Sunday),
];

interface Props {
  currentValue: Weekday;
  className?: string;
}

export const FirstDayOfWeekSelect: React.FC<Props> = ({
  currentValue,
  className,
}) => {
  // TODO add API hook here
  const handleChange = (wd: Weekday) => {
    console.log("FirstDayOfWeekSelect.handleChange", wd);
    // const newValue = createRepetitionObjectFromType(
    // e.target.value as RepeatType
    // );
    // helpers.setValue(newValue);
  };

  return (
    <SelectFromConst<Weekday>
      id="first-day-if-the-week"
      label="First day of the week"
      currentValue={currentValue}
      onChange={handleChange}
      values={VALUES}
      className={className}
    />
  );
};
