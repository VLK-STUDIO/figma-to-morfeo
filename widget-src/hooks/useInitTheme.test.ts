import { defaultColorSliceItems } from "../constants";
import { mockSyncedMap } from "../test-utils/mockSyncedMap";
import { RadiiSliceItem, ColorSliceItem, Slice } from "../types";
import { useInitTheme } from "./useInitTheme";

describe.skip("useInitTheme", () => {
  it("should init radii with defaults if the state is empty and there are no radius variables", () => {
    const mockState = mockSyncedMap<RadiiSliceItem>();
    useInitTheme({
      [Slice.Radii]: mockState,
      [Slice.Colors]: mockSyncedMap(),
    });

    expect(mockState.set).toBeCalledWith(expect.any(String), {
      id: expect.any(String),
      name: "none",
      value: 0,
      refIds: expect.any(Array),
    });
    expect(mockState.set).toBeCalledWith(expect.any(String), {
      id: expect.any(String),
      name: "XS",
      value: 1,
      refIds: expect.any(Array),
    });
    expect(mockState.set).toBeCalledWith(expect.any(String), {
      id: expect.any(String),
      name: "L",
      value: 10,
      refIds: expect.any(Array),
    });
  });

  it("should not set radii if the state is not empty and there are matching variables", () => {
    const mockState = mockSyncedMap({
      anyId: { id: "anyId", name: "A", libStyleId: "", value: 0 },
    });
    useInitTheme({
      [Slice.Radii]: mockState,
      [Slice.Colors]: mockSyncedMap(),
    });
    expect(mockState.set).not.toBeCalled();
  });

  it("should use the variables to init the radii if the state is empty and radii variables are found", () => {
    const mockState = mockSyncedMap<RadiiSliceItem>();
    useInitTheme({
      [Slice.Radii]: mockState,
      [Slice.Colors]: mockSyncedMap(),
    });

    expect(figma.combineAsVariants).not.toBeCalled();
    expect(mockState.set).toBeCalledWith(expect.any(String), {
      id: expect.any(String),
      name: "A",
      value: 10,
      refIds: ["1"],
    });
    expect(mockState.set).toBeCalledWith(expect.any(String), {
      id: expect.any(String),
      name: "B",
      value: 20,
      refIds: ["2"],
    });
  });
  it("should init the colors with default values and add them to the library if the library have not solid colours", () => {
    jest.spyOn(figma, "getLocalPaintStyles").mockReturnValue([]);
    const mockColorsState = mockSyncedMap<ColorSliceItem>();
    useInitTheme({
      [Slice.Radii]: mockSyncedMap(),
      [Slice.Colors]: mockColorsState,
    });
    expect(mockColorsState.set).toBeCalledWith(defaultColorSliceItems[0].id, {
      ...defaultColorSliceItems[0],
      libStyleId: expect.any(String),
    });
    expect(mockColorsState.set).toBeCalledWith(defaultColorSliceItems[1].id, {
      ...defaultColorSliceItems[1],
      libStyleId: expect.any(String),
    });
    expect(figma.createPaintStyle).toBeCalledTimes(
      defaultColorSliceItems.length
    );
  });
  it("should init the colors with them if the library does have solid colours", () => {
    jest.spyOn(figma, "getLocalPaintStyles").mockReturnValue([
      {
        id: "paint-1",
        name: "primary",
        paints: [{ color: { r: 0.039, g: 0.039, b: 0.039 }, type: "SOLID" }],
        type: "PAINT",
      },
    ] as unknown as PaintStyle[]);
    const mockColorsState = mockSyncedMap<ColorSliceItem>();
    useInitTheme({
      [Slice.Radii]: mockSyncedMap(),
      [Slice.Colors]: mockColorsState,
    });
    expect(mockColorsState.set).toBeCalledWith("paint-1", {
      id: expect.any(String),
      name: "primary",
      rgba: { r: 10, g: 10, b: 10, a: 1 },
      libStyleId: "paint-1",
    });
    expect(figma.createPaintStyle).not.toBeCalled();
  });
});
