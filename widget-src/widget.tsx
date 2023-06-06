import { ActionTypes, Slice, SliceItem } from "./types";
import { RadiiSlices } from "./components/Radii/RadiiSlices";
import { useInitTheme } from "./hooks/useInitTheme";
import { BorderWidthSlices } from "./components/BorderWidths/BorderWidthSlices";
import { downloadTheme } from "./utils/downloadTheme";

const { widget } = figma;
const { useSyncedMap, AutoLayout, usePropertyMenu, useEffect } = widget;

function Widget() {
  const radiiMap = useSyncedMap<SliceItem>(Slice.Radii);
  const borderWidthsMap = useSyncedMap<SliceItem>(Slice.BorderWidths);
  const store = {
    [Slice.Radii]: radiiMap,
    [Slice.BorderWidths]: borderWidthsMap,
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
    >
      <RadiiSlices store={store} />
      <BorderWidthSlices store={store} />
    </AutoLayout>
  );
}

widget.register(Widget);
