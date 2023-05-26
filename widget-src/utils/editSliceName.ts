import { ComponentNames, BoxPropertyName } from "../constants";
import { SliceItem } from "../types";
import { restoreBoxComponent } from "./restoreBoxComponent";
import { updateVariantName } from "./utils";

export const editSliceName = (params: {
  slice: SliceItem;
  e: TextEditEvent;
  map: SyncedMap<SliceItem>;
}) => {
  const { e, map, slice } = params;
  const newName = e.characters || slice.name;
  map.set(slice.id, {
    ...slice,
    name: newName,
  });

  const boxComponent = figma.root.findOne(
    (node) => node.type === "COMPONENT_SET" && node.name === ComponentNames.Box
  );

  if (boxComponent) {
    slice.refIds.forEach((refId) => {
      const variant = figma.getNodeById(refId);
      if (variant) {
        variant.name = updateVariantName({
          instanceName: variant.name,
          newVariantName: newName,
          propertyName: BoxPropertyName.Radius,
        });
      }
    });
    return;
  }
  restoreBoxComponent(map);
};
