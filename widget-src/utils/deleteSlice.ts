import { ComponentNames } from "../constants";
import { SliceItem } from "../types";
import { restoreBoxComponent } from "./restoreBoxComponent";

export const deleteSlice = (id: string, map: SyncedMap<SliceItem>) => {
  if (map.size < 1) {
    figma.notify("Impossible to remove all slices. Please keep at least one", {
      error: true,
      timeout: 3000,
    });
    return;
  }

  const boxComponent = figma.root.findOne(
    (node) => node.type === "COMPONENT_SET" && node.name === ComponentNames.Box
  );

  const refIds = map.get(id)?.refIds || [];
  map.delete(id);

  if (boxComponent) {
    refIds.map((refId) => {
      figma.getNodeById(refId)?.remove();
    });
    return;
  }

  restoreBoxComponent(map);
};
