import { defaultColorSliceItems, defaultRadiiSliceItems } from "../constants";
import { RadiiSliceItem, ColorSliceItem, Slice, Store } from "../types";
import {
  getColorStateFromPaintStyles,
  rgbaToFigmaColor,
} from "../utils/colorUtils";
import { getVariablesBySlice } from "../utils/getVariablesBySlice";

const { widget } = figma;
const { useEffect } = widget;

const createNewVariable = <T extends VariableValue>({
  name,
  collectionId,
  value,
  modeId,
  scope,
}: {
  name: string;
  value: T;
  collectionId: string;
  modeId: string;
  scope: VariableScope;
}) => {
  console.log(name);

  const newVar = figma.variables.createVariable(name, collectionId, "FLOAT");
  newVar.scopes = [scope];
  newVar.setValueForMode(modeId, value);
  return {
    id: newVar.id,
    name: newVar.name,
    value,
  };
};

export const useInitTheme = ({
  [Slice.Radii]: radiiMap,
  [Slice.Colors]: colorMap,
  morfeoCollection,
}: Store) => {
  useEffect(() => {
    const collection = figma.variables.getVariableCollectionById(
      morfeoCollection.id
    );
    if (radiiMap.size > 0 || !collection) {
      return;
    }

    let radiiSliceItems: RadiiSliceItem[] = [];
    let colorSliceItems: ColorSliceItem[] = [];

    const existingVariables = getVariablesBySlice(collection.variableIds);

    if (existingVariables[Slice.Radii]) {
      radiiSliceItems = existingVariables[Slice.Radii];
    } else {
      const { defaultModeId: modeId, id: collectionId } = morfeoCollection;
      radiiSliceItems = defaultRadiiSliceItems.map((defaultRadiiSliceItem) =>
        createNewVariable({
          ...defaultRadiiSliceItem,
          collectionId,
          modeId,
          scope: "CORNER_RADIUS",
        })
      );
    }

    const localPaintStyles = figma.getLocalPaintStyles();
    const existingColors = getColorStateFromPaintStyles(localPaintStyles);
    if (existingColors.length > 0) {
      colorSliceItems = existingColors;
    } else {
      colorSliceItems = defaultColorSliceItems.map(({ id, name, rgba }) => {
        const paintStyle = figma.createPaintStyle();
        paintStyle.name = name;
        const { color, opacity } = rgbaToFigmaColor(rgba);
        paintStyle.paints = [{ type: "SOLID", color, opacity }];
        return { name, rgba, id, libStyleId: paintStyle.id };
      });
    }

    radiiSliceItems.forEach((sliceItem) => {
      radiiMap.set(sliceItem.id, sliceItem);
    });

    colorSliceItems.forEach((sliceItem) => {
      colorMap.set(sliceItem.id, sliceItem);
    });
  });
};
