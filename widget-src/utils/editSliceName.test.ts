import { mockGetNodeById, mockRootFindOne } from "../../__mocks__/figmaMock";
import { BoxPropertyName } from "../constants";
import { editSliceName } from "./editSliceName";
import * as Utils from "./utils";
import * as RestoreBoxComponent from "./restoreBoxComponent";

const mockUpdateVariantName = jest.fn();
jest
  .spyOn(Utils, "updateVariantName")
  .mockImplementation(mockUpdateVariantName);

const mockSet = jest.fn();
const mockRestoreBoxComponent = jest.fn();
jest
  .spyOn(RestoreBoxComponent, "restoreBoxComponent")
  .mockImplementation(mockRestoreBoxComponent);

describe("editSliceName", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should change the name of a slice on the state and on related box instances", () => {
    mockRootFindOne.mockReturnValue({});
    mockGetNodeById.mockReturnValue({ type: "COMPONENT", name: "oldName" });

    editSliceName({
      e: { characters: "newName" },
      map: { set: mockSet } as unknown as SyncedMap,
      slice: {
        id: "1",
        name: "oldName",
        refIds: ["instance1", "instance2"],
        value: 1,
      },
    });

    expect(mockSet).toBeCalledWith("1", {
      id: "1",
      name: "newName",
      refIds: ["instance1", "instance2"],
      value: 1,
    });
    expect(mockGetNodeById).toBeCalledWith("instance1");
    expect(mockGetNodeById).toBeCalledWith("instance2");
    expect(mockUpdateVariantName).toBeCalledWith({
      instanceName: "oldName",
      newVariantName: "newName",
      propertyName: BoxPropertyName.Radius,
    });
  });
  it("should not change the name if e.characters is empty string", () => {
    mockRootFindOne.mockReturnValue({});
    mockGetNodeById.mockReturnValue({ type: "COMPONENT", name: "oldName" });

    editSliceName({
      e: { characters: "" },
      map: { set: mockSet } as unknown as SyncedMap,
      slice: {
        id: "1",
        name: "oldName",
        refIds: ["instance1", "instance2"],
        value: 1,
      },
    });

    expect(mockSet).toBeCalledWith("1", {
      id: "1",
      name: "oldName",
      refIds: ["instance1", "instance2"],
      value: 1,
    });
    expect(mockGetNodeById).toBeCalledWith("instance1");
    expect(mockGetNodeById).toBeCalledWith("instance2");
    expect(mockUpdateVariantName).toBeCalledWith({
      instanceName: "oldName",
      newVariantName: "oldName",
      propertyName: BoxPropertyName.Radius,
    });
  });
  it("should not call updateVariantName if getNodeById does not return anything", () => {
    mockRootFindOne.mockReturnValue({});
    mockGetNodeById.mockReturnValue(null);

    editSliceName({
      e: { characters: "" },
      map: { set: mockSet } as unknown as SyncedMap,
      slice: {
        id: "1",
        name: "oldName",
        refIds: ["instance1", "instance2"],
        value: 1,
      },
    });

    expect(mockSet).toBeCalledWith("1", {
      id: "1",
      name: "oldName",
      refIds: ["instance1", "instance2"],
      value: 1,
    });
    expect(mockGetNodeById).toBeCalledWith("instance1");
    expect(mockGetNodeById).toBeCalledWith("instance2");
    expect(mockUpdateVariantName).not.toBeCalled();
  });
  it("should call restoreBoxComponent if BOX is not found", () => {
    mockRootFindOne.mockReturnValue(null);
    mockGetNodeById.mockReturnValue({ type: "COMPONENT", name: "oldName" });

    editSliceName({
      e: { characters: "" },
      map: { set: mockSet } as unknown as SyncedMap,
      slice: {
        id: "1",
        name: "oldName",
        refIds: ["instance1", "instance2"],
        value: 1,
      },
    });

    expect(mockSet).toBeCalledWith("1", {
      id: "1",
      name: "oldName",
      refIds: ["instance1", "instance2"],
      value: 1,
    });
    expect(mockGetNodeById).not.toBeCalled();
    expect(mockUpdateVariantName).not.toBeCalled();
    expect(mockRestoreBoxComponent).toBeCalledTimes(1);
  });
});
