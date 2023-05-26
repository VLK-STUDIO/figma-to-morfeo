import { BoxPropertyName, ComponentNames } from "../../constants";
import { SliceItem } from "../../types";
import { createBoxInstances } from "../../utils/createBoxInstances";
import { getVariantCombinations } from "../../utils/getVariantCombinations";
import { restoreBoxComponent } from "../../utils/restoreBoxComponent";

export const addRadiiSlice = (radiiMap: SyncedMap<SliceItem>) => {
  const boxComponent = figma.root.findOne(
    (node) => node.type === "COMPONENT_SET" && node.name === ComponentNames.Box
  );
  if (boxComponent?.type === "COMPONENT_SET") {
    const boxVariants = getVariantCombinations([
      { propertyName: BoxPropertyName.Radius, variants: { N: 0 } },
    ]);
    const { instances, sliceItems } = createBoxInstances(boxVariants);
    instances.forEach((instance) => boxComponent.appendChild(instance));

    // save the updated state
    sliceItems[BoxPropertyName.Radius].forEach((sliceItem) =>
      radiiMap.set(sliceItem.id, sliceItem)
    );
  }

  if (!boxComponent) {
    restoreBoxComponent(radiiMap, { id: "N", name: "N", refIds: [], value: 0 });
  }
};
