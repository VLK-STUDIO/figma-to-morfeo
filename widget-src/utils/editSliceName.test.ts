import { BoxPropertyName } from "../constants";
import { editSliceName } from "./editSliceName";
import * as Utils from "./utils";
import * as RestoreBoxComponent from "./restoreBoxComponent";

const mockSet = jest.fn();
const mockRestoreBoxComponent = jest.fn();
jest
  .spyOn(RestoreBoxComponent, "restoreBoxComponent")
  .mockImplementation(mockRestoreBoxComponent);

describe("editSliceName", () => {
  it("should change the name of a slice on the state and on related box instances", () => {
    const mockUpdateVariantName = jest.fn();
    jest.spyOn(figma.root, "findOne").mockReturnValue({} as any);
    jest
      .spyOn(figma, "getNodeById")
      .mockReturnValue({ type: "COMPONENT", name: "oldName" } as any);
    jest
      .spyOn(Utils, "updateVariantName")
      .mockImplementation(mockUpdateVariantName);

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
    expect(figma.getNodeById).toBeCalledWith("instance1");
    expect(figma.getNodeById).toBeCalledWith("instance2");
    expect(mockUpdateVariantName).toBeCalledWith({
      instanceName: "oldName",
      newVariantName: "newName",
      propertyName: BoxPropertyName.Radius,
    });
  });
  it("should not change the name if e.characters is empty string", () => {
    const mockUpdateVariantName = jest.fn();
    jest.spyOn(figma.root, "findOne").mockReturnValue({} as any);
    jest
      .spyOn(figma, "getNodeById")
      .mockReturnValue({ type: "COMPONENT", name: "oldName" } as any);
    jest
      .spyOn(Utils, "updateVariantName")
      .mockImplementation(mockUpdateVariantName);

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
    expect(figma.getNodeById).toBeCalledWith("instance1");
    expect(figma.getNodeById).toBeCalledWith("instance2");
    expect(mockUpdateVariantName).toBeCalledWith({
      instanceName: "oldName",
      newVariantName: "oldName",
      propertyName: BoxPropertyName.Radius,
    });
  });
  it("should not call updateVariantName if getNodeById does not return anything", () => {
    jest.spyOn(figma, "getNodeById").mockReturnValue(null);
    jest.spyOn(figma.root, "findOne").mockReturnValue({} as any);
    const mockUpdateVariantName = jest.fn();
    jest
      .spyOn(Utils, "updateVariantName")
      .mockImplementation(mockUpdateVariantName);

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
    expect(figma.getNodeById).toBeCalledWith("instance1");
    expect(figma.getNodeById).toBeCalledWith("instance2");
    expect(mockUpdateVariantName).not.toBeCalled();
  });
  it("should call restoreBoxComponent if BOX is not found", () => {
    jest.spyOn(figma.root, "findOne").mockReturnValue(null);
    const mockUpdateVariantName = jest.fn();
    jest
      .spyOn(Utils, "updateVariantName")
      .mockImplementation(mockUpdateVariantName);

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
    expect(mockUpdateVariantName).not.toBeCalled();
    expect(mockRestoreBoxComponent).toBeCalledTimes(1);
  });
});
