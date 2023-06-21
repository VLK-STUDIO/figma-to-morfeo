import { Store, TextStyleSliceItem } from "../../types";

type Params = {
  textStyle: TextStyleSliceItem;
  valueToChange: "fontSizeId";
  textStylesMap: Store["textStyles"];
  newValue: string;
};

export const setTextStyleValue = ({
  textStyle,
  valueToChange,
  newValue,
  textStylesMap,
}: Params) => {
  textStylesMap.set(textStyle.id, { ...textStyle, [valueToChange]: newValue });
};
