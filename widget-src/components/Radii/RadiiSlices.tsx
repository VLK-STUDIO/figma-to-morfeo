import { SliceItem } from "../../_shared/types";
import { AddButton } from "../Buttons/AddButton";
import { RadiiSlice } from "./RadiiSlice";

const { widget } = figma;
const { Text, Frame, AutoLayout } = widget;

type Props = {
  radiiMap: SyncedMap<SliceItem>;
};

export const addRadiiSlice = (radiiMap: SyncedMap<SliceItem>) => {
  const newVariant = figma.createComponent();
  newVariant.name = "Radius=N";
  newVariant.cornerRadius = 0;
  newVariant.fills = [{ type: "SOLID", color: { r: 0, g: 0, b: 0 } }];
  radiiMap.set(newVariant.id, {
    id: newVariant.id,
    name: "N",
    value: 0,
    refIds: [newVariant.id],
  });
  const boxComponent = figma.root.findOne(
    (node) => node.type === "COMPONENT_SET" && node.name === "BOX"
  );
  if (boxComponent?.type === "COMPONENT_SET") {
    boxComponent.appendChild(newVariant);
  }
};

export const RadiiSlices = ({ radiiMap }: Props) => {
  return (
    <AutoLayout
      name="Radii frame"
      strokeWidth={0}
      overflow="visible"
      direction="vertical"
      spacing={30}
    >
      <Frame
        name="Group 10"
        strokeWidth={0}
        overflow="visible"
        width={102}
        height={35}
      >
        <AddButton onClick={() => addRadiiSlice(radiiMap)} />
        <Text
          name="Radii"
          fill="#000"
          fontFamily="Inter"
          fontSize={28.63157844543457}
          fontWeight={500}
          strokeWidth={1.789}
        >
          Radii
        </Text>
      </Frame>
      <AutoLayout
        name="Frame 2"
        y={65}
        overflow="visible"
        spacing={40}
        direction="horizontal"
        verticalAlignItems="center"
      >
        {radiiMap.values().map((radius) => (
          <RadiiSlice {...radius} radiiMap={radiiMap} />
        ))}
      </AutoLayout>
    </AutoLayout>
  );
};
