import { Slice, Store } from "../../types";

type Params = {
  id: string;
  textStylesMap: Store[Slice.TextStyles];
  fontSizesMap: Store[Slice.FontSizes];
};

export const deleteFontSize = ({ id, fontSizesMap, textStylesMap }: Params) => {
  if (fontSizesMap.size < 2) {
    figma.notify("Impossible to remove all slices. Please keep at least one", {
      error: true,
      timeout: 3000,
    });
    return;
  }

  fontSizesMap.delete(id);
  textStylesMap.values().forEach((textStyle) => {
    if (textStyle.fontSizeId === id) {
      textStylesMap.set(textStyle.id, {
        ...textStyle,
        fontSizeId: fontSizesMap.values()[0].id,
      });
    }
  });
};
