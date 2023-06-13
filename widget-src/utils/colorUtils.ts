import { mix } from "polished";
import { parseToRgb } from "polished";
import { RgbColor, RgbaColor } from "polished/lib/types/color";
import { ColorSliceItem } from "../types";

export const toRgbString = (col: RGBA) => `rgb(${col.r},${col.g},${col.b})`;
export const toRgbaString = (col: RGBA) =>
  `rgba(${col.r},${col.g},${col.b},${col.a})`;
/** Convert a color which is in scale from 0-1 to a scale 0-255 */
const to255Scale = (color: number) => Math.round(color * 255);

export const polishedRgbToRgba = (polishedColor: RgbColor | RgbaColor) => ({
  r: polishedColor.red,
  g: polishedColor.green,
  b: polishedColor.blue,
  a: "alpha" in polishedColor ? polishedColor.alpha : 1,
});

export const recursiveMixColors = (colors: RGBA[]): RGBA => {
  const mixed = mixColors(colors[0], colors[1]);
  if (colors.length > 2) {
    const rgb = parseToRgb(mixed);
    const parsed = {
      r: rgb.red,
      g: rgb.green,
      b: rgb.blue,
      a: "alpha" in rgb ? rgb.alpha : 1,
    };

    const rest = colors.slice(2);

    return recursiveMixColors([parsed, ...rest]);
  }
  const rgb = parseToRgb(mixed);
  return polishedRgbToRgba(rgb);
};

export const mixColors = (color1: RGBA, color2: RGBA) => {
  const mixedColor = mix(color2.a, toRgbString(color2), toRgbaString(color1));
  return mixedColor;
};

const isSolid = (paint: Paint): paint is SolidPaint =>
  (paint as SolidPaint).type === "SOLID";

const paintsToRgba = (paints: readonly SolidPaint[]): RGBA[] => {
  return paints.map((paint) => {
    const { color, opacity = 1 } = paint;
    return {
      r: to255Scale(color.r),
      g: to255Scale(color.g),
      b: to255Scale(color.b),
      a: opacity,
    };
  });
};

const paintNormalizer = (paints: readonly Paint[]) => {
  if (!paints.every(isSolid)) {
    return; // NON-solid colours are ignored for the moment
  }

  const rgbaColors = paintsToRgba(paints);

  if (paints.length > 1) {
    const mixedColor = recursiveMixColors(rgbaColors);
    return mixedColor;
  }

  return rgbaColors[0];
};

export const getColorStateFromPaintStyles = (
  figmaPaintStyles: PaintStyle[]
) => {
  return figmaPaintStyles.reduce<ColorSliceItem[]>((acc, current) => {
    const newPaint = paintNormalizer(current.paints);
    if (newPaint) {
      const newColor: ColorSliceItem = {
        name: current.name,
        id: current.id,
        libStyleId: current.id,
        rgba: newPaint,
      };
      return [...acc, newColor];
    }
    return acc;
  }, []);
};

export const rgbaToFigmaColor = (rgba: RGBA) => {
  return {
    color: {
      r: rgba.r / 255,
      g: rgba.g / 255,
      b: rgba.b / 255,
    },
    opacity: rgba.a,
  };
};
