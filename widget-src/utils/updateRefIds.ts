import { SliceItem } from "../types";

type Params = {
  newSliceItems: SliceItem[];
  stateMap: SyncedMap<SliceItem>;
};

/**
 * It adds the refIds from newSliceItems
 * to the provided stateMap
 */

export const updateRefIds = ({ newSliceItems, stateMap }: Params) => {
  stateMap.values().forEach((sliceItem) => {
    const newRefs = newSliceItems.find(
      ({ name }) => name === sliceItem.name
    )?.refIds;
    if (newRefs) {
      stateMap.set(sliceItem.id, {
        ...sliceItem,
        refIds: [...sliceItem.refIds, ...newRefs],
      });
    }
  });
};
