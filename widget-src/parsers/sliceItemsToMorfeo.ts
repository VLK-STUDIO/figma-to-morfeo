import { Slice, SliceItem } from "../types";

type Slices = Record<Slice, SliceItem[]>;

type MorfeoTheme = Record<Slice, Record<string, string>>;

const simpleParser = (sliceItems: { name: string; value: number }[]) =>
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
  };
};
