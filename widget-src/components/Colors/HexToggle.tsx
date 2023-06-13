const { widget } = figma;
const { Text, Frame, Rectangle } = widget;

type Props = {
  isHex: boolean;
  setIsHex: (newValue: boolean | ((currValue: boolean) => boolean)) => void;
};

export const HexToggle = ({ isHex, setIsHex }: Props) => {
  const dark = { bg: "#000", txt: "#FFF" };
  const light = { bg: "#DDD", txt: "#000" };
  return (
    <Frame
      name="HexToggle"
      strokeWidth={0}
      overflow="visible"
      width={108}
      height={20}
    >
      <Frame
        name="HexButton"
        strokeWidth={0}
        overflow="visible"
        width={54}
        height={20}
        onClick={() => setIsHex(true)}
      >
        <Rectangle
          name="Rectangle 20"
          stroke="#000"
          fill={isHex ? dark.bg : light.bg}
          cornerRadius={{
            topLeft: 3,
            topRight: 0,
            bottomRight: 0,
            bottomLeft: 3,
          }}
          width={54}
          height={20}
        />
        <Text
          name="HEX"
          x={16}
          y={4}
          fill={isHex ? dark.txt : light.txt}
          horizontalAlignText="center"
          fontFamily="Inter"
          fontSize={10}
          fontWeight={500}
        >
          HEX
        </Text>
      </Frame>
      <Frame
        name="RgbaButton"
        x={54}
        strokeWidth={0}
        overflow="visible"
        width={54}
        height={20}
        onClick={() => setIsHex(false)}
      >
        <Rectangle
          name="Rectangle 21"
          fill={isHex ? light.bg : dark.bg}
          stroke="#000"
          cornerRadius={{
            topLeft: 0,
            topRight: 3,
            bottomRight: 3,
            bottomLeft: 0,
          }}
          width={54}
          height={20}
        />
        <Text
          name="RGBA"
          x={13}
          y={4}
          fill={isHex ? light.txt : dark.txt}
          horizontalAlignText="center"
          fontFamily="Inter"
          fontSize={10}
          fontWeight={500}
        >
          RGBA
        </Text>
      </Frame>
    </Frame>
  );
};
