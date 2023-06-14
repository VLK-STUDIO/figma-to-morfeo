import { rgbaToFigmaColor } from "../../utils/colorUtils";
import { ColorSliceItem, Store } from "../../types";
import { DeleteButton } from "../Buttons/DeleteButton";
import { getHexAndOpacity } from "../../utils/getHexAndOpacity";
import { ColorValue } from "./ColorValue";

const { widget } = figma;
const { Frame, Ellipse, Input, AutoLayout, Text } = widget;

interface Props extends ColorSliceItem {
  colorsMap: Store["colors"];
  isHex?: boolean;
}

export const ColorSlice = ({ isHex, colorsMap, ...slice }: Props) => {
  const { hex, opacityPercent } = getHexAndOpacity(slice.rgba);
  const { color, opacity } = rgbaToFigmaColor(slice.rgba);
  const fill = { ...color, a: opacity };
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
          <Ellipse width={41} height={41} fill={fill} />
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
            direction="vertical"
            width={100}
            height={35}
            spacing={2}
            verticalAlignItems="center"
          >
            <Frame width={100} height={10}>
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
                x={10}
                width={60}
                name="Hex color value"
                fill="#000"
                fontFamily="Inter"
                fontSize={10}
                fontWeight={500}
                strokeWidth={0.632}
                value={hex}
                onTextEditEnd={() => {}}
              />
            </Frame>
            <AutoLayout width="fill-parent" height={20}>
              <Text
                name="opacity"
                fill="#000"
                fontFamily="Inter"
                fontSize={10}
                fontWeight={500}
              >
                opacity:
              </Text>
              <Input
                paragraphIndent={3}
                width={22}
                name="Hex color value"
                fill="#000"
                fontFamily="Inter"
                fontSize={10}
                fontWeight={500}
                strokeWidth={0.632}
                value={opacityPercent}
                onTextEditEnd={() => {}}
              />
              <Text
                name="opacity"
                fill="#000"
                fontFamily="Inter"
                fontSize={10}
                fontWeight={500}
                width="fill-parent"
              >
                %
              </Text>
            </AutoLayout>
          </AutoLayout>
        ) : (
          <AutoLayout direction="vertical" width={50} height={50} spacing={2}>
            <ColorValue label="R" value={slice.rgba.r} />
            <ColorValue label="G" value={slice.rgba.g} />
            <ColorValue label="B" value={slice.rgba.b} />
            <ColorValue label="A" value={slice.rgba.a} />
          </AutoLayout>
        )}
      </AutoLayout>
    </AutoLayout>
  );
};
