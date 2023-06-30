import {
  ActionTypes,
  ColorSliceItem,
  RadiiSliceItem,
  Slice,
  Store,
} from "./types";
import { RadiiSlices } from "./components/Radii/RadiiSlices";
import { useInitTheme } from "./hooks/useInitTheme";
import { downloadTheme } from "./utils/downloadTheme";
import { ColorSlices } from "./components/Colors/ColorSlices";

const { widget } = figma;
const { useSyncedMap, AutoLayout, usePropertyMenu, useEffect } = widget;

function Widget() {
  const radiiMap = useSyncedMap<RadiiSliceItem>(Slice.Radii);
  const colorsMap = useSyncedMap<ColorSliceItem>(Slice.Colors);
  const store: Store = {
    [Slice.Radii]: radiiMap,
    [Slice.Colors]: colorsMap,
  };

  useInitTheme(store);

  useEffect(() => {
    figma.ui.onmessage = (msg) => {
      if (msg.type === ActionTypes.closePlugin) {
        figma.closePlugin();
      }
    };
  });

  usePropertyMenu(
    [
      {
        itemType: "action",
        propertyName: "Download",
        tooltip: "Download",
      },
    ],
    ({ propertyName }) => {
      if (propertyName === "Download") {
        return new Promise(() => {
          downloadTheme(store);
        });
      }
    }
  );

  return (
    <AutoLayout
      name="PluginFrame"
      fill="#FFF"
      direction="vertical"
      spacing={40}
      padding={{
        top: 40,
        right: 80,
        bottom: 40,
        left: 20,
      }}
      verticalAlignItems="center"
      effect={{
        type: "drop-shadow",
        color: "#0003",
        offset: {
          x: 4,
          y: 4,
        },
        blur: 30,
        showShadowBehindNode: false,
      }}
      cornerRadius={8}
    >
      <RadiiSlices store={store} />
      <ColorSlices colorsMap={colorsMap} />
    </AutoLayout>
  );
}

widget.register(Widget);
