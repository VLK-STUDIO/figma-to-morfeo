import { mockSyncedMap } from "../test-utils/mockSyncedMap";
import { syncColorLib, syncColorProperties } from "./syncColorLib";
import * as SyncColorLib from "./syncColorLib";

describe("syncColorLib", () => {
  it("should do nothing if each color on the state is up to date compared to the library", () => {
    const colorsMap = mockSyncedMap({
      "id-1": {
        id: "id-1",
        libStyleId: "lib-id-A",
        name: "primary",
        rgba: { r: 10, g: 20, b: 30, a: 1 },
      },
    });
    jest.spyOn(figma, "getStyleById").mockReturnValue({
      id: "lib-id-A",
      name: "primary",
      type: "PAINT",
      paints: [{ color: { r: 10, g: 20, b: 30 }, type: "SOLID", opacity: 1 }],
    } as unknown as PaintStyle);
    syncColorLib(colorsMap);

    expect(figma.createPaintStyle).not.toBeCalled();
  });

  it("should sync the properties for colors on the state which are different on the library", () => {
    const mockSyncColorProperties = jest.fn();
    jest
      .spyOn(SyncColorLib, "syncColorProperties")
      .mockImplementation(mockSyncColorProperties);

    const libColor = {
      id: "lib-id-A",
      name: "old-name",
      type: "PAINT",
      paints: [{ color: { r: 10, g: 20, b: 30 }, type: "SOLID" }],
    } as unknown as PaintStyle;
    const colorsMap = mockSyncedMap({
      "id-1": {
        id: "id-1",
        libStyleId: "lib-id-A",
        name: "new-name",
        rgba: { r: 10, g: 20, b: 30, a: 1 },
      },
    });
    jest.spyOn(figma, "getStyleById").mockReturnValue(libColor);

    syncColorLib(colorsMap);

    expect(figma.createPaintStyle).not.toBeCalled();
    expect(mockSyncColorProperties).toBeCalledTimes(1);
    expect(mockSyncColorProperties).toBeCalledWith(libColor, {
      name: "new-name",
      opacity: 1,
      color: { r: 10 / 255, g: 20 / 255, b: 30 / 255 }, // figma colors are in base one
    });
  });

  it("should create a new color on the library and update the libStyleId if can't be found or not a PAINT type", () => {
    const mockSyncColorProperties = jest.fn();
    jest
      .spyOn(SyncColorLib, "syncColorProperties")
      .mockImplementation(mockSyncColorProperties);
    jest
      .spyOn(figma, "createPaintStyle")
      .mockReturnValue({ id: "new-lib-id" } as any);
    const colorsMap = mockSyncedMap({
      "id-1": {
        id: "id-1",
        libStyleId: "lib-id-A",
        name: "new-name",
        rgba: { r: 10, g: 20, b: 30, a: 1 },
      },
    });
    jest.spyOn(figma, "getStyleById").mockReturnValue(null);

    syncColorLib(colorsMap);

    expect(figma.createPaintStyle).toBeCalled();
    expect(mockSyncColorProperties).toBeCalledTimes(1);
    expect(mockSyncColorProperties).toBeCalledWith(expect.any(Object), {
      name: "new-name",
      opacity: 1,
      color: { r: 10 / 255, g: 20 / 255, b: 30 / 255 }, // figma colors are in base one
    });

    expect(colorsMap.set).toBeCalledWith(
      "id-1",
      expect.objectContaining({
        libStyleId: "new-lib-id",
      })
    );
  });
});

describe("syncColorProperties", () => {
  it("should simply sync name and paints as expected", () => {
    jest.resetAllMocks();
    const paintStyle = {
      id: "id",
      type: "PAINT",
      name: "old-name",
      paints: [],
    } as unknown as PaintStyle;

    syncColorProperties(paintStyle, {
      color: { r: 10, g: 10, b: 10 },
      name: "new-name",
      opacity: 1,
    });

    expect(paintStyle).toEqual({
      id: "id",
      name: "new-name",
      paints: [{ color: { r: 10, g: 10, b: 10 }, opacity: 1, type: "SOLID" }],
      type: "PAINT",
    });
  });
});
