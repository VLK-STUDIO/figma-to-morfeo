import { ComponentNames } from "../../constants";
import { mockSyncedMap } from "../../test-utils/mockSyncedMap";
import { Slice, SliceItem } from "../../types";
import * as UpdateRefIds from "../../utils/updateRefIds";
import { addBorderWidthSlice } from "./utils";

describe("addRadiiSlice", () => {
  it("should add new sliceItems on the state and append new instances to the box", () => {
    const mockAppendChild = jest.fn();
    jest.spyOn(figma.root, "findOne").mockReturnValue({
      type: "COMPONENT_SET",
      name: ComponentNames.Box,
      appendChild: mockAppendChild,
    } as any);
    const spyUpdateRefIds = jest.spyOn(UpdateRefIds, "updateRefIds");

    const mockBorderWidthsMap = mockSyncedMap({
      "1": { id: "1", name: "S", refIds: [], value: 1 },
    });
    const mockRadiiMap = mockSyncedMap({
      "1": { id: "1", name: "A", refIds: [], value: 3 },
      "2": { id: "2", name: "B", refIds: [], value: 6 },
    });

    addBorderWidthSlice({
      [Slice.BorderWidths]: mockBorderWidthsMap,
      [Slice.Radii]: mockRadiiMap,
    });

    expect(mockBorderWidthsMap.set).toBeCalledWith(expect.any(String), {
      id: expect.any(String),
      name: "N",
      value: 0,
      refIds: expect.any(Array),
    } as SliceItem);
    expect(mockBorderWidthsMap.set).toBeCalledTimes(1);

    expect(mockAppendChild).toBeCalledWith(
      expect.objectContaining({
        name: "Border width=N, Radius=A",
        cornerRadius: 3,
        strokeWeight: 0,
      })
    );
    expect(mockAppendChild).toBeCalledWith(
      expect.objectContaining({
        name: "Border width=N, Radius=B",
        cornerRadius: 6,
        strokeWeight: 0,
      })
    );
    expect(mockAppendChild).toBeCalledTimes(2);

    expect(spyUpdateRefIds).toBeCalledWith({
      newSliceItems: [
        {
          id: expect.any(String),
          name: "A",
          refIds: [expect.any(String)],
          value: 3,
        },
        {
          id: expect.any(String),
          name: "B",
          refIds: [expect.any(String)],
          value: 6,
        },
      ],
      stateMap: expect.any(Object),
    });
  });

  it("should create a new box component and restore the state with the new instances if BOX is not found", () => {
    const mockAppendChild = jest.fn();
    const spyUpdateRefIds = jest.spyOn(UpdateRefIds, "updateRefIds");
    jest.spyOn(figma.root, "findOne").mockReturnValue(null);
    const mockBorderWidthsMap = mockSyncedMap({
      "1": { id: "1", name: "S", refIds: ["abc"], value: 1 },
    });
    const mockRadiiMap = mockSyncedMap({
      "1": { id: "1", name: "A", refIds: [], value: 3 },
      "2": { id: "2", name: "B", refIds: [], value: 6 },
    });

    addBorderWidthSlice({
      [Slice.Radii]: mockRadiiMap,
      [Slice.BorderWidths]: mockBorderWidthsMap,
    });

    expect(mockAppendChild).not.toBeCalled();
    expect(figma.combineAsVariants).toBeCalledTimes(1);
    expect(spyUpdateRefIds).not.toBeCalled();

    // reset state
    expect(mockBorderWidthsMap.delete).toBeCalledTimes(2);
    // set up new state (updated sliceItems + new one)
    expect(mockBorderWidthsMap.set).toBeCalledWith(expect.any(String), {
      id: expect.any(String),
      name: "N",
      value: 0,
      refIds: expect.any(Array),
    } as SliceItem);
    expect(mockBorderWidthsMap.set).toBeCalledWith(expect.any(String), {
      id: expect.any(String),
      name: "S",
      value: 1,
      refIds: expect.any(Array),
    } as SliceItem);
  });
});
