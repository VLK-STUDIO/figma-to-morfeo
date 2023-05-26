import { ComponentNames } from "../../constants";
import { SliceItem } from "../../types";
import { addRadiiSlice } from "./utils";

describe("addRadiiSlice", () => {
  it("should add new sliceItems on the state and append new instances to the box", () => {
    const mockSet = jest.fn();
    const mockAppendChild = jest.fn();
    jest.spyOn(figma.root, "findOne").mockReturnValue({
      type: "COMPONENT_SET",
      name: ComponentNames.Box,
      appendChild: mockAppendChild,
    } as any);
    addRadiiSlice({ set: mockSet } as unknown as SyncedMap<SliceItem>);

    expect(mockSet).toBeCalledWith(expect.any(String), {
      id: expect.any(String),
      name: "N",
      value: 0,
      refIds: [expect.any(String)],
    } as SliceItem);
    expect(mockSet).toBeCalledTimes(1);

    expect(mockAppendChild).toBeCalledWith(
      expect.objectContaining({ name: "Radius=N", cornerRadius: 0 })
    );
    expect(mockAppendChild).toBeCalledTimes(1);
  });

  it("should create a new box component and restore the state with the new instances if BOX is not found", () => {
    const mockSet = jest.fn();
    const mockAppendChild = jest.fn();
    const mockMapDelete = jest.fn();
    jest.spyOn(figma.root, "findOne").mockReturnValue(null);
    addRadiiSlice({
      set: mockSet,
      values: () => [{ id: "1", name: "S", refIds: ["222"], value: 1 }],
      keys: () => ["1"],
      delete: mockMapDelete,
    } as unknown as SyncedMap<SliceItem>);

    expect(mockAppendChild).not.toBeCalled();
    expect(figma.combineAsVariants).toBeCalledTimes(1);

    // reset state
    expect(mockMapDelete).toBeCalledTimes(1);
    // set up new state (updated sliceItems + new one)
    expect(mockSet).toBeCalledWith(expect.any(String), {
      id: expect.any(String),
      name: "N",
      value: 0,
      refIds: [expect.any(String)],
    } as SliceItem);
    expect(mockSet).toBeCalledWith(expect.any(String), {
      id: expect.any(String),
      name: "S",
      value: 1,
      refIds: [expect.any(String)],
    } as SliceItem);
  });
});
