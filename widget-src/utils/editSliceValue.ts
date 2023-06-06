import { ComponentNames } from "../constants";
import { SliceItem, BoxStyleKeys, Store, Slice } from "../types";
import { restoreBoxComponent } from "./restoreBoxComponent";

export const editSliceValue = (params: {
  slice: SliceItem;
  event: TextEditEvent;
  styleKey: BoxStyleKeys;
  store: Store;
  sliceName: Slice;
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
