import { MORFEO_COLLECTION_NAME } from "../constants";
import { MorfeoCollection } from "../types";

const { widget } = figma;
const { useEffect } = widget;

export const useInitCollection = (
  collection: MorfeoCollection,
  setCollection: (newCollection: MorfeoCollection) => void
) => {
  useEffect(() => {
    if (figma.variables.getVariableCollectionById(collection.id)) {
      return;
    }

    const documentCollections = figma.variables.getLocalVariableCollections();

    const morfeoCollection = documentCollections.find(
      (collection) => collection.name === MORFEO_COLLECTION_NAME
    );

    if (morfeoCollection) {
      const { id, name, defaultModeId } = morfeoCollection;
      setCollection({ id, name, defaultModeId });
    } else {
      const { id, name, defaultModeId } =
        figma.variables.createVariableCollection(MORFEO_COLLECTION_NAME);
      setCollection({ id, name, defaultModeId });
    }
  });
};
