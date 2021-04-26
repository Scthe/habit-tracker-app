import { sortStringCmpFn } from "./index";

describe("sortStringCmpFn", () => {
  test("sorts the string", () => {
    const data = ["C", "B", "C", "A", "A", "B"];
    expect(data.sort(sortStringCmpFn)).toEqual(["A", "A", "B", "B", "C", "C"]);
  });
});
