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

export const defaultRadiiSliceItems = [
  { name: "Radius/none", value: 0 },
  { name: "Radius/XS", value: 5 },
  { name: "Radius/S", value: 10 },
];

export const MORFEO_COLLECTION_NAME = "Morfeo tokens";
