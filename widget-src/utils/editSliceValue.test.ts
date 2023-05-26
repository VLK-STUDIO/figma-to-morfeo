import { editSliceValue } from "./editSliceValue";
import * as RestoreBoxComponent from "./restoreBoxComponent";

const mockSet = jest.fn();
const mockRestoreBoxComponent = jest.fn();
jest
  .spyOn(RestoreBoxComponent, "restoreBoxComponent")
  .mockImplementation(mockRestoreBoxComponent);

describe("editSliceValue", () => {
  it("should change the value of a slice on the state and on related box instances", () => {
    jest.spyOn(figma.root, "findOne").mockReturnValue({} as any);
    jest.spyOn(figma, "getNodeById").mockReturnValue({
      type: "COMPONENT",
      name: "name",
      value: 0,
    } as any);

    editSliceValue({
      e: { characters: "1" },
      map: { set: mockSet } as unknown as SyncedMap,
      slice: {
        id: "1",
        name: "name",
        refIds: ["instance1", "instance2"],
        value: 1,
      },
      styleKey: "cornerRadius",
    });

    expect(mockSet).toBeCalledWith("1", {
      id: "1",
      name: "name",
      refIds: ["instance1", "instance2"],
      value: 1,
    });
    expect(figma.getNodeById).toBeCalledWith("instance1");
    expect(figma.getNodeById).toBeCalledWith("instance2");
    expect(figma.getNodeById).toBeCalledTimes(2);
  });
  it("should not change the value if e.characters is not a valid number", () => {
    jest.spyOn(figma.root, "findOne").mockReturnValue({} as any);
    jest.spyOn(figma, "getNodeById").mockReturnValue({
      type: "COMPONENT",
      name: "name",
      value: 1,
    } as any);

    editSliceValue({
      e: { characters: "any non-number string" },
      map: { set: mockSet } as unknown as SyncedMap,
      slice: {
        id: "1",
        name: "name",
        refIds: ["instance1", "instance2"],
        value: 1,
      },
      styleKey: "cornerRadius",
    });

    expect(mockSet).toBeCalledWith("1", {
      id: "1",
      name: "name",
      refIds: ["instance1", "instance2"],
      value: 1,
    });
    expect(figma.getNodeById).toBeCalledWith("instance1");
    expect(figma.getNodeById).toBeCalledWith("instance2");
    expect(figma.getNodeById).toBeCalledTimes(2);
  });
  it("should call restoreBoxComponent if BOX is not found", () => {
    jest.spyOn(figma.root, "findOne").mockReturnValue(null);
    jest.spyOn(figma, "getNodeById").mockReturnValue({
      type: "COMPONENT",
      name: "name",
      value: 1,
    } as any);

    editSliceValue({
      e: { characters: "2" },
      map: { set: mockSet } as unknown as SyncedMap,
      slice: {
        id: "1",
        name: "name",
        refIds: ["instance1", "instance2"],
        value: 2,
      },
      styleKey: "cornerRadius",
    });

    expect(mockSet).toBeCalledWith("1", {
      id: "1",
      name: "name",
      refIds: ["instance1", "instance2"],
      value: 2,
    });
    expect(figma.getNodeById).not.toBeCalled();
    expect(mockRestoreBoxComponent).toBeCalledTimes(1);
  });
  it("should not crash if getNodeById returns null", () => {
    jest.spyOn(figma.root, "findOne").mockReturnValue({} as any);
    jest.spyOn(figma, "getNodeById").mockReturnValue(null);

    editSliceValue({
      e: { characters: "2" },
      map: { set: mockSet } as unknown as SyncedMap,
      slice: {
        id: "1",
        name: "name",
        refIds: ["instance1", "instance2"],
        value: 2,
      },
      styleKey: "cornerRadius",
    });

    expect(mockSet).toBeCalledWith("1", {
      id: "1",
      name: "name",
      refIds: ["instance1", "instance2"],
      value: 2,
    });
    expect(figma.getNodeById).toBeCalledTimes(2);
  });
});
