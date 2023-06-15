import { ColorSliceItem } from "../../types";
import { editColor } from "./editColor";

const { widget } = figma;
const { Frame, Input, Text } = widget;

type Props = {
  value: number;
  rgbaKey: keyof RGBA;
  colorsMap: SyncedMap<ColorSliceItem>;
  slice: ColorSliceItem;
};

export const ColorValue = ({ value, rgbaKey, colorsMap, slice }: Props) => {
  return (
    <Frame width="fill-parent" height="fill-parent">
      <Text
        name="#"
        fill="#000"
        fontFamily="Inter"
        fontSize={10}
        fontWeight={500}
      >
        {rgbaKey.toUpperCase()}
      </Text>
      <Input
        x={10}
        width={25}
        name="Color value"
        fill="#000"
        fontFamily="Inter"
        fontSize={10}
        fontWeight={500}
        strokeWidth={0.632}
        value={`${value}`}
        onTextEditEnd={(event) =>
          editColor({ valueToEdit: "rgba", rgbaKey, event, colorsMap, slice })
        }
      />
    </Frame>
  );
};
