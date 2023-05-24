import { SliceItem } from "../types";

export const updateVariantName = ({
  instanceName,
  newVariantName,
  sliceName,
}: {
  instanceName: string;
  newVariantName: string;
  sliceName: string;
}) => {
  const regex = new RegExp(`${sliceName}=[^,]+`, "i");
  const newSlice = `${sliceName}=${newVariantName}`;
  const updatedName = instanceName.slice().replace(regex, newSlice);
  return updatedName;
};

export const deleteSlice = (id: string, map: SyncedMap<SliceItem>) => {
  if (map.size > 1) {
    const refIds = map.get(id)?.refIds || [];
    map.delete(id);
    refIds.map((refId) => {
      figma.getNodeById(refId)?.remove();
    });
    return;
  }

  figma.notify("Impossible to remove all slices. Please keep at least one", {
    error: true,
    timeout: 3000,
  });
};

export const editSliceName = (params: {
  slice: SliceItem;
  e: TextEditEvent;
  map: SyncedMap<SliceItem>;
}) => {
  const { e, map, slice } = params;
  map.set(slice.id, {
    ...slice,
    name: e.characters || slice.name,
  });
  slice.refIds.map((refId) => {
    const variant = figma.getNodeById(refId);
    if (variant?.type === "COMPONENT") {
      variant.name = updateVariantName({
        instanceName: variant.name,
        newVariantName: e.characters,
        sliceName: "Radius",
      });
    }
  });
};

export const editSliceValue = (params: {
  slice: SliceItem;
  e: TextEditEvent;
  map: SyncedMap<SliceItem>;
}) => {
  const { e, map, slice } = params;
  const newValue = Number(e.characters) || slice.value;
  map.set(slice.id, {
    ...slice,
    value: newValue,
  });
  slice.refIds.map((refId) => {
    const variant = figma.getNodeById(refId);
    if (variant?.type === "COMPONENT") {
      variant.cornerRadius = newValue;
    }
  });
};
