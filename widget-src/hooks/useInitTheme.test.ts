import { defaultColorSliceItems } from "../constants";
import { mockSyncedMap } from "../test-utils/mockSyncedMap";
import { RadiiSliceItem, ColorSliceItem, Slice } from "../types";
import { useInitTheme } from "./useInitTheme";

describe("useInitTheme", () => {
  it("should init radii with defaults and call createVariable if the state is empty and there are no radius variables", () => {
    jest
      .spyOn(figma.variables, "getVariableCollectionById")
      .mockReturnValue({} as any);
    const mockState = mockSyncedMap<RadiiSliceItem>();
    useInitTheme({
      [Slice.Radii]: mockState,
      [Slice.Colors]: mockSyncedMap(),
      morfeoCollection: { id: "collection:id", defaultModeId: "", name: "" },
    });

    // set the state
    expect(mockState.set).toBeCalledWith(expect.any(String), {
      id: expect.any(String),
      name: "Radius/none",
      value: 0,
    });
    expect(mockState.set).toBeCalledWith(expect.any(String), {
      id: expect.any(String),
      name: "Radius/XS",
      value: 5,
    });
    expect(mockState.set).toBeCalledWith(expect.any(String), {
      id: expect.any(String),
      name: "Radius/S",
      value: 10,
    });

    // create variables
    expect(figma.variables.createVariable).toBeCalledWith(
      "Radius/none",
      "collection:id",
      "FLOAT"
    );
    expect(figma.variables.createVariable).toBeCalledWith(
      "Radius/XS",
      "collection:id",
      "FLOAT"
    );
    expect(figma.variables.createVariable).toBeCalledWith(
      "Radius/S",
      "collection:id",
      "FLOAT"
    );
  });

  it("should not set radii if the state is not empty", () => {
    jest
      .spyOn(figma.variables, "getVariableCollectionById")
      .mockReturnValue({} as any);
    const mockState = mockSyncedMap({
      anyId: { id: "anyId", name: "A", libStyleId: "", value: 0 },
    });
    useInitTheme({
      [Slice.Radii]: mockState,
      [Slice.Colors]: mockSyncedMap(),
      morfeoCollection: { id: "", defaultModeId: "", name: "" },
    });
    expect(mockState.set).not.toBeCalled();
  });

  it("should not set radii if the morfeo collection is not found", () => {
    jest
      .spyOn(figma.variables, "getVariableCollectionById")
      .mockReturnValue(null);
    const mockState = mockSyncedMap<RadiiSliceItem>();
    useInitTheme({
      [Slice.Radii]: mockState,
      [Slice.Colors]: mockSyncedMap(),
      morfeoCollection: { id: "", defaultModeId: "", name: "" },
    });
    expect(mockState.set).not.toBeCalled();
  });

  it("should use the variables to init the radii if the state is empty and radii variables are found", () => {
    jest
      .spyOn(figma.variables, "getVariableCollectionById")
      .mockReturnValue({ variableIds: ["id:1", "id:2"] } as any);
    jest.spyOn(figma.variables, "getVariableById").mockReturnValueOnce({
      id: "",
      name: "A",
      resolveForConsumer: () => ({ value: 10, resolvedType: "FLOAT" }),
      scopes: ["CORNER_RADIUS"],
    } as any);
    jest.spyOn(figma.variables, "getVariableById").mockReturnValue({
      id: "",
      name: "B",
      resolveForConsumer: () => ({ value: 20, resolvedType: "FLOAT" }),
      scopes: ["CORNER_RADIUS"],
    } as any);

    const mockState = mockSyncedMap<RadiiSliceItem>();
    useInitTheme({
      [Slice.Radii]: mockState,
      [Slice.Colors]: mockSyncedMap(),
      morfeoCollection: { id: "", defaultModeId: "", name: "" },
    });

    expect(mockState.set).toBeCalledWith(expect.any(String), {
      id: expect.any(String),
      name: "A",
      value: 10,
    });

    expect(mockState.set).toBeCalledWith(expect.any(String), {
      id: expect.any(String),
      name: "B",
      value: 20,
    });
  });

  it("should init the colors with default values and add them to the library if the library have not solid colours", () => {
    jest.spyOn(figma, "getLocalPaintStyles").mockReturnValue([]);
    const mockColorsState = mockSyncedMap<ColorSliceItem>();
    useInitTheme({
      [Slice.Radii]: mockSyncedMap(),
      [Slice.Colors]: mockColorsState,
      morfeoCollection: { id: "", defaultModeId: "", name: "" },
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
      morfeoCollection: { id: "", defaultModeId: "", name: "" },
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
