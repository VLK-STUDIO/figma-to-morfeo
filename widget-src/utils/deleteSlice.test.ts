import {
  mockGetNodeById,
  mockNotify,
  mockRootFindOne,
} from "../../__mocks__/figmaMock";
import { deleteSlice } from "./deleteSlice";
import * as RestoreBoxComponent from "./restoreBoxComponent";

const mockRestoreBoxComponent = jest.fn();
const mockDelete = jest.fn();
const mockRemove = jest.fn();
jest
  .spyOn(RestoreBoxComponent, "restoreBoxComponent")
  .mockImplementation(mockRestoreBoxComponent);

describe("deleteSlice", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should call notify and do nothing else if the state is empty", () => {
    deleteSlice("any id", {
      delete: mockDelete,
      size: 0,
    } as unknown as SyncedMap);

    expect(mockDelete).not.toBeCalled();
    expect(mockNotify).toBeCalledTimes(1);
  });

  it("should delete the slice and related instances if the box is found", () => {
    mockRootFindOne.mockReturnValue({});
    mockGetNodeById.mockReturnValue({ remove: mockRemove });

    deleteSlice("any id", {
      delete: mockDelete,
      size: 1,
      get: () => ({ refIds: ["instance id 1", "instance id 2"] }),
    } as unknown as SyncedMap);

    expect(mockNotify).not.toBeCalled();
    expect(mockDelete).toBeCalledTimes(1);
    expect(mockRemove).toBeCalledTimes(2);
  });

  it("should not call remove if refIds is an empty array", () => {
    mockRootFindOne.mockReturnValue({});
    mockGetNodeById.mockReturnValue({ remove: mockRemove });

    deleteSlice("any id", {
      delete: mockDelete,
      size: 1,
      get: () => undefined,
    } as unknown as SyncedMap);

    expect(mockRemove).not.toBeCalled();
  });

  it("should not call remove if getNodeById returns undefined", () => {
    mockRootFindOne.mockReturnValue({});
    mockGetNodeById.mockReturnValue(undefined);

    deleteSlice("any id", {
      delete: mockDelete,
      size: 1,
      get: () => ({ refIds: ["1", "2"] }),
    } as unknown as SyncedMap);

    expect(mockRemove).not.toBeCalled();
  });

  it("should call restoreBoxComponent if box component is not found", () => {
    mockRootFindOne.mockReturnValue(null);
    mockGetNodeById.mockReturnValue({ remove: mockRemove });

    deleteSlice("any id", {
      delete: mockDelete,
      size: 1,
      get: () => ({ refIds: ["instance id 1", "instance id 2"] }),
    } as unknown as SyncedMap);

    expect(mockNotify).not.toBeCalled();
    expect(mockDelete).toBeCalledTimes(1);
    expect(mockRestoreBoxComponent).toBeCalledTimes(1);
  });
});
