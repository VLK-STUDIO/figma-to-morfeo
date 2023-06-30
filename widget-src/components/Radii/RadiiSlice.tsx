import { RadiiSliceItem, Store } from "../../types";
import { DeleteButton } from "../Buttons/DeleteButton";

const { widget } = figma;
const { Frame, Rectangle, Input, AutoLayout } = widget;

interface Props extends RadiiSliceItem {
  store: Store;
}

export const RadiiSlice = ({ store, ...slice }: Props) => {
  const inputName = slice.name.replace("Radius/", "");
  return (
    <AutoLayout
      name="Radius Slice"
      strokeWidth={0}
      overflow="visible"
      direction="horizontal"
      verticalAlignItems="center"
      spacing={8}
      key={slice.id}
    >
      <Frame width={41} height={41}>
        <Rectangle
          name="Slice preview"
          fill="#D9D9D9"
          cornerRadius={{ topRight: slice.value }}
          width={41}
          height={41}
        />
        <DeleteButton onClick={() => {}} />
      </Frame>
      <AutoLayout direction="vertical" spacing={2}>
        <Input
          name={slice.name}
          x={48}
          y={2}
          fill="#000"
          fontFamily="Inter"
          fontWeight={700}
          value={inputName}
          width={100}
          inputBehavior="truncate"
          inputFrameProps={{ direction: "horizontal" }}
          onTextEditEnd={() => {}}
        />
        <Input
          width="fill-parent"
          name="Radius value"
          x={48}
          y={21}
          fill="#000"
          fontFamily="Inter"
          fontSize={10.105262756347656}
          fontWeight={500}
          strokeWidth={0.632}
          value={`${slice.value}`}
          onTextEditEnd={() => {}}
        />
      </AutoLayout>
    </AutoLayout>
  );
};
