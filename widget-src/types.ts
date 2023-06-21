import { BoxPropertyName } from "./constants";

interface BaseSliceItem {
  name: string;
  id: string;
}

export interface BoxSliceItem extends BaseSliceItem {
  value: number;
  refIds: string[];
}

export interface ColorSliceItem extends BaseSliceItem {
  rgba: RGBA;
  libStyleId: string;
}

export interface FontSliceItem extends BaseSliceItem {
  value: number;
}

export interface TextStyleSliceItem extends BaseSliceItem {
  fontSizeId: string;
}

export type SliceItem =
  | BoxSliceItem
  | ColorSliceItem
  | FontSliceItem
  | TextStyleSliceItem;

export type BoxStyleKeys = keyof Pick<
  ComponentNode,
  "cornerRadius" | "strokeWeight"
>;

export type BoxVariant = {
  name: string;
} & Record<BoxStyleKeys, number>;

export type BoxSliceItems = Record<BoxPropertyName, BoxSliceItem[]>;

export enum Slice {
  Radii = "radii",
  BorderWidths = "borderWidths",
  Colors = "colors",
  FontSizes = "fontSizes",
  TextStyles = "textStyles",
}

export type MorfeoSlice = Exclude<Slice, Slice.TextStyles>;

export type Store = {
  [Slice.BorderWidths]: SyncedMap<BoxSliceItem>;
  [Slice.Radii]: SyncedMap<BoxSliceItem>;
  [Slice.Colors]: SyncedMap<ColorSliceItem>;
  [Slice.FontSizes]: SyncedMap<FontSliceItem>;
  [Slice.TextStyles]: SyncedMap<TextStyleSliceItem>;
};

export type BoxStore = Pick<Store, Slice.Radii | Slice.BorderWidths>;

export enum ActionTypes {
  downloadTheme = "download-theme",
  closePlugin = "close-plugin",
}

export interface PluginMessage {
  type: ActionTypes;
  meta?: unknown;
}
