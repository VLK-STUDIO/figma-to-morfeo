import { useInitTheme } from "./useInitTheme";

describe("useInitTheme", () => {
  it("should init the theme with default and create BOX if the state is empty and BOX does not exist", () => {
    jest.spyOn(figma.root, "findOne").mockReturnValue(null);
    const mockSet = jest.fn();
    useInitTheme({ size: 0, set: mockSet } as unknown as SyncedMap);

    expect(figma.combineAsVariants).toBeCalled();
    expect(mockSet).toBeCalledWith(expect.any(String), {
      id: expect.any(String),
      name: "none",
      value: 0,
      refIds: expect.any(Array),
    });
    expect(mockSet).toBeCalledWith(expect.any(String), {
      id: expect.any(String),
      name: "XS",
      value: 1,
      refIds: expect.any(Array),
    });
    expect(mockSet).toBeCalledWith(expect.any(String), {
      id: expect.any(String),
      name: "L",
      value: 10,
      refIds: expect.any(Array),
    });
  });

  it("should not create the BOX component and should not set the state if the state is not empty and the component exist", () => {
    jest
      .spyOn(figma.root, "findOne")
      .mockReturnValue({ type: "COMPONENT_SET" } as any);
    const mockSet = jest.fn();
    useInitTheme({ size: 1, set: mockSet } as unknown as SyncedMap);
    expect(figma.combineAsVariants).not.toBeCalled();
    expect(mockSet).not.toBeCalled();
  });

  it("should not create the BOX component and should set the state (with current box variants) if the state is empty and the component exist", () => {
    jest.spyOn(figma.root, "findOne").mockReturnValue({
      type: "COMPONENT_SET",
      children: [
        { id: "1", name: "Radius=A", cornerRadius: 10, type: "COMPONENT" },
        { id: "2", name: "Radius=B", cornerRadius: 20, type: "COMPONENT" },
      ],
    } as unknown as ComponentSetNode);
    const mockSet = jest.fn();

    useInitTheme({ size: 0, set: mockSet } as unknown as SyncedMap);

    expect(figma.combineAsVariants).not.toBeCalled();
    expect(mockSet).toBeCalledWith(expect.any(String), {
      id: expect.any(String),
      name: "A",
      value: 10,
      refIds: ["1"],
    });
    expect(mockSet).toBeCalledWith(expect.any(String), {
      id: expect.any(String),
      name: "B",
      value: 20,
      refIds: ["2"],
    });
  });
});
