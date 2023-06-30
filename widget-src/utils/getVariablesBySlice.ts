import { RadiiSliceItem, Slice } from "../types";

const getVariableValue = <T>(variable: Variable): T => {
  const { value } = variable.resolveForConsumer(figma.currentPage.children[0]);

  return value as T;
};

export const getVariablesBySlice = (variableIds: string[] | undefined = []) => {
  return variableIds.reduce<Partial<Record<Slice, RadiiSliceItem[]>>>(
    (acc, variableId) => {
      const variable = figma.variables.getVariableById(variableId);
      if (
        variable &&
        variable.scopes.length === 1 &&
        variable.scopes[0] === "CORNER_RADIUS"
      ) {
        const value = getVariableValue<number>(variable);
        return {
          ...acc,
          radii: [
            ...(acc[Slice.Radii] || []),
            {
              id: variable.id,
              name: variable.name,
              value,
            } satisfies RadiiSliceItem,
          ],
        };
      }
      return acc;
    },
    {}
  );
};
