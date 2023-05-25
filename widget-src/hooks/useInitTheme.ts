import {
  BoxPropertyName,
  ComponentNames,
  defaultBoxVariants,
} from "../_shared/constants";
import { SliceItem } from "../_shared/types";
import { createBoxInstances } from "../_shared/utils/createBoxInstances";
import { getCurrentBoxVariants } from "../_shared/utils/getCurrentBoxVariants";
import {
  GetVariantsParams,
  getVariantCombinations,
} from "../_shared/utils/getVariantCombinations";

const { widget } = figma;
const { useEffect } = widget;

export const useInitTheme = (radiiMap: SyncedMap<SliceItem>) => {
  useEffect(() => {
    const boxComponent = figma.root.findOne(
      (node) =>
        node.type === "COMPONENT_SET" && node.name === ComponentNames.Box
    );

    if (radiiMap.size !== 0) {
      return;
    }

    let getVariantsParams: GetVariantsParams = defaultBoxVariants;
    let radiiSliceItems: SliceItem[] = [];

    if (!boxComponent) {
      const boxVariants = getVariantCombinations(getVariantsParams);
      const { instances, sliceItems } = createBoxInstances(boxVariants);

      radiiSliceItems = sliceItems[BoxPropertyName.Radius];
      const box = figma.combineAsVariants(instances, figma.currentPage);
      box.name = ComponentNames.Box;
    }

    if (boxComponent && boxComponent.type === "COMPONENT_SET") {
      const currentVariants = getCurrentBoxVariants(boxComponent.children);
      radiiSliceItems = currentVariants[BoxPropertyName.Radius];
    }

    radiiSliceItems.forEach((sliceItem) => {
      radiiMap.set(sliceItem.id, sliceItem);
    });
  });
};
