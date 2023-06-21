import { mockSyncedMap } from "../test-utils/mockSyncedMap";
import { Slice } from "../types";
import { downloadTheme } from "./downloadTheme";

describe("downloadTheme", () => {
  it("should trigger the ui and call post a message to the plugin", () => {
    downloadTheme({
      [Slice.BorderWidths]: mockSyncedMap({
        "id:1": { id: "id:1", name: "S", value: 1, refIds: [] },
        "id:2": { id: "id:2", name: "M", value: 4, refIds: [] },
      }),
      [Slice.Radii]: mockSyncedMap({
        "id:a": { id: "id:a", name: "none", value: 0, refIds: [] },
        "id:b": { id: "id:b", name: "XS", value: 3, refIds: [] },
      }),
      [Slice.Colors]: mockSyncedMap({
        "id:x": {
          id: "id:x",
          name: "primary",
          rgba: { r: 34, g: 135, b: 50, a: 1 },
          libStyleId: "",
        },
        "id:y": {
          id: "id:y",
          name: "secondary",
          rgba: { r: 186, g: 165, b: 53, a: 0.5 },
          libStyleId: "",
        },
      }),
      [Slice.FontSizes]: mockSyncedMap(),
      [Slice.TextStyles]: mockSyncedMap(),
    });
    expect(figma.showUI).toBeCalled();
    expect(figma.ui.postMessage).toBeCalledWith({
      type: "download-theme",
      meta: expect.objectContaining({
        [Slice.BorderWidths]: {
          S: "1px",
          M: "4px",
        },
        [Slice.Radii]: {
          none: "0",
          XS: "3px",
        },
        [Slice.Colors]: {
          primary: "#228732",
          secondary: "rgba(186,165,53,0.5)",
        },
      }),
    });
  });
});
