import { BoxSliceItem, ColorSliceItem, Slice } from "../types";

type Slices = {
  [Slice.BorderWidths]: BoxSliceItem[];
  [Slice.Radii]: BoxSliceItem[];
  [Slice.Colors]: ColorSliceItem[];
};

type MorfeoTheme = Record<Slice, Record<string, string>>;

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

export const sliceItemsToMorfeo = (slices: Slices): MorfeoTheme => {
  return {
    [Slice.Radii]: simpleParser(slices[Slice.Radii]),
    [Slice.BorderWidths]: simpleParser(slices[Slice.BorderWidths]),
    [Slice.Colors]: {},
  };
};
