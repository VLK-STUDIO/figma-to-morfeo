import { BoxPropertyName, ComponentNames } from "../constants";
import { SliceItem } from "../types";
import { createBoxInstances } from "./createBoxInstances";
import { getBoxVariantsFromState } from "./getBoxVariantsFromState";
import { getVariantCombinations } from "./getVariantCombinations";

/**
 *
 * It create a new box component, and override the state
 * using new instances created
 *
 * @param radiiMap the radii state map
 * @param additionalItem optional item to add to existing
 */

export const restoreBoxComponent = (
  radiiMap: SyncedMap<SliceItem>,
  additionalItem?: SliceItem
) => {
  const currentValues = radiiMap.values();
  const state = additionalItem
    ? [...currentValues, additionalItem]
    : currentValues;

  const getVariantsParams = getBoxVariantsFromState(state);
  const boxVariants = getVariantCombinations(getVariantsParams);
  const { instances, sliceItems } = createBoxInstances(boxVariants);

  const radiiSliceItems = sliceItems[BoxPropertyName.Radius];
  const box = figma.combineAsVariants(instances, figma.currentPage);

  box.name = ComponentNames.Box;

  // reset the state
  radiiMap.keys().forEach((key) => radiiMap.delete(key));
  // save the updated state
  radiiSliceItems.forEach((sliceItem) => radiiMap.set(sliceItem.id, sliceItem));
};
