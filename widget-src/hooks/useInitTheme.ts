import {
  ComponentNames,
  defaultBoxVariants,
  BoxPropertyName,
  defaultColorSliceItems,
} from "../constants";
import { BoxSliceItem, ColorSliceItem, Slice, Store } from "../types";
import { createBoxInstances } from "../utils/createBoxInstances";
import { getCurrentBoxVariants } from "../utils/getCurrentBoxVariants";
import { getVariantCombinations } from "../utils/getVariantCombinations";
import {
  getColorStateFromPaintStyles,
  rgbaToFigmaColor,
} from "../utils/colorUtils";

const { widget } = figma;
const { useEffect } = widget;

export const useInitTheme = ({
  [Slice.Radii]: radiiMap,
  [Slice.BorderWidths]: borderWidthsMap,
  [Slice.Colors]: colorMap,
}: Store) => {
  useEffect(() => {
    const boxComponent = figma.root.findOne(
      (node) =>
        node.type === "COMPONENT_SET" && node.name === ComponentNames.Box
    );

    if (radiiMap.size !== 0) {
      return;
    }

    let radiiSliceItems: BoxSliceItem[] = [];
    let borderWidthsSliceItems: BoxSliceItem[] = [];
    let colorSliceItems: ColorSliceItem[] = [];

    if (!boxComponent) {
      const boxVariants = getVariantCombinations(defaultBoxVariants);
      const { instances, sliceItems } = createBoxInstances(boxVariants);

      radiiSliceItems = sliceItems[BoxPropertyName.Radius];
      borderWidthsSliceItems = sliceItems[BoxPropertyName.BorderWidth];
      const box = figma.combineAsVariants(instances, figma.currentPage);
      box.name = ComponentNames.Box;
    }

    if (boxComponent && boxComponent.type === "COMPONENT_SET") {
      const currentVariants = getCurrentBoxVariants(boxComponent.children);
      radiiSliceItems = currentVariants[BoxPropertyName.Radius];
      borderWidthsSliceItems = currentVariants[BoxPropertyName.BorderWidth];
    }

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

    borderWidthsSliceItems.forEach((sliceItem) => {
      borderWidthsMap.set(sliceItem.id, sliceItem);
    });

    colorSliceItems.forEach((sliceItem) => {
      colorMap.set(sliceItem.id, sliceItem);
    });
  });
};
