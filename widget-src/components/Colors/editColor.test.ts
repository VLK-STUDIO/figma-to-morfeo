import { mockSyncedMap } from "../../test-utils/mockSyncedMap";
import { ColorSliceItem } from "../../types";
import { editColor } from "./editColor";

describe("editColor", () => {
  describe("edit name", () => {
    it("should set a new name if the input is valid", () => {
      const colorsMap = mockSyncedMap<ColorSliceItem>();
      const input = "new-name";
      editColor({
        event: { characters: input },
        valueToEdit: "name",
        colorsMap,
        slice: {
          id: "id",
          name: "old-name",
          libStyleId: "lib-id",
          rgba: { r: 0, g: 0, b: 0, a: 0 },
        },
      });

      expect(colorsMap.set).toBeCalledWith("id", {
        id: "id",
        name: "new-name",
        libStyleId: "lib-id",
        rgba: { r: 0, g: 0, b: 0, a: 0 },
      });
    });

    it("should not set the new name if the input is invalid", () => {
      const colorsMap = mockSyncedMap<ColorSliceItem>();
      const input = "";
      editColor({
        event: { characters: input },
        valueToEdit: "name",
        colorsMap,
        slice: {
          id: "id",
          name: "old-name",
          libStyleId: "lib-id",
          rgba: { r: 0, g: 0, b: 0, a: 0 },
        },
      });

      expect(colorsMap.set).toBeCalledWith("id", {
        id: "id",
        name: "old-name",
        libStyleId: "lib-id",
        rgba: { r: 0, g: 0, b: 0, a: 0 },
      });
    });
  });

  describe("edit hex", () => {
    it("should save a new value if the input is a valid hex", () => {
      const colorsMap = mockSyncedMap<ColorSliceItem>();
      const input = "000000";
      editColor({
        event: { characters: input },
        valueToEdit: "hex",
        colorsMap,
        slice: {
          id: "id",
          name: "name",
          libStyleId: "lib-id",
          rgba: { r: 10, g: 10, b: 10, a: 1 },
        },
      });

      expect(colorsMap.set).toBeCalledWith("id", {
        id: "id",
        name: "name",
        libStyleId: "lib-id",
        rgba: { r: 0, g: 0, b: 0, a: 1 },
      });
    });

    it("should not save a new value if the input empty", () => {
      const colorsMap = mockSyncedMap<ColorSliceItem>();
      const input = "";
      editColor({
        event: { characters: input },
        valueToEdit: "hex",
        colorsMap,
        slice: {
          id: "id",
          name: "name",
          libStyleId: "lib-id",
          rgba: { r: 10, g: 10, b: 10, a: 1 },
        },
      });

      expect(colorsMap.set).toBeCalledWith("id", {
        id: "id",
        name: "name",
        libStyleId: "lib-id",
        rgba: { r: 0, g: 0, b: 0, a: 1 },
      });
    });

    it("should not save the new value and notify if the input is not a valid hex", () => {
      const colorsMap = mockSyncedMap<ColorSliceItem>();
      const input = "@@ invalid hex @@";
      editColor({
        event: { characters: input },
        valueToEdit: "hex",
        colorsMap,
        slice: {
          id: "id",
          name: "name",
          libStyleId: "lib-id",
          rgba: { r: 10, g: 10, b: 10, a: 1 },
        },
      });

      expect(colorsMap.set).not.toBeCalled();
      expect(figma.notify).toBeCalledTimes(1);
      expect(figma.notify).toBeCalledWith(
        expect.any(String),
        expect.objectContaining({ error: true })
      );
    });
  });

  describe("edit opacity", () => {
    it("should set the new opacity if the input is a number between 0 and 100", () => {
      const colorsMap = mockSyncedMap<ColorSliceItem>();
      const input = "50";
      editColor({
        event: { characters: input },
        valueToEdit: "opacity",
        colorsMap,
        slice: {
          id: "id",
          name: "name",
          libStyleId: "lib-id",
          rgba: { r: 10, g: 10, b: 10, a: 1 },
        },
      });

      expect(colorsMap.set).toBeCalledWith("id", {
        id: "id",
        name: "name",
        libStyleId: "lib-id",
        rgba: { r: 10, g: 10, b: 10, a: 0.5 },
      });
    });

    it("should not set the new opacity if the input is an empty string", () => {
      const colorsMap = mockSyncedMap<ColorSliceItem>();
      const input = "";
      editColor({
        event: { characters: input },
        valueToEdit: "opacity",
        colorsMap,
        slice: {
          id: "id",
          name: "name",
          libStyleId: "lib-id",
          rgba: { r: 10, g: 10, b: 10, a: 1 },
        },
      });

      expect(colorsMap.set).toBeCalledWith("id", {
        id: "id",
        name: "name",
        libStyleId: "lib-id",
        rgba: { r: 10, g: 10, b: 10, a: 1 },
      });
    });

    it("should not set the new opacity and call notify if the input is not a number between 0 and 100", () => {
      const colorsMap = mockSyncedMap<ColorSliceItem>();
      const input = "50000000000";
      editColor({
        event: { characters: input },
        valueToEdit: "opacity",
        colorsMap,
        slice: {
          id: "id",
          name: "name",
          libStyleId: "lib-id",
          rgba: { r: 10, g: 10, b: 10, a: 1 },
        },
      });

      expect(colorsMap.set).not.toBeCalled();
      expect(figma.notify).toBeCalledTimes(1);
      expect(figma.notify).toBeCalledWith(
        expect.any(String),
        expect.objectContaining({ error: true })
      );
    });
  });

  describe("edit rgba", () => {
    it("should edit the specified rgba value if the input is a number between 0 and 255", () => {
      const colorsMap = mockSyncedMap<ColorSliceItem>();
      const input = "125";
      editColor({
        event: { characters: input },
        valueToEdit: "rgba",
        rgbaKey: "r",
        colorsMap,
        slice: {
          id: "id",
          name: "name",
          libStyleId: "lib-id",
          rgba: { r: 10, g: 10, b: 10, a: 1 },
        },
      });

      expect(colorsMap.set).toBeCalledWith("id", {
        id: "id",
        name: "name",
        libStyleId: "lib-id",
        rgba: { r: 125, g: 10, b: 10, a: 1 },
      });
    });

    it("should not edit the new alpha value if the input is not a number between 0 and 1 and call notify", () => {
      const colorsMap = mockSyncedMap<ColorSliceItem>();
      const input = "200";
      editColor({
        event: { characters: input },
        valueToEdit: "rgba",
        rgbaKey: "a",
        colorsMap,
        slice: {
          id: "id",
          name: "name",
          libStyleId: "lib-id",
          rgba: { r: 10, g: 10, b: 10, a: 1 },
        },
      });

      expect(colorsMap.set).not.toBeCalled();
      expect(figma.notify).toBeCalledTimes(1);
      expect(figma.notify).toBeCalledWith(
        expect.any(String),
        expect.objectContaining({ error: true })
      );
    });

    it("should not edit the new red/gree/blue value if the input is not a number between 0 and 255 and call notify", () => {
      const colorsMap = mockSyncedMap<ColorSliceItem>();
      const input = "10000";
      editColor({
        event: { characters: input },
        valueToEdit: "rgba",
        rgbaKey: "r",
        colorsMap,
        slice: {
          id: "id",
          name: "name",
          libStyleId: "lib-id",
          rgba: { r: 10, g: 10, b: 10, a: 1 },
        },
      });

      expect(colorsMap.set).not.toBeCalled();
      expect(figma.notify).toBeCalledTimes(1);
      expect(figma.notify).toBeCalledWith(
        expect.any(String),
        expect.objectContaining({ error: true })
      );
    });

    it("should call set with the old value if the input is an empty string/not a number", () => {
      const colorsMap = mockSyncedMap<ColorSliceItem>();
      const input = "not a number";
      editColor({
        event: { characters: input },
        valueToEdit: "rgba",
        rgbaKey: "r",
        colorsMap,
        slice: {
          id: "id",
          name: "name",
          libStyleId: "lib-id",
          rgba: { r: 10, g: 10, b: 10, a: 1 },
        },
      });

      expect(colorsMap.set).toBeCalledWith("id", {
        id: "id",
        name: "name",
        libStyleId: "lib-id",
        rgba: { r: 10, g: 10, b: 10, a: 1 },
      });
    });
  });
});
