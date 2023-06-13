import { sliceItemsToMorfeo } from "../parsers/sliceItemsToMorfeo";
import { ActionTypes, Slice, Store } from "../types";

export const downloadTheme = (store: Store) => {
  const slices = {
    [Slice.Radii]: store.radii.values(),
    [Slice.BorderWidths]: store.borderWidths.values(),
    [Slice.Colors]: store.colors.values(),
  };

  const morfeoTheme = sliceItemsToMorfeo(slices);

  figma.showUI(__html__, { visible: false });
  figma.ui.postMessage({
    type: ActionTypes.downloadTheme,
    meta: morfeoTheme,
  });
};
