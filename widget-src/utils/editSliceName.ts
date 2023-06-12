import { ComponentNames, BoxPropertyName } from "../constants";
import { BoxSliceItem, BoxStore, Slice } from "../types";
import { restoreBoxComponent } from "./restoreBoxComponent";
import { updateVariantName } from "./utils";

export const editSliceName = (params: {
  slice: BoxSliceItem;
  event: TextEditEvent;
  propertyName: BoxPropertyName;
  store: BoxStore;
  sliceName: Slice.BorderWidths | Slice.Radii;
}) => {
  const { event, slice, propertyName, sliceName, store } = params;
  const newName = event.characters || slice.name;
  store[sliceName].set(slice.id, {
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
          propertyName,
        });
      }
    });
    return;
  }
  restoreBoxComponent(store);
};
