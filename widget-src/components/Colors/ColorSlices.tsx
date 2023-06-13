import { Slice, Store } from "../../types";
import { AddButton } from "../Buttons/AddButton";
import { ColorSlice } from "./ColorSlice";
import { HexToggle } from "./HexToggle";
const { widget } = figma;
const { Text, AutoLayout, useSyncedState } = widget;

type Props = {
  store: Store;
};

export const ColorSlices = ({ store }: Props) => {
  const [isHex, setIsHex] = useSyncedState("isHex", true);
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
          <AddButton onClick={() => {}} />
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
        {store[Slice.Colors].values().map((color) => (
          <ColorSlice isHex={isHex} {...color} store={store} />
        ))}
      </AutoLayout>
    </AutoLayout>
  );
};
