import { Slice, Store } from "../../types";
import { AddButton } from "../Buttons/AddButton";
import { FontSizeSlice } from "./FontSizeSlice";
const { widget } = figma;
const { Text, AutoLayout } = widget;

type Props = {
  store: Store;
};

export const FontSizeSlices = ({ store }: Props) => {
  const add = () => {};
  return (
    <AutoLayout
      name="Font sizes frame"
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
          name="Font sizes"
          fill="#000"
          fontFamily="Inter"
          fontSize={28}
          fontWeight={500}
          strokeWidth={2}
        >
          Font sizes
        </Text>
        <AddButton onClick={add} />
      </AutoLayout>
      <AutoLayout
        name="Frame 2"
        y={65}
        overflow="visible"
        spacing={40}
        direction="horizontal"
        verticalAlignItems="center"
      >
        {store[Slice.FontSizes].values().map((fontSize) => (
          <FontSizeSlice {...fontSize} store={store} />
        ))}
      </AutoLayout>
    </AutoLayout>
  );
};
