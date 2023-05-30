import { Slice, Store } from "../../types";
import { AddButton } from "../Buttons/AddButton";
import { BorderWidthSlice } from "./BorderWidthSlice";
const { widget } = figma;
const { Text, AutoLayout } = widget;

type Props = {
  store: Store;
};

export const BorderWidthSlices = ({ store }: Props) => {
  return (
    <AutoLayout
      name="Border width frame"
      strokeWidth={0}
      overflow="visible"
      direction="vertical"
      spacing={30}
    >
      <AutoLayout
        verticalAlignItems="center"
        spacing={10}
        name="Group 10"
        strokeWidth={0}
        overflow="visible"
        width={102}
        height={35}
      >
        <Text
          name="Border widths"
          fill="#000"
          fontFamily="Inter"
          fontSize={28.63157844543457}
          fontWeight={500}
          strokeWidth={1.789}
        >
          Border widths
        </Text>
        <AddButton onClick={() => {}} />
      </AutoLayout>
      <AutoLayout
        name="Frame 2"
        y={65}
        overflow="visible"
        spacing={40}
        direction="horizontal"
        verticalAlignItems="center"
      >
        {store[Slice.BorderWidths].values().map((borderWidth) => (
          <BorderWidthSlice {...borderWidth} store={store} />
        ))}
      </AutoLayout>
    </AutoLayout>
  );
};
