import { mockGetNodeById, mockRootFindOne } from "../../../__mocks__/figmaMock";
import { editSliceValue } from "./editSliceValue";
import * as RestoreBoxComponent from "./restoreBoxComponent";

const mockSet = jest.fn();
const mockRestoreBoxComponent = jest.fn();
jest
  .spyOn(RestoreBoxComponent, "restoreBoxComponent")
  .mockImplementation(mockRestoreBoxComponent);

describe("editSliceValue", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should change the value of a slice on the state and on related box instances", () => {
    mockRootFindOne.mockReturnValue({});
    mockGetNodeById.mockReturnValue({
      type: "COMPONENT",
      name: "name",
      value: 0,
    });

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
    expect(mockGetNodeById).toBeCalledWith("instance1");
    expect(mockGetNodeById).toBeCalledWith("instance2");
  });
  it("should not change the value if e.characters is not a valid number", () => {
    mockRootFindOne.mockReturnValue({});
    mockGetNodeById.mockReturnValue({
      type: "COMPONENT",
      name: "name",
      value: 1,
    });

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
    expect(mockGetNodeById).toBeCalledWith("instance1");
    expect(mockGetNodeById).toBeCalledWith("instance2");
  });
  it("should call restoreBoxComponent if BOX is not found", () => {
    mockRootFindOne.mockReturnValue(null);
    mockGetNodeById.mockReturnValue({
      type: "COMPONENT",
      name: "name",
      value: 1,
    });

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
    expect(mockGetNodeById).not.toBeCalled();
    expect(mockRestoreBoxComponent).toBeCalledTimes(1);
  });
  it("should not crash if getNodeById returns null", () => {
    mockRootFindOne.mockReturnValue({});
    mockGetNodeById.mockReturnValue(null);

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
    expect(mockGetNodeById).toBeCalledTimes(2);
  });
});
