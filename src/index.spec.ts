import { sum } from "."

describe("Tests", () => {
  it.skip("should sum two numbers", () => {
    const a = 1;
    const b = 2;

    const result = sum(a, b);

    expect(result).toEqual(3);
  });
})