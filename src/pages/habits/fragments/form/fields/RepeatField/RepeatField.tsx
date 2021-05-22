import React from "react";
import { useField } from "formik";

import { FormValues } from "../../useFormInitValues";
import { WeekdaySelection } from "./WeekdaySelection";
import { DayOfMonthSelection } from "./DayOfMonthSelection";
import { assertUnreachable } from "utils";
import { Weekday } from "utils/date";
import { HabitRepetition } from "pages/habits/_types";
import { ExtraValidationText } from "components/ExtraValidationText";
import { SelectFromConst } from "components/SelectFromConst";

type RepeatType = HabitRepetition["type"];

const VALUES: Array<{ type: RepeatType; label: string }> = [
  {
    type: "daily",
    label: "Everyday",
  },
  {
    type: "weekly",
    label: "On selected days",
  },
  {
    type: "weekly_summary",
    label: "Weekly goal",
  },
  {
    type: "monthly_summary",
    label: "Monthly goal",
  },
];
const createRepetitionObjectFromType = (type: RepeatType): HabitRepetition => {
  switch (type) {
    case "daily":
      return { type };
    case "weekly":
      return {
        type,
        weekdays: [
          Weekday.Monday,
          Weekday.Wednesday,
          Weekday.Friday,
          Weekday.Sunday,
        ],
      };
    case "weekly_summary":
      return { type, endsOn: Weekday.Sunday };
    case "monthly_summary":
      return { type, endsOn: 31 };
    default: {
      return assertUnreachable(type); // compile time error if some case is not handled
    }
  }
};

interface Props {
  name: keyof FormValues;
  className?: string;
}

export const RepeatField: React.FC<Props> = (props) => {
  const [field, meta, helpers] = useField<HabitRepetition>(props);
  const currentValue: HabitRepetition = field.value;
  const currentType: RepeatType = currentValue.type;

  const handleTypeChange = (repeatType: RepeatType) => {
    const newValue = createRepetitionObjectFromType(repeatType);
    helpers.setValue(newValue);
  };
  const handleWeeklyChange = (days: Weekday[]) => {
    helpers.setValue({ type: "weekly", weekdays: days });
  };
  const handleWeeklySummaryChange = (days: Weekday[]) => {
    helpers.setValue({ type: "weekly_summary", endsOn: days[0] });
  };
  const handleMonthlySummaryChange = (day: number) => {
    helpers.setValue({ type: "monthly_summary", endsOn: day });
  };

  return (
    <div>
      <SelectFromConst<RepeatType>
        id={props.name}
        label="Repeat"
        currentValue={currentType}
        onChange={handleTypeChange}
        values={VALUES}
        className={props.className}
      />

      {currentValue.type === "weekly" ? (
        <WeekdaySelection
          label="Repeats on"
          allowMany={true}
          currentValues={currentValue.weekdays || []}
          onChange={handleWeeklyChange}
          className={props.className}
        />
      ) : null}

      {currentValue.type === "weekly_summary" ? (
        <WeekdaySelection
          label="End of week"
          allowMany={false}
          currentValues={[currentValue.endsOn]}
          onChange={handleWeeklySummaryChange}
          className={props.className}
        />
      ) : null}

      {currentValue.type === "monthly_summary" ? (
        <DayOfMonthSelection
          label="End of month"
          currentValue={currentValue.endsOn}
          onChange={handleMonthlySummaryChange}
          className={props.className}
        />
      ) : null}

      <ExtraValidationText meta={meta} />
    </div>
  );
};
