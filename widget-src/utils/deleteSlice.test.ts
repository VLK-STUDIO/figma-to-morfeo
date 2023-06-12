import { mockSyncedMap } from "../test-utils/mockSyncedMap";
import { BoxSliceItem, Slice } from "../types";
import { deleteSlice } from "./deleteSlice";
import * as RestoreBoxComponent from "./restoreBoxComponent";

const mockRestoreBoxComponent = jest.fn();
const mockRemove = jest.fn();
jest
  .spyOn(RestoreBoxComponent, "restoreBoxComponent")
  .mockImplementation(mockRestoreBoxComponent);

describe("deleteSlice", () => {
  it("should call notify and do nothing else if the state is empty", () => {
    const stateMap = mockSyncedMap<BoxSliceItem>();
    const store = {
      [Slice.Radii]: stateMap,
      [Slice.BorderWidths]: stateMap,
    };
    deleteSlice({ id: "anyId", sliceName: Slice.Radii, store });

    expect(stateMap.delete).not.toBeCalled();
    expect(figma.notify).toBeCalledTimes(1);
  });

  it("should delete the slice and related instances if the box is found", () => {
    jest.spyOn(figma.root, "findOne").mockReturnValue({} as any);
    jest
      .spyOn(figma, "getNodeById")
      .mockReturnValue({ remove: mockRemove } as any);

    const radiiStateMap = mockSyncedMap<BoxSliceItem>({
      anyId: {
        refIds: ["instance id 1", "instance id 2"],
        id: "anyId",
        name: "A",
        value: 1,
      },
    });
    const borderWidthsStateMap = mockSyncedMap<BoxSliceItem>();
    const store = {
      [Slice.Radii]: radiiStateMap,
      [Slice.BorderWidths]: borderWidthsStateMap,
    };

    deleteSlice({ store, id: "anyId", sliceName: Slice.Radii });

    expect(figma.notify).not.toBeCalled();
    expect(radiiStateMap.delete).toBeCalledTimes(1);
    expect(radiiStateMap.delete).toBeCalledWith("anyId");

    expect(mockRemove).toBeCalledTimes(2);
  });

  it("should not call remove if refIds is an empty array", () => {
    jest.spyOn(figma.root, "findOne").mockReturnValue({} as any);
    jest
      .spyOn(figma, "getNodeById")
      .mockReturnValue({ remove: mockRemove } as any);
    const stateMap = mockSyncedMap<BoxSliceItem>({
      anyId: {
        refIds: [],
        id: "anyId",
        name: "A",
        value: 1,
      },
    });
    const store = {
      [Slice.Radii]: stateMap,
      [Slice.BorderWidths]: stateMap,
    };

    deleteSlice({ id: "anyId", sliceName: Slice.Radii, store });

    expect(mockRemove).not.toBeCalled();
  });

  it("should not call remove if try to delete a non-existent item", () => {
    jest.spyOn(figma.root, "findOne").mockReturnValue({} as any);
    jest
      .spyOn(figma, "getNodeById")
      .mockReturnValue({ remove: mockRemove } as any);
    const stateMap = mockSyncedMap<BoxSliceItem>({
      anyId: {
        refIds: [],
        id: "anyId",
        name: "A",
        value: 1,
      },
    });
    const store = {
      [Slice.Radii]: stateMap,
      [Slice.BorderWidths]: stateMap,
    };

    deleteSlice({ id: "non-existent-items", sliceName: Slice.Radii, store });

    expect(mockRemove).not.toBeCalled();
  });

  it("should not call remove if getNodeById returns undefined", () => {
    jest.spyOn(figma.root, "findOne").mockReturnValue({} as any);
    jest.spyOn(figma, "getNodeById").mockReturnValue(null);

    const stateMap = mockSyncedMap<BoxSliceItem>({
      anyId: {
        refIds: ["instance id 1"],
        id: "anyId",
        name: "A",
        value: 1,
      },
    });
    const store = {
      [Slice.Radii]: stateMap,
      [Slice.BorderWidths]: stateMap,
    };

    deleteSlice({ id: "anyId", sliceName: Slice.Radii, store });

    expect(mockRemove).not.toBeCalled();
  });

  it("should call restoreBoxComponent if box component is not found", () => {
    jest.spyOn(figma.root, "findOne").mockReturnValue(null);
    jest
      .spyOn(figma, "getNodeById")
      .mockReturnValue({ remove: mockRemove } as any);

    const stateMap = mockSyncedMap<BoxSliceItem>({
      anyId: {
        refIds: ["instance id 1"],
        id: "anyId",
        name: "A",
        value: 1,
      },
    });
    const store = {
      [Slice.Radii]: stateMap,
      [Slice.BorderWidths]: stateMap,
    };

    deleteSlice({ id: "anyId", sliceName: Slice.Radii, store });

    expect(figma.notify).not.toBeCalled();
    expect(stateMap.delete).toBeCalledTimes(1);
    expect(mockRestoreBoxComponent).toBeCalledTimes(1);
  });
});
