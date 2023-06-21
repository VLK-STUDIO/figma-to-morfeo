import { DropdownItemModel, DropdownSetItem } from "./types";

const { widget } = figma;
const { Text, AutoLayout } = widget;

interface Props extends DropdownItemModel {
  setNewItem: DropdownSetItem;
}

export const DropdownItem = ({ name, id, setNewItem }: Props) => {
  return (
    <AutoLayout
      hoverStyle={{ fill: { r: 0.5, g: 0.5, b: 0.5, a: 0.2 } }}
      onClick={() => setNewItem(id)}
      width="fill-parent"
      padding={{
        vertical: 4,
        horizontal: 6,
      }}
      fill="#FFF"
    >
      <Text
        name="S"
        fill="#000"
        fontFamily="Inter"
        fontSize={11}
        fontWeight={500}
      >
        {name}
      </Text>
    </AutoLayout>
  );
};
