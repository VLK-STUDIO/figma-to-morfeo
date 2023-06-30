interface BaseSliceItem {
  name: string;
  id: string;
}

export interface ColorSliceItem extends BaseSliceItem {
  rgba: RGBA;
  libStyleId: string;
}

export interface RadiiSliceItem extends BaseSliceItem {
  value: number;
}

export type SliceItem = ColorSliceItem | RadiiSliceItem;

export enum Slice {
  Radii = "radii",
  Colors = "colors",
}
export interface MorfeoCollection {
  id: string;
  name: string;
  defaultModeId: string;
}

export type Store = {
  [Slice.Radii]: SyncedMap<RadiiSliceItem>;
  [Slice.Colors]: SyncedMap<ColorSliceItem>;
  morfeoCollection: MorfeoCollection;
};

export enum ActionTypes {
  downloadTheme = "download-theme",
  closePlugin = "close-plugin",
}

export interface PluginMessage {
  type: ActionTypes;
  meta?: unknown;
}
