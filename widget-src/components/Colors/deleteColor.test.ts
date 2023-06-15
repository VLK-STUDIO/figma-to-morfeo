import { mockSyncedMap } from "../../test-utils/mockSyncedMap";
import { ColorSliceItem } from "../../types";
import { deleteColor } from "./deleteColor";

describe("deleteColor", () => {
  it("should delete the color if there are at least 2 items", () => {
    const mockRemove = jest.fn();
    jest
      .spyOn(figma, "getStyleById")
      .mockReturnValue({ remove: mockRemove } as any);
    const slice1: ColorSliceItem = {
      id: "id-1",
      name: "primary",
      rgba: { r: 1, g: 1, b: 1, a: 1 },
      libStyleId: "lib-id-1",
    };
    const slice2: ColorSliceItem = {
      id: "id-2",
      name: "secondary",
      rgba: { r: 1, g: 1, b: 1, a: 1 },
      libStyleId: "lib-id-2",
    };
    const colorsMap = mockSyncedMap<ColorSliceItem>({
      [slice1.id]: slice1,
      [slice2.id]: slice2,
    });
    deleteColor(slice1, colorsMap);

    expect(figma.notify).not.toBeCalled();
    expect(colorsMap.delete).toBeCalledTimes(1);
    expect(colorsMap.delete).toBeCalledWith(slice1.id);
  });
  it("should not delete the color if there's one value or less and call notify", () => {
    const slice: ColorSliceItem = {
      id: "id-1",
      name: "primary",
      rgba: { r: 1, g: 1, b: 1, a: 1 },
      libStyleId: "lib-id",
    };
    const colorsMap = mockSyncedMap<ColorSliceItem>({ [slice.id]: slice });
    deleteColor(slice, colorsMap);

    expect(figma.notify).toBeCalledTimes(1);
    expect(figma.notify).toBeCalledWith(
      expect.any(String),
      expect.objectContaining({ error: true })
    );
  });
});
