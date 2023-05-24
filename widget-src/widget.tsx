import { SliceItem } from "./_shared/types";
import { RadiiSlices } from "./components/Radii/RadiiSlices";
import { useInitTheme } from "./hooks/useInitTheme";

const { widget } = figma;
const { useSyncedMap, AutoLayout } = widget;

function Widget() {
  const radiiMap = useSyncedMap<SliceItem>("radii");

  useInitTheme(radiiMap);

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
      <RadiiSlices radiiMap={radiiMap} />
    </AutoLayout>
  );
}

widget.register(Widget);
