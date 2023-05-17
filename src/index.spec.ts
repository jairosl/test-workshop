import { sum } from "."

jest.useFakeTimers().setSystemTime()

describe("Tests", () => {
  it("should sum two numbers", () => {
    const a = 1
    const b = 2

    const result = sum(a, b);

    expect(result).toEqual(3);
  })
})