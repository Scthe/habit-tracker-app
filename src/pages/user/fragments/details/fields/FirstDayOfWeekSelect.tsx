import React from "react";

import { useSetUserPreferences } from "../../../api/useSetUserPreferences";
import { getWeekdayName, Weekday } from "utils/date";
import { SelectFromConst } from "components/SelectFromConst";
import { useShowAlert } from "hooks/useShowAlert";

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
  const setUserPreferences = useSetUserPreferences();
  const showAlert = useShowAlert();

  const handleChange = async (firstDayOfWeek: Weekday) => {
    try {
      await setUserPreferences.execute({ firstDayOfWeek });
    } catch (e) {
      showAlert({
        severity: "error",
        message: `Error, could not update user preferences`,
      });
    }
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
