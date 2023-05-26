import { BoxPropertyName } from "../constants";
import { BoxVariant, SliceItem } from "../types";
import { createBoxInstances } from "./createBoxInstances";

describe("createBoxInstances", () => {
  it("should return expected sliceItems", () => {
    const input: BoxVariant[] = [
      { name: "Radius=none, Border width=A", cornerRadius: 0, strokeWeight: 2 },
      { name: "Radius=none, Border width=B", cornerRadius: 0, strokeWeight: 3 },
      { name: "Radius=S, Border width=A", cornerRadius: 1, strokeWeight: 2 },
      { name: "Radius=S, Border width=B", cornerRadius: 1, strokeWeight: 3 },
    ];

    const result = createBoxInstances(input);

    const expected: Record<BoxPropertyName, SliceItem[]> = {
      [BoxPropertyName.Radius]: [
        {
          id: expect.any(String),
          name: "none",
          value: 0,
          refIds: [result.instances[0].id, result.instances[1].id],
        },
        {
          id: expect.any(String),
          name: "S",
          value: 1,
          refIds: [result.instances[2].id, result.instances[3].id],
        },
      ],
      [BoxPropertyName.BorderWidth]: [
        {
          id: expect.any(String),
          name: "A",
          value: 2,
          refIds: [result.instances[0].id, result.instances[2].id],
        },
        {
          id: expect.any(String),
          name: "B",
          value: 3,
          refIds: [result.instances[1].id, result.instances[3].id],
        },
      ],
    };

    expect(result.sliceItems).toEqual(expected);
  });
});
