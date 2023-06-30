import { defaultColorSliceItems } from "../constants";
import { RadiiSliceItem, ColorSliceItem, Slice, Store } from "../types";
import {
  getColorStateFromPaintStyles,
  rgbaToFigmaColor,
} from "../utils/colorUtils";

const { widget } = figma;
const { useEffect } = widget;

//TODO: refactor to init radii correctly (using variables)

export const useInitTheme = ({
  [Slice.Radii]: radiiMap,
  [Slice.Colors]: colorMap,
}: Store) => {
  useEffect(() => {
    if (radiiMap.size !== 0) {
      return;
    }

    let radiiSliceItems: RadiiSliceItem[] = [];
    let colorSliceItems: ColorSliceItem[] = [];

    const localPaintStyles = figma.getLocalPaintStyles();
    const existingColors = getColorStateFromPaintStyles(localPaintStyles);
    if (existingColors.length > 0) {
      colorSliceItems = existingColors;
    } else {
      colorSliceItems = defaultColorSliceItems.map(({ id, name, rgba }) => {
        const paintStyle = figma.createPaintStyle();
        paintStyle.name = name;
        const { color, opacity } = rgbaToFigmaColor(rgba);
        paintStyle.paints = [{ type: "SOLID", color, opacity }];
        return { name, rgba, id, libStyleId: paintStyle.id };
      });
    }

    radiiSliceItems.forEach((sliceItem) => {
      radiiMap.set(sliceItem.id, sliceItem);
    });

    colorSliceItems.forEach((sliceItem) => {
      colorMap.set(sliceItem.id, sliceItem);
    });
  });
};
