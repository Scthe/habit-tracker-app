/* eslint-disable @typescript-eslint/no-explicit-any */
import times from "lodash/times";
import { is } from "superstruct";
import {
  ALL_WEEK_DAYS,
  HabitColor,
  HabitColorList,
  RepetitionMonthlySummary,
  RepetitionWeekly,
  RepetitionWeeklySummary,
  Weekday,
} from "../_types";
import { FormValues } from "./useFormInitValues";
import { HabitFormValidationSchema } from "./validation.schema";

// The amount of errors in validation schemas i've seen is staggering.
// Because someone forgot to update after changing typescripts typedefs.
// Like, you can crash your entire app with this.
// TEST IT!

const createStringWithLen = (len: number) => times(len, (i) => i % 10).join("");

describe("HabitFormValidationSchema", () => {
  let formValues: FormValues;

  beforeEach(() => {
    formValues = {
      name: "mock-name",
      color: HabitColor.Blue,
      description: "mock-description",
      repeat: {
        type: "daily",
      },
      reminderTime: {
        hour: 18,
        minute: 5,
      },
    };
  });

  test("should validate object with default values", () => {
    expect(is(formValues, HabitFormValidationSchema)).toBeTruthy();
  });

  describe("name", () => {
    test.each([
      ["", false],
      ["1", false],
      ["12", false],
      ["123", true],
      ["1234", true],
      [createStringWithLen(19), true],
      [createStringWithLen(20), true],
      [createStringWithLen(21), false],
    ])("should validate name '%s' as (ok=%s)", (val, isOk) => {
      formValues.name = val;
      expect(is(formValues, HabitFormValidationSchema)).toBe(isOk);
    });
  });

  describe("color", () => {
    test.each(HabitColorList.map((col) => [HabitColor[col], col]))(
      "should validate color '%s' as (ok=%s)",
      (_colName, colId) => {
        formValues.color = colId as any;
        expect(is(formValues, HabitFormValidationSchema)).toBeTruthy();
      }
    );
  });

  describe("description", () => {
    test.each([
      ["", true],
      ["1", true],
      ["12", true],
      [createStringWithLen(49), true],
      [createStringWithLen(50), true],
      [createStringWithLen(51), false],
    ])("should validate description '%s' as (ok=%s)", (val, isOk) => {
      formValues.description = val;
      expect(is(formValues, HabitFormValidationSchema)).toBe(isOk);
    });
  });

  describe("repeat", () => {
    describe("daily", () => {
      beforeEach(() => {
        formValues.repeat.type = "daily";
      });

      test("should be ok", () => {
        expect(is(formValues, HabitFormValidationSchema)).toBeTruthy();
      });
    });

    describe("weekly", () => {
      let repeat: RepetitionWeekly;
      beforeEach(() => {
        repeat = formValues.repeat as any;
        repeat.type = "weekly";
      });

      test.each([
        [[], false],
        [[Weekday.Monday], true],
        [[Weekday.Monday, Weekday.Friday], true],
        [ALL_WEEK_DAYS, true],
        [[...ALL_WEEK_DAYS, Weekday.Friday], false],
        // [[Weekday.Friday, Weekday.Friday], false],
      ])("should validate '%s' as (ok=%s)", (val, isOk) => {
        repeat.weekdays = val;
        expect(is(formValues, HabitFormValidationSchema)).toBe(isOk);
      });
    });

    describe("weekly_summary", () => {
      let repeat: RepetitionWeeklySummary;
      beforeEach(() => {
        repeat = formValues.repeat as any;
        repeat.type = "weekly_summary";
      });

      test.each(ALL_WEEK_DAYS)("should validate '%s'", (val) => {
        repeat.endsOn = val;
        expect(is(formValues, HabitFormValidationSchema)).toBeTruthy();
      });
    });

    describe("monthly_summary", () => {
      let repeat: RepetitionMonthlySummary;
      beforeEach(() => {
        repeat = formValues.repeat as any;
        repeat.type = "monthly_summary";
      });

      test.each([
        [-1, false],
        [0, true],
        [1, true],
        [29, true],
        [30, true],
        [31, true],
        [32, false],
      ])("should validate '%i' as (ok=%s)", (val, isOk) => {
        repeat.endsOn = val;
        expect(is(formValues, HabitFormValidationSchema)).toBe(isOk);
      });
    });
  });

  describe("reminderTime", () => {
    describe("hours", () => {
      test.each([
        [-1, false],
        [0, true],
        [1, true],
        [22, true],
        [23, true],
        [24, false],
        [25, false],
      ])("should validate '%i' as (ok=%s)", (val, isOk) => {
        formValues.reminderTime.hour = val;
        expect(is(formValues, HabitFormValidationSchema)).toBe(isOk);
      });
    });

    describe("minutes", () => {
      test.each([
        [-60, false],
        [-59, false],
        [-1, false],
        [0, true],
        [1, false],
        [2, false],
        [5, true],
        [10, true],
        [15, true],
        [20, true],
        [25, true],
        [30, true],
        [35, true],
        [40, true],
        [45, true],
        [50, true],
        [55, true],
        [58, false],
        [56, false],
        [60, false],
        [61, false],
      ])("should validate '%i' as (ok=%s)", (val, isOk) => {
        formValues.reminderTime.minute = val;
        expect(is(formValues, HabitFormValidationSchema)).toBe(isOk);
      });
    });
  });
});
