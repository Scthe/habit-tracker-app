import React from "react";

import { useSetUserPreferences } from "../../../api/useSetUserPreferences";
import { SelectFromConst } from "components/SelectFromConst";
import { TimeDisplay } from "~storage";
import { useShowAlert } from "hooks/useShowAlert";

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
  const setUserPreferences = useSetUserPreferences();
  const showAlert = useShowAlert();

  const handleChange = async (timeDisplay: TimeDisplay) => {
    try {
      await setUserPreferences.execute({ timeDisplay });
    } catch (e) {
      showAlert({
        severity: "error",
        message: `Error, could not update user preferences`,
      });
    }
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
