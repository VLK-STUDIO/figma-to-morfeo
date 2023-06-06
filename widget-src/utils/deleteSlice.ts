import { ComponentNames } from "../constants";
import { Slice, Store } from "../types";
import { restoreBoxComponent } from "./restoreBoxComponent";

export const deleteSlice = (params: {
  id: string;
  store: Store;
  sliceName: Slice;
}) => {
  const { id, sliceName, store } = params;
  const stateMap = store[sliceName];
  if (stateMap.size < 1) {
    figma.notify("Impossible to remove all slices. Please keep at least one", {
      error: true,
      timeout: 3000,
    });
    return;
  }

  const boxComponent = figma.root.findOne(
    (node) => node.type === "COMPONENT_SET" && node.name === ComponentNames.Box
  );

  const refIds = stateMap.get(id)?.refIds;
  stateMap.delete(id);

  if (boxComponent && refIds) {
    refIds.map((refId) => {
      figma.getNodeById(refId)?.remove();
    });
    return;
  }

  if (!boxComponent) {
    restoreBoxComponent(store);
  }
};
