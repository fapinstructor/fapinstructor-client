import { parseTags } from "../fetchPictures";

describe("fetchPictures tests", () => {
  test("parseTags should return an array of tags", () => {
    const input = "a, b, c";
    const expected = ["a", "b", "c"];

    const result = parseTags(input);
    expect(result).toEqual(expected);
  });
});
