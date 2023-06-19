import { ColorSliceItem } from "../../types";
import { syncColorLib } from "../../utils/syncColorLib";

export const deleteColor = (
  slice: ColorSliceItem,
  colorsMap: SyncedMap<ColorSliceItem>
) => {
  if (colorsMap.size < 2) {
    figma.notify("Impossible to remove all slices. Please keep at least one", {
      error: true,
      timeout: 3000,
    });
    return;
  }
  colorsMap.delete(slice.id);
  const colorStyle = figma.getStyleById(slice.libStyleId);
  if (colorStyle) {
    colorStyle.remove();
  }
  syncColorLib(colorsMap);
};
