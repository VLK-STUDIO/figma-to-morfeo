import { BoxPropertyName } from "../../constants";
import { BoxSliceItem, Slice, Store } from "../../types";
import { deleteSlice } from "../../utils/deleteSlice";
import { editSliceName } from "../../utils/editSliceName";
import { editSliceValue } from "../../utils/editSliceValue";
import { DeleteButton } from "../Buttons/DeleteButton";

const { widget } = figma;
const { Frame, Rectangle, Input, AutoLayout } = widget;

interface Props extends BoxSliceItem {
  store: Store;
}

export const RadiiSlice = ({ store, ...slice }: Props) => {
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
        <DeleteButton
          onClick={() =>
            deleteSlice({ id: slice.id, sliceName: Slice.Radii, store })
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
              propertyName: BoxPropertyName.Radius,
              sliceName: Slice.Radii,
              store,
            })
          }
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
          onTextEditEnd={(event) =>
            editSliceValue({
              event,
              sliceName: Slice.Radii,
              store,
              slice,
              styleKey: "cornerRadius",
            })
          }
        />
      </AutoLayout>
    </AutoLayout>
  );
};
