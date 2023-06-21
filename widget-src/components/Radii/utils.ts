import { BoxPropertyName, ComponentNames } from "../../constants";
import { BoxStore, Slice } from "../../types";
import { createBoxInstances } from "../../utils/createBoxInstances";
import { getBoxVariantsFromState } from "../../utils/getBoxVariantsFromState";
import { getVariantCombinations } from "../../utils/getVariantCombinations";
import { restoreBoxComponent } from "../../utils/restoreBoxComponent";
import { updateRefIds } from "../../utils/updateRefIds";

export const addRadiiSlice = (store: BoxStore) => {
  const { [Slice.Radii]: radiiMap, [Slice.BorderWidths]: borderWidthsMap } =
    store;
  const boxComponent = figma.root.findOne(
    (node) => node.type === "COMPONENT_SET" && node.name === ComponentNames.Box
  );
  if (boxComponent?.type === "COMPONENT_SET") {
    const boxVariants = getVariantCombinations([
      { propertyName: BoxPropertyName.Radius, variants: { N: 0 } },
      {
        propertyName: BoxPropertyName.BorderWidth,
        variants: getBoxVariantsFromState(borderWidthsMap.values()),
      },
    ]);
    const { instances, sliceItems } = createBoxInstances(boxVariants);
    instances.forEach((instance) => boxComponent.appendChild(instance));

    // save the updated state
    sliceItems[BoxPropertyName.Radius].forEach((sliceItem) =>
      radiiMap.set(sliceItem.id, sliceItem)
    );

    const newBorderWidthsSliceItems = sliceItems[BoxPropertyName.BorderWidth];
    updateRefIds({
      newSliceItems: newBorderWidthsSliceItems,
      stateMap: borderWidthsMap,
    });
  }

  if (!boxComponent) {
    radiiMap.set("N", { id: "N", name: "N", refIds: [], value: 0 });
    restoreBoxComponent(store);
  }
};
