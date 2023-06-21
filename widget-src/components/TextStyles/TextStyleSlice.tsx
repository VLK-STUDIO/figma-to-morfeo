import { Slice, Store, TextStyleSliceItem } from "../../types";
import { Dropdown } from "../Dropdown/Dropdown";
import { DropdownSetItem } from "../Dropdown/types";
import { setTextStyleValue } from "./setTextStyleValue";
const { widget } = figma;
const { Text, AutoLayout, Input } = widget;

type Props = {
  textStyle: TextStyleSliceItem;
  store: Store;
};

export const TextStyleSlice = ({ store, textStyle }: Props) => {
  const { [Slice.TextStyles]: textStylesMap, [Slice.FontSizes]: fontSizesMap } =
    store;

  const fontSize = fontSizesMap.get(textStyle.fontSizeId)?.value;

  const setNewFontSizeId: DropdownSetItem = (id: string) =>
    setTextStyleValue({
      newValue: id,
      textStyle,
      textStylesMap,
      valueToChange: "fontSizeId",
    });

  return (
    <AutoLayout direction="horizontal" spacing={30} overflow="visible">
      <AutoLayout
        direction="horizontal"
        spacing={10}
        padding={10}
        verticalAlignItems="center"
        width={130}
      >
        <Text fill="#DD00E1" fontSize={fontSize}>
          A
        </Text>
        <Input
          value={textStyle.name}
          onTextEditEnd={() => {}}
          fontWeight={700}
          width={"fill-parent"}
        />
      </AutoLayout>
      <Dropdown
        key={textStyle.id}
        label="Font size"
        items={fontSizesMap.values()}
        selectedId={textStyle.fontSizeId}
        setNewItem={setNewFontSizeId}
      />
    </AutoLayout>
  );
};
