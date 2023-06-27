import { ColorSliceItem } from "./types";

export const defaultColorSliceItems: ColorSliceItem[] = [
  {
    id: "1",
    name: "primary",
    rgba: { r: 112, g: 215, b: 222, a: 1 },
    libStyleId: "",
  },
  {
    id: "2",
    name: "secondary",
    rgba: { r: 114, g: 222, b: 112, a: 1 },
    libStyleId: "",
  },
];

export enum ComponentNames {
  Box = "BOX",
}
