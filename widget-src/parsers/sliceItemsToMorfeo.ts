import { RadiiSliceItem, ColorSliceItem, Slice } from "../types";
import { rgbToColorString } from "polished";

type Slices = {
  [Slice.Radii]: RadiiSliceItem[];
  [Slice.Colors]: ColorSliceItem[];
};

type MorfeoTheme = Record<Slice, Record<string, string>>;

const simpleParser = (sliceItems: RadiiSliceItem[]) =>
  sliceItems.reduce<Record<string, string>>((acc, { name, value }) => {
    if (value === 0) {
      return {
        ...acc,
        [name]: `${value}`,
      };
    }
    return {
      ...acc,
      [name]: `${value}px`,
    };
  }, {});

const colorParser = (sliceItems: ColorSliceItem[]) =>
  sliceItems.reduce<Record<string, string>>((acc, { name, rgba }) => {
    const colorString = rgbToColorString({
      red: rgba.r,
      green: rgba.g,
      blue: rgba.b,
      alpha: rgba.a,
    });
    return {
      ...acc,
      [name]: colorString,
    };
  }, {});

export const sliceItemsToMorfeo = (slices: Slices): MorfeoTheme => {
  return {
    [Slice.Radii]: simpleParser(slices[Slice.Radii]),
    [Slice.Colors]: colorParser(slices[Slice.Colors]),
  };
};
