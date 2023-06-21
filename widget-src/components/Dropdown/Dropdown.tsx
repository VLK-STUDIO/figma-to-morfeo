import { StateKeys } from "../../constants";
import { DropdownItem } from "./DropdownItem";
import { DropdownItemModel, DropdownSetItem } from "./types";
const { widget } = figma;
const { SVG, Text, AutoLayout, useSyncedState } = widget;

type Props = {
  label: string;
  items: DropdownItemModel[];
  selectedId: string;
  setNewItem: DropdownSetItem;
};

export const Dropdown = ({ label, items, selectedId, setNewItem }: Props) => {
  const svg = `
    <svg width='7' height='7' viewBox='0 0 7 7' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M3.5 7L0.468911 1.75L6.53109 1.75L3.5 7Z' fill='black'/>
    </svg>
    `;

  const [isVisible, setIsVisible] = useSyncedState(
    StateKeys.IsDropdownVisible,
    false
  );

  const selected = items.find((item) => item.id === selectedId);
  const filteredItems = items.filter((item) => item.id !== selectedId);

  return (
    <AutoLayout
      name="Dropdown"
      overflow="visible"
      direction="vertical"
      spacing={5}
      verticalAlignItems="start"
      onClick={() => setIsVisible((prev) => !prev)}
    >
      <Text
        name="Label"
        fill="#000"
        fontFamily="Inter"
        fontSize={13}
        fontWeight={700}
      >
        {label}
      </Text>
      <AutoLayout
        name="Frame 4"
        fill="#FFF"
        stroke="#000"
        cornerRadius={4}
        strokeWidth={0.5}
        spacing={10}
        padding={{
          vertical: 4,
          horizontal: 6,
        }}
        verticalAlignItems="center"
      >
        <Text
          name="S"
          fill="#000"
          fontFamily="Inter"
          fontSize={11}
          fontWeight={500}
        >
          {selected?.name}
        </Text>
        <SVG name="Icon" height={7} width={7} src={svg} />
      </AutoLayout>
      <AutoLayout
        verticalAlignItems="center"
        fill="#FFF"
        stroke="#000"
        cornerRadius={4}
        strokeWidth={0.5}
        width="fill-parent"
        direction="vertical"
        y={50}
        hidden={!isVisible}
      >
        {filteredItems.map((item) => (
          <DropdownItem key={item.id} {...item} setNewItem={setNewItem} />
        ))}
      </AutoLayout>
    </AutoLayout>
  );
};
