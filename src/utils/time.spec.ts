import { DateDiff, getDateDiff } from "./time";

describe("getDateDiff", () => {
  const MOCK_DATE = new Date("2020-05-15T11:30:00.00Z");

  /*const mockDateNow = (date: Date) => {
    jest
      .spyOn(global, "Date")
      .mockImplementationOnce(() => date as any);
  }*/
  const expectDateDiffEquals = (diff: DateDiff, ...exp: number[]) => {
    const diffStr = `${diff.days} days, ${diff.hours} hours, ${diff.minutes} minutes`;
    const expStr = `${exp[0]} days, ${exp[1]} hours, ${exp[2]} minutes`;
    expect(diffStr).toBe(expStr);
  };

  const CASES = [
    // date, days diff, hours diff, minutes diff
    ["2020-05-15T11:30:00.00Z", 0, 0, 0],
    ["2020-05-15T11:50:00.00Z", 0, 0, 20],
    ["2020-05-15T13:30:00.00Z", 0, 2, 0],
    ["2020-05-17T11:30:00.00Z", 2, 0, 0],
    ["2020-06-15T11:30:00.00Z", 31, 0, 0],
    ["2020-06-16T13:10:00.00Z", 32, 1, 40],
    ["2020-06-16T07:50:00.00Z", 31, 20, 20], // 12:30 + 7:50 = 20:20
  ];

  describe("when date is in the future", () => {
    test.each(CASES)(
      "should calculate from $mockDate to '%s' as %i days, %i hours, %i minutes",
      (date, ...exps: any[]) => {
        const diff = getDateDiff(MOCK_DATE, new Date(date));
        expectDateDiffEquals(diff, ...exps);
      }
    );
  });

  describe("when date is in the past", () => {
    test.each(CASES)(
      "should calculate from '%s' to $mockDate as %i days, %i hours, %i minutes",
      (date, ...exps: any[]) => {
        const diff = getDateDiff(new Date(date), MOCK_DATE); // just reverse args :)
        expectDateDiffEquals(diff, ...exps);
      }
    );
  });
});
