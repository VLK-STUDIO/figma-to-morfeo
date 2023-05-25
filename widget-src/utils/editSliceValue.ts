import { ComponentNames } from "../constants";
import { SliceItem, BoxStyleKeys } from "../types";
import { restoreBoxComponent } from "./restoreBoxComponent";

export const editSliceValue = (params: {
  slice: SliceItem;
  e: TextEditEvent;
  map: SyncedMap<SliceItem>;
  styleKey: BoxStyleKeys;
}) => {
  const { e, map, slice, styleKey } = params;
  const newValue = Number(e.characters) || slice.value;
  map.set(slice.id, {
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
  restoreBoxComponent(map);
};
