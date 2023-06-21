import { mockSyncedMap } from "../../test-utils/mockSyncedMap";
import { FontSliceItem, TextStyleSliceItem } from "../../types";
import { deleteFontSize } from "./deleteFontSize";

describe("deleteFontSize", () => {
  it("should delete a fontSize and replace the reference on textStyles when is used in one of them", () => {
    const fontSizesMap = mockSyncedMap<FontSliceItem>({
      "font-size-1": { id: "font-size-1", name: "any name", value: 10 },
      "font-size-2": { id: "font-size-2", name: "any name", value: 20 },
    });
    const textStylesMap = mockSyncedMap<TextStyleSliceItem>({
      "text-style-1": {
        id: "text-style-1",
        name: "any name",
        fontSizeId: "font-size-1",
      },
    });
    deleteFontSize({ id: "font-size-1", fontSizesMap, textStylesMap });

    expect(fontSizesMap.delete).toBeCalledTimes(1);
    expect(fontSizesMap.delete).toBeCalledWith("font-size-1");
    expect(textStylesMap.set).toBeCalledWith("text-style-1", {
      id: "text-style-1",
      name: "any name",
      fontSizeId: "font-size-2",
    });
  });
  it("should prevent the user to delete all slices", () => {
    const fontSizesMap = mockSyncedMap<FontSliceItem>({
      "font-size-1": { id: "font-size-1", name: "any name", value: 10 },
    });
    const textStylesMap = mockSyncedMap<TextStyleSliceItem>();
    deleteFontSize({ id: "font-size-1", fontSizesMap, textStylesMap });

    expect(fontSizesMap.delete).not.toBeCalled();
    expect(figma.notify).toBeCalledTimes(1);
    expect(figma.notify).toBeCalledWith(
      expect.any(String),
      expect.objectContaining({ error: true })
    );
  });
});
