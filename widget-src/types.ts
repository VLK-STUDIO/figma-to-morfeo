import { BoxPropertyName } from "./constants";

export type SliceItem = {
  name: string;
  value: number;
  id: string;
  refIds: string[];
};

export type BoxStyleKeys = keyof Pick<
  ComponentNode,
  "cornerRadius" | "strokeWeight"
>;

export type BoxVariant = {
  name: string;
} & Record<BoxStyleKeys, number>;

export type BoxSliceItems = Record<BoxPropertyName, SliceItem[]>;
