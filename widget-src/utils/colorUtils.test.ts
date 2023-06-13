import { getColorStateFromPaintStyles, polishedRgbToRgba } from "./colorUtils";

describe("colorNormalizer", () => {
  it("should return the expected record of name and RGBA values", () => {
    const paintStyles = [
      {
        name: "Color 1",
        id: "id-1",
        description: "",
        paints: [
          { type: "SOLID", color: { r: 0.1234, g: 0.00123, b: 0.789234 } },
        ],
      },
      {
        name: "Color 2",
        id: "id-2",
        description: "",
        paints: [
          {
            type: "SOLID",
            color: { r: 0.412345, g: 0.223452, b: 0.31231231 },
            opacity: 0.6,
          },
        ],
      },
    ] as unknown as PaintStyle[];

    const result = getColorStateFromPaintStyles(paintStyles);

    expect(result).toEqual([
      {
        name: "Color 1",
        id: expect.any(String),
        rgba: { r: 31, g: 0, b: 201, a: 1 },
        libStyleId: "id-1",
      },
      {
        name: "Color 2",
        id: expect.any(String),
        rgba: {
          r: 105,
          g: 57,
          b: 80,
          a: 0.6,
        },
        libStyleId: "id-2",
      },
    ]);
  });

  it("should ignore all colours with a NON-SOLID paint layer", () => {
    const paintStyles = [
      {
        name: "invalid color 1",
        id: "",
        description: "",
        paints: [
          { type: "IMAGE", color: { r: 0.1234, g: 0.00123, b: 0.789234 } },
          { type: "SOLID", color: { r: 0, g: 0, b: 0 } },
        ],
      },
      {
        name: "invalid color 2",
        id: "",
        description: "",
        paints: [{ type: "VIDEO", scaleMode: "FILL", videoHash: "" }],
      },
      {
        name: "invalid color 3",
        id: "",
        description: "",
        paints: [
          {
            type: "GRADIENT_ANGULAR",
            gradientStops: [
              { color: { r: 0.1234, g: 0.00123, b: 0.789234 }, position: 1 },
            ],
            gradientTransform: [
              [1, 1, 1],
              [1, 1, 1],
            ],
          },
        ],
      },
      {
        name: "valid color",
        id: "valid-color-id",
        description: "",
        paints: [
          { type: "SOLID", color: { r: 0.1234, g: 0.00123, b: 0.789234 } },
        ],
      },
    ] as unknown as PaintStyle[];

    const result = getColorStateFromPaintStyles(paintStyles);

    expect(result).toEqual([
      {
        name: "valid color",
        id: expect.any(String),
        rgba: { r: 31, g: 0, b: 201, a: 1 },
        libStyleId: "valid-color-id",
      },
    ]);
  });

  it("should mix layers if a Paint contains many of them", () => {
    const paintStyles = [
      {
        name: "Color 1",
        id: "id-1",
        description: "",
        paints: [
          { type: "SOLID", color: { r: 1, g: 0, b: 0 } },
          {
            type: "SOLID",
            color: {
              r: 0.2784313725490196,
              g: 0.3333333333333333,
              b: 0.4117647058823529,
            },
            opacity: 0.53,
          },
        ],
      },
      {
        name: "Color 2",
        id: "id-2",
        description: "",
        paints: [
          { type: "SOLID", color: { r: 1, g: 0, b: 0 } },
          {
            type: "SOLID",
            color: {
              r: 0.13333333333333333,
              g: 0.9372549019607843,
              b: 0.00392156862745098,
            },
            opacity: 0.2,
          },
          {
            type: "SOLID",
            color: {
              r: 0.2784313725490196,
              g: 0.3333333333333333,
              b: 0.4117647058823529,
            },
            opacity: 0.53,
          },
        ],
      },
      {
        name: "Color 3",
        id: "id-3",
        description: "",
        paints: [
          { type: "SOLID", color: { r: 1, g: 0, b: 0 } },
          {
            type: "SOLID",
            color: {
              r: 0.13333333333333333,
              g: 0.9372549019607843,
              b: 0.00392156862745098,
            },
            opacity: 0.2,
          },
          {
            type: "SOLID",
            color: {
              r: 0.2784313725490196,
              g: 0.3333333333333333,
              b: 0.4117647058823529,
            },
            opacity: 0.53,
          },
          {
            type: "SOLID",
            color: {
              r: 0.06666666666666667,
              g: 0.5686274509803921,
              b: 0.592156862745098,
            },
            opacity: 0.6,
          },
        ],
      },
    ] as unknown as PaintStyle[];

    const result = getColorStateFromPaintStyles(paintStyles);
    expect(result).toEqual([
      {
        name: "Color 1",
        rgba: { r: 157, g: 45, b: 55, a: 1 }, // the color obtained with Figma' color picker is rgb(157, 45, 55)
        id: expect.any(String),
        libStyleId: "id-1",
      },
      {
        name: "Color 2",
        rgba: { r: 136, g: 67, b: 55, a: 1 }, // the color obtained with Figma' color picker is rgb(137, 68, 56)
        id: expect.any(String),
        libStyleId: "id-2",
      },
      {
        name: "Color 3",
        rgba: { r: 64, g: 113, b: 112, a: 1 }, // the color obtained with Figma' color picker is rgb(65, 114, 113)
        id: expect.any(String),
        libStyleId: "id-3",
      },
    ]);
  });
});

describe("polishedRgbToRgba", () => {
  it("should return a matching object", () => {
    const result = polishedRgbToRgba({
      red: 100,
      green: 50,
      blue: 50,
      alpha: 0.5,
    });
    expect(result).toEqual({ r: 100, g: 50, b: 50, a: 0.5 });
  });
  it("should have a: 1 if alpha is undefined", () => {
    const result = polishedRgbToRgba({ red: 100, green: 50, blue: 50 });
    expect(result).toEqual({ r: 100, g: 50, b: 50, a: 1 });
  });
});
