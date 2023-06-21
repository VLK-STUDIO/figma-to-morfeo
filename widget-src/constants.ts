import {
  BoxStyleKeys,
  ColorSliceItem,
  FontSliceItem,
  TextStyleSliceItem,
} from "./types";
import { GetVariantsParams } from "./utils/getVariantCombinations";

export enum BoxPropertyName {
  Radius = "Radius",
  BorderWidth = "Border width",
}

export const styleKeyByName: Record<BoxPropertyName, BoxStyleKeys> = {
  [BoxPropertyName.Radius]: "cornerRadius",
  [BoxPropertyName.BorderWidth]: "strokeWeight",
};

export const defaultBoxVariants: GetVariantsParams = [
  {
    propertyName: BoxPropertyName.Radius,
    variants: { none: 0, XS: 1, L: 10 },
  },
  {
    propertyName: BoxPropertyName.BorderWidth,
    variants: { XS: 2, L: 3, M: 5 },
  },
];

export const defaultColorSliceItems: ColorSliceItem[] = [
  {
    id: "1",
    name: "primary",
    rgba: { r: 112, g: 215, b: 222, a: 1 },
    libStyleId: "",
  },
  {
    id: "2",
    name: "secondary",
    rgba: { r: 114, g: 222, b: 112, a: 1 },
    libStyleId: "",
  },
];

export const defaultFontSizeSliceItems: FontSliceItem[] = [
  {
    id: "A",
    name: "XS",
    value: 10,
  },
  {
    id: "B",
    name: "S",
    value: 12,
  },
  {
    id: "C",
    name: "M",
    value: 16,
  },
  {
    id: "D",
    name: "XXL",
    value: 80,
  },
];

export const defaultTextStylesSliceItems: TextStyleSliceItem[] = [
  {
    id: "#",
    name: "h1",
    fontSizeId: "A",
  },
];

export enum ComponentNames {
  Box = "BOX",
}

export enum StateKeys {
  IsHex = "isHex",
  IsDropdownVisible = "isDropdownVisible",
}
