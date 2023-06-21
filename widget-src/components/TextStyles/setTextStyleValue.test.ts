import { mockSyncedMap } from "../../test-utils/mockSyncedMap";
import { TextStyleSliceItem } from "../../types";
import { setTextStyleValue } from "./setTextStyleValue";

describe("setTextStyleValue", () => {
  it("should set the expected value", () => {
    const textStyle: TextStyleSliceItem = {
      id: "text-style-1",
      name: "any name",
      fontSizeId: "font-size-id",
    };
    const textStylesMap = mockSyncedMap<TextStyleSliceItem>({
      [textStyle.id]: textStyle,
    });

    setTextStyleValue({
      textStylesMap,
      textStyle,
      newValue: "new-font-size-id",
      valueToChange: "fontSizeId",
    });
    expect(textStylesMap.set).toBeCalledTimes(1);
    expect(textStylesMap.set).toBeCalledWith(textStyle.id, {
      ...textStyle,
      fontSizeId: "new-font-size-id",
    });
  });
});
