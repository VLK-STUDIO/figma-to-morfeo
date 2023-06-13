import { mockSyncedMap } from "../test-utils/mockSyncedMap";
import { BoxSliceItem } from "../types";
import { updateRefIds } from "./updateRefIds";

describe("updateRefIds", () => {
  it("should add refIds saved on newSliceItems to the existing stateMap", () => {
    const newSliceItems: BoxSliceItem[] = [
      { id: "anyId", name: "A", refIds: ["newRef1", "newRef2"], value: 0 },
      { id: "anyId:2", name: "B", refIds: ["newRef3", "newRef4"], value: 1 },
    ];

    const mockStateMap = mockSyncedMap({
      "anyId:a": {
        id: "anyId:a",
        name: "A",
        refIds: ["oldRef1", "oldRef2"],
        value: 0,
      },
      "anyId:b": {
        id: "anyId:b",
        name: "B",
        refIds: ["oldRef3", "oldRef4"],
        value: 1,
      },
    });

    updateRefIds({ newSliceItems, stateMap: mockStateMap });

    expect(mockStateMap.set).toBeCalledTimes(2);
    expect(mockStateMap.set).toBeCalledWith("anyId:a", {
      id: "anyId:a",
      name: "A",
      refIds: ["oldRef1", "oldRef2", "newRef1", "newRef2"],
      value: 0,
    });
    expect(mockStateMap.set).toBeCalledWith("anyId:b", {
      id: "anyId:b",
      name: "B",
      refIds: ["oldRef3", "oldRef4", "newRef3", "newRef4"],
      value: 1,
    });
  });
  it("should not add anything if the name doesn't match", () => {
    const newSliceItems: BoxSliceItem[] = [
      { id: "anyId", name: "A", refIds: ["newRef1", "newRef2"], value: 0 },
      { id: "anyId:2", name: "B", refIds: ["newRef3", "newRef4"], value: 1 },
    ];

    const mockStateMap = mockSyncedMap({
      "anyId:a": {
        id: "anyId:a",
        name: "notMatchingName",
        refIds: ["oldRef1", "oldRef2"],
        value: 0,
      },
    });

    updateRefIds({ newSliceItems, stateMap: mockStateMap });

    expect(mockStateMap.set).not.toBeCalled();
  });
});
