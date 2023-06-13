import { ComponentNames } from "../constants";
import { BoxStyleKeys, Slice, BoxSliceItem, BoxStore } from "../types";
import { restoreBoxComponent } from "./restoreBoxComponent";

export const editSliceValue = (params: {
  slice: BoxSliceItem;
  event: TextEditEvent;
  styleKey: BoxStyleKeys;
  store: BoxStore;
  sliceName: Slice.BorderWidths | Slice.Radii;
}) => {
  const { event, slice, styleKey, store, sliceName } = params;
  const newValue = Number(event.characters) || slice.value;
  store[sliceName].set(slice.id, {
    ...slice,
    value: newValue,
  });

  const boxComponent = figma.root.findOne(
    (node) => node.type === "COMPONENT_SET" && node.name === ComponentNames.Box
  );

  if (boxComponent) {
    slice.refIds.forEach((refId) => {
      const variant = figma.getNodeById(refId);
      if (variant?.type === "COMPONENT") {
        variant[styleKey] = newValue;
      }
    });
    return;
  }
  restoreBoxComponent(store);
};
