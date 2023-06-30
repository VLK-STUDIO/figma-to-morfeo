interface BaseSliceItem {
  name: string;
  id: string;
}

export interface ColorSliceItem extends BaseSliceItem {
  rgba: RGBA;
  libStyleId: string;
}

export interface RadiiSliceItem extends BaseSliceItem {
  libStyleId: string;
  value: number;
}

export type SliceItem = ColorSliceItem | RadiiSliceItem;

export enum Slice {
  Radii = "radii",
  Colors = "colors",
}

export type Store = {
  [Slice.Radii]: SyncedMap<RadiiSliceItem>;
  [Slice.Colors]: SyncedMap<ColorSliceItem>;
};

export enum ActionTypes {
  downloadTheme = "download-theme",
  closePlugin = "close-plugin",
}

export interface PluginMessage {
  type: ActionTypes;
  meta?: unknown;
}
