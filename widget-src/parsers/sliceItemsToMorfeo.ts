import { BoxSliceItem, ColorSliceItem, MorfeoSlice, Slice } from "../types";
import { rgbToColorString } from "polished";

type Slices = {
  [Slice.BorderWidths]: BoxSliceItem[];
  [Slice.Radii]: BoxSliceItem[];
  [Slice.Colors]: ColorSliceItem[];
};

type MorfeoTheme = Record<MorfeoSlice, Record<string, string>>;

const simpleParser = (sliceItems: BoxSliceItem[]) =>
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
    [Slice.BorderWidths]: simpleParser(slices[Slice.BorderWidths]),
    [Slice.Colors]: colorParser(slices[Slice.Colors]),
    [Slice.FontSizes]: {},
  };
};
