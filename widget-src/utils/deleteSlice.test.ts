import { deleteSlice } from "./deleteSlice";
import * as RestoreBoxComponent from "./restoreBoxComponent";

const mockRestoreBoxComponent = jest.fn();
const mockDelete = jest.fn();
const mockRemove = jest.fn();
jest
  .spyOn(RestoreBoxComponent, "restoreBoxComponent")
  .mockImplementation(mockRestoreBoxComponent);

describe("deleteSlice", () => {
  it("should call notify and do nothing else if the state is empty", () => {
    deleteSlice("any id", {
      delete: mockDelete,
      size: 0,
    } as unknown as SyncedMap);

    expect(mockDelete).not.toBeCalled();
    expect(figma.notify).toBeCalledTimes(1);
  });

  it("should delete the slice and related instances if the box is found", () => {
    jest.spyOn(figma.root, "findOne").mockReturnValue({} as any);
    jest
      .spyOn(figma, "getNodeById")
      .mockReturnValue({ remove: mockRemove } as any);

    deleteSlice("any id", {
      delete: mockDelete,
      size: 1,
      get: () => ({ refIds: ["instance id 1", "instance id 2"] }),
    } as unknown as SyncedMap);

    expect(figma.notify).not.toBeCalled();
    expect(mockDelete).toBeCalledTimes(1);
    expect(mockRemove).toBeCalledTimes(2);
  });

  it("should not call remove if refIds is an empty array", () => {
    jest.spyOn(figma.root, "findOne").mockReturnValue({} as any);
    jest
      .spyOn(figma, "getNodeById")
      .mockReturnValue({ remove: mockRemove } as any);

    deleteSlice("any id", {
      delete: mockDelete,
      size: 1,
      get: () => undefined,
    } as unknown as SyncedMap);

    expect(mockRemove).not.toBeCalled();
  });

  it("should not call remove if getNodeById returns undefined", () => {
    jest.spyOn(figma.root, "findOne").mockReturnValue({} as any);
    jest.spyOn(figma, "getNodeById").mockReturnValue(null);

    deleteSlice("any id", {
      delete: mockDelete,
      size: 1,
      get: () => ({ refIds: ["1", "2"] }),
    } as unknown as SyncedMap);

    expect(mockRemove).not.toBeCalled();
  });

  it("should call restoreBoxComponent if box component is not found", () => {
    jest.spyOn(figma.root, "findOne").mockReturnValue(null);
    jest
      .spyOn(figma, "getNodeById")
      .mockReturnValue({ remove: mockRemove } as any);

    deleteSlice("any id", {
      delete: mockDelete,
      size: 1,
      get: () => ({ refIds: ["instance id 1", "instance id 2"] }),
    } as unknown as SyncedMap);

    expect(figma.notify).not.toBeCalled();
    expect(mockDelete).toBeCalledTimes(1);
    expect(mockRestoreBoxComponent).toBeCalledTimes(1);
  });
});
