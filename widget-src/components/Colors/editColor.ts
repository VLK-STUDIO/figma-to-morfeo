import { parseToRgb } from "polished";
import { ColorSliceItem } from "../../types";
import { syncColorLib } from "../../utils/syncColorLib";

type BaseParams = {
  event: TextEditEvent;
  slice: ColorSliceItem;
  colorsMap: SyncedMap<ColorSliceItem>;
};

type Params = BaseParams & {
  valueToEdit: "name" | "hex" | "opacity";
};

type EditRgbaParams = BaseParams & {
  valueToEdit: "rgba";
  rgbaKey: keyof RGBA;
};

export const editName = ({ event, colorsMap, slice }: Params) => {
  const newName = event.characters || slice.name;
  colorsMap.set(slice.id, { ...slice, name: newName });
};

export const editHex = ({ event, colorsMap, slice }: Params) => {
  const newHexValue = event.characters || "000";
  try {
    const { red, green, blue } = parseToRgb(`#${newHexValue}`);
    colorsMap.set(slice.id, {
      ...slice,
      rgba: { ...slice.rgba, r: red, g: green, b: blue },
    });
  } catch (error) {
    figma.notify(
      "Failed setting new color value. Please provide a valid hex string",
      {
        error: true,
        timeout: 3000,
      }
    );
  }
};

export const editOpacity = ({ event, colorsMap, slice }: Params) => {
  const newOpacityPercent = Number(event.characters) || slice.rgba.a * 100;

  if (newOpacityPercent < 0 || newOpacityPercent > 100) {
    figma.notify(
      "Failed to set opacity. Please provide a number between 0 and 100",
      {
        error: true,
        timeout: 3000,
      }
    );
    return;
  }
  colorsMap.set(slice.id, {
    ...slice,
    rgba: { ...slice.rgba, a: newOpacityPercent / 100 },
  });
};

export const editRgbaColor = ({
  event,
  colorsMap,
  slice,
  rgbaKey,
}: EditRgbaParams) => {
  const newValue = Number(event.characters) || slice.rgba[rgbaKey];

  if (rgbaKey === "a" && (newValue < 0 || newValue > 1)) {
    figma.notify(
      `Failed to set ${rgbaKey.toUpperCase()}. Please provide a number between 0 and 1`,
      {
        error: true,
        timeout: 3000,
      }
    );
    return;
  }

  if (newValue < 0 || newValue > 255) {
    figma.notify(
      `Failed to set ${rgbaKey.toUpperCase()}. Please provide a number between 0 and 255`,
      {
        error: true,
        timeout: 3000,
      }
    );
    return;
  }
  colorsMap.set(slice.id, {
    ...slice,
    rgba: { ...slice.rgba, [rgbaKey]: Math.round(newValue) },
  });
};

export const editColor = (params: Params | EditRgbaParams) => {
  if (params.valueToEdit === "name") {
    editName(params);
  }

  if (params.valueToEdit === "hex") {
    editHex(params);
  }

  if (params.valueToEdit === "opacity") {
    editOpacity(params);
  }

  if (params.valueToEdit === "rgba") {
    editRgbaColor(params);
  }

  syncColorLib(params.colorsMap);
};
