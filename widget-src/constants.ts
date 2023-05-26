import { BoxStyleKeys } from "./types";
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
];

export enum ComponentNames {
  Box = "BOX",
}