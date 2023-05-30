import {
  ComponentNames,
  defaultBoxVariants,
  BoxPropertyName,
} from "../constants";
import { Slice, SliceItem, Store } from "../types";
import { createBoxInstances } from "../utils/createBoxInstances";
import { getCurrentBoxVariants } from "../utils/getCurrentBoxVariants";
import { getVariantCombinations } from "../utils/getVariantCombinations";

const { widget } = figma;
const { useEffect } = widget;

export const useInitTheme = ({
  [Slice.Radii]: radiiMap,
  [Slice.BorderWidths]: borderWidthsMap,
}: Store) => {
  useEffect(() => {
    const boxComponent = figma.root.findOne(
      (node) =>
        node.type === "COMPONENT_SET" && node.name === ComponentNames.Box
    );

    if (radiiMap.size !== 0) {
      return;
    }

    let radiiSliceItems: SliceItem[] = [];
    let borderWidthsSliceItems: SliceItem[] = [];

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

    radiiSliceItems.forEach((sliceItem) => {
      radiiMap.set(sliceItem.id, sliceItem);
    });

    borderWidthsSliceItems.forEach((sliceItem) => {
      borderWidthsMap.set(sliceItem.id, sliceItem);
    });
  });
};
