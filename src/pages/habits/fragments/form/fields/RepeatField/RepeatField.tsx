import React from "react";
import { useField } from "formik";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

import { FormValues } from "../../useFormInitValues";
import { WeekdaySelection } from "./WeekdaySelection";
import { DayOfMonthSelection } from "./DayOfMonthSelection";
import { assertUnreachable, Weekday } from "~utils";
import { HabitRepetition } from "pages/habits/_types";
import { ExtraValidationText } from "~components";

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

  const handleTypeChange = (
    e: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const newValue = createRepetitionObjectFromType(
      e.target.value as RepeatType
    );
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
      <FormControl variant="filled" className={props.className}>
        <InputLabel shrink>Repeat</InputLabel>
        <Select
          name={props.name}
          value={currentType}
          onChange={handleTypeChange}
        >
          {VALUES.map((v) => (
            <MenuItem key={v.type} value={v.type}>
              {v.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

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
