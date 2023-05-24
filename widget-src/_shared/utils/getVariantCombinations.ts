import { BoxPropertyName, styleKeyByName } from "../constants";
import { BoxVariant } from "../types";

export type GetVariantsParams = {
  propertyName: BoxPropertyName;
  variants: { [key: string]: number };
}[];

export const getVariantCombinations = (
  slices: GetVariantsParams
): BoxVariant[] => {
  const [first, ...rest] = slices;

  const combinations: BoxVariant[] = Object.entries(first.variants).map(
    ([variantName, value]) =>
      ({
        name: `${first.propertyName}=${variantName}`,
        [styleKeyByName[first.propertyName]]: value,
      } as BoxVariant)
  );

  return rest.reduce((acc, { propertyName, variants }) => {
    const newResult = [];

    for (const combination of acc) {
      for (const [variantName, value] of Object.entries(variants)) {
        const newObj = { ...combination };
        newObj.name = `${newObj.name}, ${propertyName}=${variantName}`;
        newObj[styleKeyByName[propertyName]] = value;
        newResult.push(newObj);
      }
    }

    return newResult;
  }, combinations);
};
