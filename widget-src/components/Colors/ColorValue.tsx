const { widget } = figma;
const { Frame, Input, Text } = widget;

type Props = {
  value: number;
  label: string;
};

export const ColorValue = ({ value, label }: Props) => {
  return (
    <Frame width="fill-parent" height="fill-parent">
      <Text
        name="#"
        fill="#000"
        fontFamily="Inter"
        fontSize={10}
        fontWeight={500}
      >
        {label}
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
        onTextEditEnd={() => {}}
      />
    </Frame>
  );
};
