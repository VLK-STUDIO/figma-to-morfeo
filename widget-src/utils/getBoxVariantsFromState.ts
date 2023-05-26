import { BoxPropertyName } from "../constants";
import { SliceItem } from "../types";
import { GetVariantsParams } from "./getVariantCombinations";

export const getBoxVariantsFromState = (
  radiiSliceItems: SliceItem[]
): GetVariantsParams => {
  const variants = radiiSliceItems.reduce<GetVariantsParams[0]["variants"]>(
    (acc, radiiSliceItem) => {
      return {
        ...acc,
        [radiiSliceItem.name]: radiiSliceItem.value,
      };
    },
    {}
  );

  return [{ propertyName: BoxPropertyName.Radius, variants }];
};
