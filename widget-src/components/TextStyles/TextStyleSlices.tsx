import { Slice, Store } from "../../types";
import { AddButton } from "../Buttons/AddButton";
import { TextStyleSlice } from "./TextStyleSlice";

const { widget } = figma;
const { Text, AutoLayout } = widget;

type Props = {
  store: Store;
};

export const TextStyleSlices = ({ store }: Props) => {
  const { [Slice.TextStyles]: textStylesMap } = store;
  const add = () => {};

  return (
    <AutoLayout
      name="Text styles frame"
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
          name="Text styles"
          fill="#000"
          fontFamily="Inter"
          fontSize={28}
          fontWeight={500}
          strokeWidth={2}
        >
          Text styles
        </Text>
        <AddButton onClick={add} />
      </AutoLayout>
      <AutoLayout
        name="Frame 2"
        y={65}
        overflow="visible"
        spacing={40}
        direction="vertical"
        verticalAlignItems="center"
      >
        {textStylesMap.values().map((textStyle) => (
          <TextStyleSlice
            key={textStyle.id}
            store={store}
            textStyle={textStyle}
          />
        ))}
      </AutoLayout>
    </AutoLayout>
  );
};
