import { mockSyncedMap } from "../test-utils/mockSyncedMap";
import { Slice } from "../types";
import { downloadTheme } from "./downloadTheme";

describe("downloadTheme", () => {
  it("should trigger the ui and call post a message to the plugin", () => {
    downloadTheme({
      [Slice.Radii]: mockSyncedMap({
        "id:a": { id: "id:a", name: "none", libStyleId: "", value: 0 },
        "id:b": { id: "id:b", name: "XS", libStyleId: "", value: 3 },
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
      morfeoCollection: { id: "", defaultModeId: "", name: "" },
    });
    expect(figma.showUI).toBeCalled();
    expect(figma.ui.postMessage).toBeCalledWith({
      type: "download-theme",
      meta: expect.objectContaining({
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
