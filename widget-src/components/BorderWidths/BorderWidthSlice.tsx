import { BoxPropertyName } from "../../constants";
import { Slice, SliceItem, Store } from "../../types";
import { deleteSlice } from "../../utils/deleteSlice";
import { editSliceName } from "../../utils/editSliceName";
import { editSliceValue } from "../../utils/editSliceValue";
import { DeleteButton } from "../Buttons/DeleteButton";

const { widget } = figma;
const { Frame, Line, Input, AutoLayout } = widget;

interface Props extends SliceItem {
  store: Store;
}

export const BorderWidthSlice = ({ store, ...slice }: Props) => {
  return (
    <AutoLayout
      name="Border width Slice"
      strokeWidth={0}
      overflow="visible"
      direction="horizontal"
      verticalAlignItems="center"
      spacing={8}
      key={slice.id}
    >
      <Frame width={41} height={41}>
        <Frame name="Frame3" overflow="visible" width={41} height={41}>
          <Line
            name="Rectangle 19"
            y={20.5 + slice.value / 2}
            stroke="#000"
            strokeWidth={slice.value}
            length={16 + slice.value}
            strokeCap="round"
          />
          <Line
            name="Rectangle 19"
            y={20.5 + slice.value / 2}
            stroke="#000"
            strokeWidth={slice.value}
            strokeDashPattern={[1, 5 + slice.value]}
            length={14}
            x={20 + slice.value}
            strokeCap="round"
          />
        </Frame>
        <DeleteButton
          onClick={() =>
            deleteSlice({ id: slice.id, sliceName: Slice.BorderWidths, store })
          }
        />
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
          onTextEditEnd={(event) =>
            editSliceName({
              event,
              slice,
              propertyName: BoxPropertyName.BorderWidth,
              sliceName: Slice.BorderWidths,
              store,
            })
          }
        />
        <Input
          width="fill-parent"
          name="Border width value"
          x={48}
          y={21}
          fill="#000"
          fontFamily="Inter"
          fontSize={10.105262756347656}
          fontWeight={500}
          strokeWidth={0.632}
          value={`${slice.value}`}
          onTextEditEnd={(event) =>
            editSliceValue({
              event,
              sliceName: Slice.BorderWidths,
              slice,
              styleKey: "strokeWeight",
              store,
            })
          }
        />
      </AutoLayout>
    </AutoLayout>
  );
};
