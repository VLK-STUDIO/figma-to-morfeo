import { Store } from "../../types";
import { AddButton } from "../Buttons/AddButton";
import { ColorSlice } from "./ColorSlice";
import { HexToggle } from "./HexToggle";
import { addColorSlice } from "../../utils/addColorSlice";
const { widget } = figma;
const { Text, AutoLayout, useSyncedState } = widget;

type Props = {
  colorsMap: Store["colors"];
};

export const ColorSlices = ({ colorsMap }: Props) => {
  const [isHex, setIsHex] = useSyncedState("isHex", true);
  const add = () => addColorSlice(colorsMap);
  return (
    <AutoLayout
      name="Color frame"
      strokeWidth={0}
      overflow="visible"
      direction="vertical"
      spacing={30}
    >
      <AutoLayout direction="vertical" width="fill-parent" spacing={10}>
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
            name="Colors"
            fill="#000"
            fontFamily="Inter"
            fontSize={28.63157844543457}
            fontWeight={500}
            strokeWidth={1.789}
          >
            Colors
          </Text>
          <AddButton onClick={add} />
        </AutoLayout>
        <HexToggle isHex={isHex} setIsHex={setIsHex} />
      </AutoLayout>
      <AutoLayout
        name="Frame 2"
        y={65}
        overflow="visible"
        spacing={40}
        direction="horizontal"
        verticalAlignItems="center"
      >
        {colorsMap.values().map((color) => (
          <ColorSlice isHex={isHex} {...color} colorsMap={colorsMap} />
        ))}
      </AutoLayout>
    </AutoLayout>
  );
};
