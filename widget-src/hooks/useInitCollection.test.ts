import { MORFEO_COLLECTION_NAME } from "../constants";
import { useInitCollection } from "./useInitCollection";

describe("useInitCollection", () => {
  it("should do nothing if the collection already exist", () => {
    jest
      .spyOn(figma.variables, "getVariableCollectionById")
      .mockReturnValue({} as any);
    const mockSetCollection = jest.fn();

    useInitCollection(
      { id: "", defaultModeId: "", name: "" },
      mockSetCollection
    );

    expect(mockSetCollection).not.toBeCalled();
    expect(figma.variables.createVariableCollection).not.toBeCalled();
  });

  it("should set the state if getVariableCollectionById doesn't find anything and there's a collection with matching name", () => {
    jest
      .spyOn(figma.variables, "getVariableCollectionById")
      .mockReturnValue(null);

    jest.spyOn(figma.variables, "getLocalVariableCollections").mockReturnValue([
      {
        id: "morfeo:collection:id",
        defaultModeId: "default:mode:id",
        name: MORFEO_COLLECTION_NAME,
      } as any,
    ]);
    const mockSetCollection = jest.fn();

    useInitCollection(
      { id: "", defaultModeId: "", name: "" },
      mockSetCollection
    );

    expect(mockSetCollection).toBeCalledWith({
      id: "morfeo:collection:id",
      defaultModeId: "default:mode:id",
      name: MORFEO_COLLECTION_NAME,
    });
    expect(figma.variables.createVariableCollection).not.toBeCalled();
  });

  it("should set the collection if getVariableCollectionById doesn't find anything and there's NOT any collection with matching name", () => {
    jest
      .spyOn(figma.variables, "getVariableCollectionById")
      .mockReturnValue(null);

    jest
      .spyOn(figma.variables, "getLocalVariableCollections")
      .mockReturnValue([]);
    const mockSetCollection = jest.fn();

    useInitCollection(
      { id: "", defaultModeId: "", name: "" },
      mockSetCollection
    );

    expect(mockSetCollection).toBeCalledWith({
      id: expect.any(String),
      defaultModeId: expect.any(String),
      name: MORFEO_COLLECTION_NAME,
    });
    expect(figma.variables.createVariableCollection).toBeCalledWith(
      MORFEO_COLLECTION_NAME
    );
  });
});
