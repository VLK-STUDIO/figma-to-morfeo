import { getHexAndOpacity } from "./getHexAndOpacity";

describe("rgbaToHex", () => {
  it("should return a matching hex and opacity values", () => {
    const rgba: RGBA = {
      r: 87,
      g: 85,
      b: 182,
      a: 1,
    };

    const { hex, opacityPercent } = getHexAndOpacity(rgba);
    expect(hex).toEqual("5755B6");
    expect(opacityPercent).toEqual("100");
  });
});
