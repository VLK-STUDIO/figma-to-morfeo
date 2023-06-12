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
      [Slice.Colors]: mockSyncedMap({}),
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
      }),
    });
  });
});
