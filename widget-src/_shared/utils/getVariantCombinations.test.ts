import { BoxPropertyName } from "../constants";
import { getVariantCombinations } from "./getVariantCombinations";

describe("get variant combinations", () => {
  it("should return expected combinations", () => {
    const res = getVariantCombinations([
      { propertyName: BoxPropertyName.Radius, variants: { S: 1, M: 2, L: 3 } },
      { propertyName: BoxPropertyName.BorderWidth, variants: { X: 1, Y: 2 } },
    ]);

    expect(res).toEqual([
      {
        name: "Radius=S, Border width=X",
        cornerRadius: 1,
        strokeWeight: 1,
      },
      {
        name: "Radius=S, Border width=Y",
        cornerRadius: 1,
        strokeWeight: 2,
      },
      {
        name: "Radius=M, Border width=X",
        cornerRadius: 2,
        strokeWeight: 1,
      },
      {
        name: "Radius=M, Border width=Y",
        cornerRadius: 2,
        strokeWeight: 2,
      },
      {
        name: "Radius=L, Border width=X",
        cornerRadius: 3,
        strokeWeight: 1,
      },
      {
        name: "Radius=L, Border width=Y",
        cornerRadius: 3,
        strokeWeight: 2,
      },
    ]);
  });

  it("should be possible to add a variant", () => {
    const res1 = getVariantCombinations([
      { propertyName: BoxPropertyName.Radius, variants: { XL: 10 } },
      { propertyName: BoxPropertyName.BorderWidth, variants: { X: 1, Y: 2 } },
    ]);

    const res2 = getVariantCombinations([
      {
        propertyName: BoxPropertyName.Radius,
        variants: { S: 1, M: 2, L: 3, XL: 10 },
      },
      { propertyName: BoxPropertyName.BorderWidth, variants: { Z: 4 } },
    ]);

    const result = [...res1, ...res2];

    expect(result).toEqual([
      expect.objectContaining({
        name: "Radius=XL, Border width=X",
        cornerRadius: 10,
        strokeWeight: 1,
      }),
      expect.objectContaining({
        name: "Radius=XL, Border width=Y",
        cornerRadius: 10,
        strokeWeight: 2,
      }),

      expect.objectContaining({
        name: "Radius=S, Border width=Z",
        cornerRadius: 1,
        strokeWeight: 4,
      }),
      expect.objectContaining({
        name: "Radius=M, Border width=Z",
        cornerRadius: 2,
        strokeWeight: 4,
      }),
      expect.objectContaining({
        name: "Radius=L, Border width=Z",
        cornerRadius: 3,
        strokeWeight: 4,
      }),
      expect.objectContaining({
        name: "Radius=XL, Border width=Z",
        cornerRadius: 10,
        strokeWeight: 4,
      }),
    ]);
  });
});
