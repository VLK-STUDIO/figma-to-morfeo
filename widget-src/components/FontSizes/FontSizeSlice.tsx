import { FontSliceItem, Slice, Store } from "../../types";
import { DeleteButton } from "../Buttons/DeleteButton";
import { deleteFontSize } from "./deleteFontSize";

const { widget } = figma;
const { Frame, Text, Input, AutoLayout, Rectangle } = widget;

interface Props extends FontSliceItem {
  store: Store;
}

export const FontSizeSlice = ({ store, ...slice }: Props) => {
  const { [Slice.FontSizes]: fontSizesMap, [Slice.TextStyles]: textStylesMap } =
    store;
  const boxSize = slice.value > 41 ? slice.value : 41;
  const deleteSlice = () =>
    deleteFontSize({ id: slice.id, fontSizesMap, textStylesMap });
  return (
    <AutoLayout
      name="Font size Slice"
      strokeWidth={0}
      overflow="visible"
      direction="horizontal"
      verticalAlignItems="center"
      spacing={8}
      key={slice.id}
    >
      <Frame width={boxSize} height={boxSize}>
        <AutoLayout
          height={boxSize}
          width={boxSize}
          direction="horizontal"
          spacing={2}
          horizontalAlignItems="center"
          verticalAlignItems="center"
        >
          <Text
            name="A"
            fill="#000"
            width="hug-contents"
            height="hug-contents"
            fontFamily="Inter"
            fontSize={slice.value}
          >
            A
          </Text>
          <AutoLayout
            name="Frame6"
            strokeWidth={0.5}
            direction="vertical"
            width={slice.value / 5}
            height={slice.value}
            verticalAlignItems="center"
            horizontalAlignItems="center"
          >
            <Rectangle
              name="Rectangle 25"
              fill="#DD00E1"
              width="fill-parent"
              height={1}
            />
            <Rectangle
              name="Rectangle 23"
              fill="#DD00E1"
              width={1}
              height="fill-parent"
            />
            <Rectangle
              name="Rectangle 25"
              fill="#DD00E1"
              width="fill-parent"
              height={1}
            />
          </AutoLayout>
        </AutoLayout>
        <DeleteButton onClick={deleteSlice} width={boxSize} height={boxSize} />
      </Frame>
      <AutoLayout direction="vertical" spacing={2}>
        <Input
          name={slice.name}
          x={48}
          y={2}
          fill="#000"
          fontFamily="Inter"
          fontWeight={700}
          value={slice.name}
          width={40}
          inputBehavior="truncate"
          inputFrameProps={{ direction: "horizontal" }}
          onTextEditEnd={() => {}}
        />
        <Input
          width="fill-parent"
          name="Font size value"
          x={48}
          y={21}
          fill="#000"
          fontFamily="Inter"
          fontSize={10}
          fontWeight={500}
          strokeWidth={1}
          value={`${slice.value}`}
          onTextEditEnd={() => {}}
        />
      </AutoLayout>
    </AutoLayout>
  );
};
