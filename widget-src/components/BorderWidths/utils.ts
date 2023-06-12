import { BoxPropertyName, ComponentNames } from "../../constants";
import { BoxStore, Slice } from "../../types";
import { createBoxInstances } from "../../utils/createBoxInstances";
import { getBoxVariantsFromState } from "../../utils/getBoxVariantsFromState";
import { getVariantCombinations } from "../../utils/getVariantCombinations";
import { restoreBoxComponent } from "../../utils/restoreBoxComponent";
import { updateRefIds } from "../../utils/updateRefIds";

export const addBorderWidthSlice = (store: BoxStore) => {
  const { [Slice.Radii]: radiiMap, [Slice.BorderWidths]: borderWidthsMap } =
    store;
  const boxComponent = figma.root.findOne(
    (node) => node.type === "COMPONENT_SET" && node.name === ComponentNames.Box
  );
  if (boxComponent?.type === "COMPONENT_SET") {
    const boxVariants = getVariantCombinations([
      { propertyName: BoxPropertyName.BorderWidth, variants: { N: 0 } },
      {
        propertyName: BoxPropertyName.Radius,
        variants: getBoxVariantsFromState(radiiMap.values()),
      },
    ]);
    const { instances, sliceItems } = createBoxInstances(boxVariants);
    instances.forEach((instance) => boxComponent.appendChild(instance));

    // save the updated state
    sliceItems[BoxPropertyName.BorderWidth].forEach((sliceItem) =>
      borderWidthsMap.set(sliceItem.id, sliceItem)
    );

    const newRadiiSliceItems = sliceItems[BoxPropertyName.Radius];
    updateRefIds({
      newSliceItems: newRadiiSliceItems,
      stateMap: radiiMap,
    });
  }

  if (!boxComponent) {
    borderWidthsMap.set("N", { id: "N", name: "N", refIds: [], value: 0 });
    restoreBoxComponent(store);
  }
};
