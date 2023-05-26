import { BoxPropertyName } from "../constants";
import { BoxSliceItems } from "../types";

const extractVariantName = (sliceName: string, instanceName: string) => {
  const slicePattern = new RegExp(`${sliceName}=([^,]+)`);
  const match = instanceName.match(slicePattern);
  return match ? match[1] : "";
};

export function getCurrentBoxVariants(
  input: readonly SceneNode[]
): BoxSliceItems {
  return input.reduce<BoxSliceItems>(
    (accumulator, current) => {
      if (current.type !== "COMPONENT") {
        return accumulator;
      }

      const { id, name: instanceName } = current;

      const cornerRadius =
        current.cornerRadius === figma.mixed ? 0 : current.cornerRadius;
      const strokeWeight =
        current.strokeWeight === figma.mixed ? 0 : current.strokeWeight;

      const radiusName = extractVariantName(
        BoxPropertyName.Radius,
        instanceName
      );
      const radiusIndex = accumulator[BoxPropertyName.Radius].findIndex(
        (item) => item.name === radiusName
      );
      if (radiusIndex === -1) {
        accumulator[BoxPropertyName.Radius].push({
          id: id,
          name: radiusName,
          refIds: [id],
          value: cornerRadius,
        });
      } else {
        accumulator[BoxPropertyName.Radius][radiusIndex].refIds.push(id);
      }

      const borderWidthName = extractVariantName(
        BoxPropertyName.BorderWidth,
        instanceName
      );
      const borderWidthIndex = accumulator[
        BoxPropertyName.BorderWidth
      ].findIndex((item) => item.name === borderWidthName);
      if (borderWidthIndex === -1) {
        accumulator[BoxPropertyName.BorderWidth].push({
          id: id,
          name: borderWidthName,
          refIds: [id],
          value: strokeWeight,
        });
      } else {
        accumulator[BoxPropertyName.BorderWidth][borderWidthIndex].refIds.push(
          id
        );
      }

      return accumulator;
    },
    {
      [BoxPropertyName.Radius]: [],
      [BoxPropertyName.BorderWidth]: [],
    }
  );
}
