import { ColorSliceItem } from "../types";
import { syncColorLib } from "./syncColorLib";

export const addColorSlice = (colorsMap: SyncedMap<ColorSliceItem>) => {
  const paintStyle = figma.createPaintStyle();
  paintStyle.name = "New";
  paintStyle.paints = [{ color: { r: 0, g: 0, b: 0 }, type: "SOLID" }];
  colorsMap.set(paintStyle.id, {
    id: paintStyle.id,
    libStyleId: paintStyle.id,
    name: paintStyle.name,
    rgba: { r: 0, g: 0, b: 0, a: 1 },
  });

  syncColorLib(colorsMap);
};
