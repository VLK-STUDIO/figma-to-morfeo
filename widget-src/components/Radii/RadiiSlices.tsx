import { SliceItem } from "../../types";
import { AddButton } from "../Buttons/AddButton";
import { RadiiSlice } from "./RadiiSlice";
import { addRadiiSlice } from "./utils";

const { widget } = figma;
const { Text, Frame, AutoLayout } = widget;

type Props = {
  radiiMap: SyncedMap<SliceItem>;
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
