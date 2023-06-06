import { SliceItem } from "../types";
import { GetVariantsParams } from "./getVariantCombinations";

export const getBoxVariantsFromState = (sliceItems: SliceItem[]) => {
  const variants = sliceItems.reduce<GetVariantsParams[0]["variants"]>(
    (acc, sliceItem) => {
      return {
        ...acc,
        [sliceItem.name]: sliceItem.value,
      };
    },
    {}
  );

  return variants;
};
