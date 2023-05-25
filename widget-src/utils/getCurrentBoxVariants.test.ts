import { getCurrentBoxVariants } from "./getCurrentBoxVariants";

describe("initTheme", () => {
  it("should return expected box variants", () => {
    const input = [
      {
        type: "COMPONENT",
        id: "1",
        name: "Radius=XS, Border width=A",
        cornerRadius: 1,
        strokeWeight: 2,
      },
      {
        type: "COMPONENT",
        id: "2",
        name: "Radius=XS, Border width=B",
        cornerRadius: 1,
        strokeWeight: 4,
      },
      {
        type: "COMPONENT",
        id: "3",
        name: "Radius=S, Border width=A",
        cornerRadius: 3,
        strokeWeight: 2,
      },
      {
        type: "COMPONENT",
        id: "4",
        name: "Radius=S, Border width=B",
        cornerRadius: 3,
        strokeWeight: 4,
      },
    ] as SceneNode[];

    expect(getCurrentBoxVariants(input)).toEqual({
      Radius: [
        { id: expect.any(String), name: "XS", value: 1, refIds: ["1", "2"] },
        { id: expect.any(String), name: "S", value: 3, refIds: ["3", "4"] },
      ],
      "Border width": [
        { id: expect.any(String), name: "A", value: 2, refIds: ["1", "3"] },
        { id: expect.any(String), name: "B", value: 4, refIds: ["2", "4"] },
      ],
    });
  });
  it("should ignore every object which is not a COMPONENT", () => {
    const input = [
      {
        type: "COMPONENT",
        id: "1",
        name: "Radius=XS",
        cornerRadius: 1,
        strokeWeight: 2,
      },
      {
        type: "RECTANGLE",
        id: "2",
        name: "Any name",
        cornerRadius: 1,
        strokeWeight: 4,
      },
    ] as SceneNode[];

    expect(getCurrentBoxVariants(input)).toEqual({
      Radius: [{ id: expect.any(String), name: "XS", value: 1, refIds: ["1"] }],
      "Border width": expect.any(Array),
    });
  });

  it("should set 0 as value if either cornerRadius or strokeWeight is figma.mixed", () => {
    const input = [
      {
        type: "COMPONENT",
        id: "1",
        name: "Radius=XS",
        cornerRadius: figma.mixed,
        strokeWeight: figma.mixed,
      },
    ] as SceneNode[];

    expect(getCurrentBoxVariants(input)).toEqual({
      Radius: [{ id: expect.any(String), name: "XS", value: 0, refIds: ["1"] }],
      "Border width": expect.any(Array),
    });
  });
});
