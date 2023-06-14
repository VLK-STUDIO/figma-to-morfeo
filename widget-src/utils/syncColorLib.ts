import { ColorSliceItem } from "../types";
import { rgbaToFigmaColor } from "./colorUtils";

const checkPaintStyle = (
  paintStyle: BaseStyle | null,
  colorSliceItem: ColorSliceItem
) => {
  const _isPaint = (paintStyle: BaseStyle | null): paintStyle is PaintStyle =>
    !!paintStyle && (paintStyle as PaintStyle).type === "PAINT";
  const isPaint = _isPaint(paintStyle);
  const isMatchingName = isPaint && paintStyle.name === colorSliceItem.name;
  const isSingleLayer = isPaint && paintStyle.paints.length === 1;
  const isMatchingColorValues =
    isPaint &&
    paintStyle.paints[0].type === "SOLID" &&
    paintStyle.paints[0].color.r === colorSliceItem.rgba.r &&
    paintStyle.paints[0].color.g === colorSliceItem.rgba.g &&
    paintStyle.paints[0].color.b === colorSliceItem.rgba.b &&
    (paintStyle.paints[0].opacity || 1) === colorSliceItem.rgba.a;

  const isUpdateNeeded = !(
    isMatchingName &&
    isSingleLayer &&
    isMatchingColorValues
  );
  return { isPaint: _isPaint, isUpdateNeeded };
};

export const syncColorProperties = (
  paintStyle: PaintStyle,
  newProperties: { opacity: number; color: RGB; name: string }
) => {
  const { color, name, opacity } = newProperties;
  paintStyle.name = name;
  paintStyle.paints = [{ color, opacity, type: "SOLID" }];
};

export const syncColorLib = (colorsMap: SyncedMap<ColorSliceItem>) => {
  colorsMap.values().forEach((colorSliceItem) => {
    const paintStyle = figma.getStyleById(colorSliceItem.libStyleId);
    const { isPaint, isUpdateNeeded } = checkPaintStyle(
      paintStyle,
      colorSliceItem
    );
    if (!isUpdateNeeded) {
      return;
    }

    const { color, opacity } = rgbaToFigmaColor(colorSliceItem.rgba);
    if (isPaint(paintStyle)) {
      syncColorProperties(paintStyle, {
        opacity,
        color,
        name: colorSliceItem.name,
      });
      return;
    }

    const newPaintStyle = figma.createPaintStyle();
    syncColorProperties(newPaintStyle, {
      opacity,
      color,
      name: colorSliceItem.name,
    });
    colorsMap.set(colorSliceItem.id, {
      ...colorSliceItem,
      libStyleId: newPaintStyle.id,
    });
  });
};
