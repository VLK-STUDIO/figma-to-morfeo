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

export enum Slice {
  Radii = "radii",
  BorderWidths = "borderWidths",
}

export type Store = Record<Slice, SyncedMap<SliceItem>>;

export enum ActionTypes {
  downloadTheme = "download-theme",
  closePlugin = "close-plugin",
}

export interface PluginMessage {
  type: ActionTypes;
  meta?: unknown;
}
