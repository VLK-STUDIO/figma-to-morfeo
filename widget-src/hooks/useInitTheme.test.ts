import { defaultColorSliceItems } from "../constants";
import { mockSyncedMap } from "../test-utils/mockSyncedMap";
import { BoxSliceItem, ColorSliceItem, Slice } from "../types";
import { useInitTheme } from "./useInitTheme";

describe("useInitTheme", () => {
  it("should init the theme with default and create BOX if the state is empty and BOX does not exist", () => {
    jest.spyOn(figma.root, "findOne").mockReturnValue(null);
    const mockState = mockSyncedMap<BoxSliceItem>();
    useInitTheme({
      [Slice.Radii]: mockState,
      [Slice.BorderWidths]: mockState,
      [Slice.Colors]: mockSyncedMap(),
      [Slice.FontSizes]: mockSyncedMap(),
      [Slice.TextStyles]: mockSyncedMap(),
    });

    expect(figma.combineAsVariants).toBeCalled();
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

  it("should not create the BOX component and should not set the state if the state is not empty and the component exist", () => {
    jest
      .spyOn(figma.root, "findOne")
      .mockReturnValue({ type: "COMPONENT_SET" } as any);
    const mockState = mockSyncedMap({
      anyId: { id: "anyId", name: "A", refIds: [], value: 1 },
    });
    useInitTheme({
      [Slice.Radii]: mockState,
      [Slice.BorderWidths]: mockState,
      [Slice.Colors]: mockSyncedMap(),
      [Slice.FontSizes]: mockSyncedMap(),
      [Slice.TextStyles]: mockSyncedMap(),
    });
    expect(figma.combineAsVariants).not.toBeCalled();
    expect(mockState.set).not.toBeCalled();
  });

  it("should not create the BOX component and should set the state (with current box variants) if the state is empty and the component exist", () => {
    jest.spyOn(figma.root, "findOne").mockReturnValue({
      type: "COMPONENT_SET",
      children: [
        { id: "1", name: "Radius=A", cornerRadius: 10, type: "COMPONENT" },
        { id: "2", name: "Radius=B", cornerRadius: 20, type: "COMPONENT" },
      ],
    } as unknown as ComponentSetNode);
    const mockState = mockSyncedMap<BoxSliceItem>();
    useInitTheme({
      [Slice.Radii]: mockState,
      [Slice.BorderWidths]: mockState,
      [Slice.Colors]: mockSyncedMap(),
      [Slice.FontSizes]: mockSyncedMap(),
      [Slice.TextStyles]: mockSyncedMap(),
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
      [Slice.BorderWidths]: mockSyncedMap(),
      [Slice.Colors]: mockColorsState,
      [Slice.FontSizes]: mockSyncedMap(),
      [Slice.TextStyles]: mockSyncedMap(),
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
      [Slice.BorderWidths]: mockSyncedMap(),
      [Slice.Colors]: mockColorsState,
      [Slice.FontSizes]: mockSyncedMap(),
      [Slice.TextStyles]: mockSyncedMap(),
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
