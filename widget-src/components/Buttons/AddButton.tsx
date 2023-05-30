const { widget } = figma;
const { Frame, Rectangle, Ellipse } = widget;

type Props = {
  onClick: () => void;
};

export const AddButton = ({ onClick }: Props) => {
  return (
    <Frame
      name="Add button"
      strokeWidth={0}
      overflow="visible"
      width={20}
      height={20}
      onClick={onClick}
    >
      <Ellipse name="Ellipse 1" fill="#DDD" width={20} height={20} />
      <Rectangle
        name="Rectangle 13"
        x={3}
        y={8}
        fill="#8C8C8C"
        width={14}
        height={4}
      />
      <Rectangle
        name="Rectangle 14"
        x={12}
        y={3}
        fill="#8C8C8C"
        rotation={-90}
        width={14}
        height={4}
      />
    </Frame>
  );
};
