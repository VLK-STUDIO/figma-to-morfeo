import { mockSyncedMap } from "../test-utils/mockSyncedMap";
import { ColorSliceItem } from "../types";
import { addColorSlice } from "./addColorSlice";
import * as SyncColorLib from "./syncColorLib";
const mockSyncColorLib = jest.fn();
jest.spyOn(SyncColorLib, "syncColorLib").mockImplementation(mockSyncColorLib);

describe("addColorSlice", () => {
  it("should add a new color on the library and on the state (and call syncColorLib)", () => {
    jest
      .spyOn(figma, "createPaintStyle")
      .mockReturnValueOnce({ id: "new-paint" } as any);
    const colorsMap = mockSyncedMap<ColorSliceItem>();
    addColorSlice(colorsMap);

    expect(figma.createPaintStyle).toBeCalledTimes(1);

    expect(colorsMap.set).toBeCalledTimes(1);
    expect(colorsMap.set).toBeCalledWith(expect.any(String), {
      id: expect.any(String),
      libStyleId: "new-paint",
      name: "New",
      rgba: { r: 0, g: 0, b: 0, a: 1 },
    });

    expect(mockSyncColorLib).toBeCalledTimes(1);
  });
});
