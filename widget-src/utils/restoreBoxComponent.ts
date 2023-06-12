import { BoxPropertyName, ComponentNames } from "../constants";
import { BoxStore, Slice } from "../types";
import { createBoxInstances } from "./createBoxInstances";
import { getBoxVariantsFromState } from "./getBoxVariantsFromState";
import { getVariantCombinations } from "./getVariantCombinations";

/**
 *
 * It create a new box component, and override the state
 * using new instances created
 */

export const restoreBoxComponent = (store: BoxStore) => {
  const { [Slice.Radii]: radiiMap, [Slice.BorderWidths]: borderWidthsMap } =
    store;

  const radiiState = radiiMap.values();
  const borderWidthsState = borderWidthsMap.values();

  const radiiVariants = getBoxVariantsFromState(radiiState);
  const borderWidthsVariants = getBoxVariantsFromState(borderWidthsState);

  const boxVariants = getVariantCombinations([
    { propertyName: BoxPropertyName.Radius, variants: radiiVariants },
    {
      propertyName: BoxPropertyName.BorderWidth,
      variants: borderWidthsVariants,
    },
  ]);
  const { instances, sliceItems } = createBoxInstances(boxVariants);

  const {
    [BoxPropertyName.Radius]: radiiSliceItems,
    [BoxPropertyName.BorderWidth]: borderWidthSliceItems,
  } = sliceItems;
  const box = figma.combineAsVariants(instances, figma.currentPage);

  box.name = ComponentNames.Box;

  // reset the state
  radiiMap.keys().forEach((key) => radiiMap.delete(key));
  borderWidthsMap.keys().forEach((key) => borderWidthsMap.delete(key));
  // save the updated state
  radiiSliceItems.forEach((sliceItem) => radiiMap.set(sliceItem.id, sliceItem));
  borderWidthSliceItems.forEach((sliceItem) =>
    borderWidthsMap.set(sliceItem.id, sliceItem)
  );
};
