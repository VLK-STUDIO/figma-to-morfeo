import { ColorSliceItem, Store } from "../../types";
import { DeleteButton } from "../Buttons/DeleteButton";

const { widget } = figma;
const { Frame, Ellipse, Input, AutoLayout, Text } = widget;

interface Props extends ColorSliceItem {
  store: Store;
  isHex?: boolean;
}

const rgbaToBaseOne = (rgba: RGBA) => ({
  r: rgba.r / 255,
  g: rgba.g / 255,
  b: rgba.b / 255,
  a: rgba.a,
});

export const ColorSlice = ({ isHex, store, ...slice }: Props) => {
  const hexValue = "000";
  return (
    <AutoLayout
      name="Color Slice"
      strokeWidth={0}
      overflow="visible"
      direction="horizontal"
      verticalAlignItems="center"
      spacing={8}
      key={slice.id}
    >
      <Frame width={41} height={41}>
        <Frame name="Frame3" overflow="visible" width={41} height={41}>
          <Ellipse width={41} height={41} fill={rgbaToBaseOne(slice.rgba)} />
        </Frame>
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
          value={slice.name}
          width={90}
          inputBehavior="truncate"
          inputFrameProps={{ direction: "horizontal" }}
          onTextEditEnd={() => {}}
        />
        {isHex ? (
          <AutoLayout
            name="Group11"
            strokeWidth={0}
            overflow="visible"
            width={50}
            height={12}
          >
            <Text
              name="#"
              fill="#000"
              fontFamily="Inter"
              fontSize={10}
              fontWeight={500}
            >
              #
            </Text>
            <Input
              width="fill-parent"
              name="Hex color value"
              fill="#000"
              fontFamily="Inter"
              fontSize={10}
              fontWeight={500}
              strokeWidth={0.632}
              value={hexValue}
              onTextEditEnd={() => {}}
            />
          </AutoLayout>
        ) : (
          <AutoLayout direction="vertical" width={50} height={50} spacing={2}>
            <Frame width="fill-parent" height="fill-parent">
              <Text
                name="#"
                fill="#000"
                fontFamily="Inter"
                fontSize={10}
                fontWeight={500}
              >
                R
              </Text>
              <Input
                x={10}
                width={25}
                name="Red color value"
                fill="#000"
                fontFamily="Inter"
                fontSize={10}
                fontWeight={500}
                strokeWidth={0.632}
                value={`${slice.rgba?.r}`}
                onTextEditEnd={() => {}}
              />
            </Frame>
            <Frame width="fill-parent" height="fill-parent">
              <Text
                name="#"
                fill="#000"
                fontFamily="Inter"
                fontSize={10}
                fontWeight={500}
              >
                G
              </Text>
              <Input
                x={10}
                width={25}
                name="Green color value"
                fill="#000"
                fontFamily="Inter"
                fontSize={10}
                fontWeight={500}
                strokeWidth={0.632}
                value={`${slice.rgba?.g}`}
                onTextEditEnd={() => {}}
              />
            </Frame>
            <Frame width="fill-parent" height="fill-parent">
              <Text
                name="#"
                fill="#000"
                fontFamily="Inter"
                fontSize={10}
                fontWeight={500}
              >
                B
              </Text>
              <Input
                x={10}
                width={25}
                name="Blue color value"
                fill="#000"
                fontFamily="Inter"
                fontSize={10}
                fontWeight={500}
                strokeWidth={0.632}
                value={`${slice.rgba?.b}`}
                onTextEditEnd={() => {}}
              />
            </Frame>
            <Frame width="fill-parent" height="fill-parent">
              <Text
                name="#"
                fill="#000"
                fontFamily="Inter"
                fontSize={10}
                fontWeight={500}
              >
                A
              </Text>
              <Input
                x={10}
                width={25}
                name="Alpha color value"
                fill="#000"
                fontFamily="Inter"
                fontSize={10}
                fontWeight={500}
                strokeWidth={0.632}
                value={`${slice.rgba?.a}`}
                onTextEditEnd={() => {}}
              />
            </Frame>
          </AutoLayout>
        )}
      </AutoLayout>
    </AutoLayout>
  );
};
