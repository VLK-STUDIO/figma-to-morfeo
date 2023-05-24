import { BoxPropertyName, styleKeyByName } from "../constants";
import { BoxVariant, SliceItem } from "../types";

export const createBoxInstances = (variants: BoxVariant[]) => {
  const sliceItemsMap: Record<BoxPropertyName, Record<string, SliceItem>> = {
    [BoxPropertyName.Radius]: {},
    [BoxPropertyName.BorderWidth]: {},
  };

  const instances = variants.map((variant) => {
    const name = variant.name;
    const instance = figma.createComponent();

    instance.name = name;
    instance.cornerRadius = variant.cornerRadius || 0;
    instance.strokeWeight = variant.strokeWeight || 0;
    instance.layoutMode = "HORIZONTAL";
    instance.layoutAlign = "STRETCH";
    instance.counterAxisAlignItems = "CENTER";
    instance.primaryAxisAlignItems = "SPACE_BETWEEN";
    instance.counterAxisSizingMode = "AUTO";

    instance.fills = [{ type: "SOLID", color: { r: 0, g: 0, b: 0 } }];
    instance.strokes = [{ type: "SOLID", color: { r: 0, g: 0, b: 0 } }];
    instance.strokeAlign = "CENTER";

    name.split(", ").forEach((slice) => {
      const [boxPropertyName, variantName] = slice.split("=") as [
        BoxPropertyName,
        string
      ];
      const existingRefIds =
        sliceItemsMap[boxPropertyName]?.[variantName]?.refIds || [];

      sliceItemsMap[boxPropertyName] = {
        ...sliceItemsMap[boxPropertyName],
        [variantName]: sliceItemsMap[boxPropertyName]?.[variantName]
          ? ({
              ...sliceItemsMap[boxPropertyName]?.[variantName],
              refIds: [...existingRefIds, instance.id],
            } as SliceItem)
          : {
              id: instance.id,
              name: variantName,
              value: variant[styleKeyByName[boxPropertyName]],
              refIds: [instance.id],
            },
      };
    });

    return instance;
  });

  const sliceItems = {
    [BoxPropertyName.Radius]: Object.values(
      sliceItemsMap[BoxPropertyName.Radius]
    ),
    [BoxPropertyName.BorderWidth]: Object.values(
      sliceItemsMap[BoxPropertyName.BorderWidth]
    ),
  };

  return { instances, sliceItems };
};
