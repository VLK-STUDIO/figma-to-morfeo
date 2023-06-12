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

export type SliceItem = BoxSliceItem | ColorSliceItem;

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
}

export type Store = {
  [Slice.BorderWidths]: SyncedMap<BoxSliceItem>;
  [Slice.Radii]: SyncedMap<BoxSliceItem>;
  [Slice.Colors]: SyncedMap<ColorSliceItem>;
};

export type BoxStore = Omit<Store, Slice.Colors>;

export enum ActionTypes {
  downloadTheme = "download-theme",
  closePlugin = "close-plugin",
}

export interface PluginMessage {
  type: ActionTypes;
  meta?: unknown;
}
