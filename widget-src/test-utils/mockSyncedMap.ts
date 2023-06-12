import { SliceItem } from "../types";

export const mockSyncedMap = <T extends SliceItem>(
  initialValues?: Record<string, T>
) => {
  const map: Record<string, SliceItem> = { ...initialValues };

  const mockSet = jest.fn(
    (key: string, value: SliceItem) => (map[key] = value)
  );
  const mockGet = jest.fn((key: string) => map[key]);
  const mockHas = jest.fn();
  const mockDelete = jest.fn((key: string) => delete map[key]);
  const mockKeys = jest.fn(() => Object.keys(map));
  const mockValues = jest.fn(() => Object.values(map));
  const mockEntries = jest.fn(() => Object.entries(map));

  return {
    delete: mockDelete,
    entries: mockEntries,
    get: mockGet,
    set: mockSet,
    has: mockHas,
    keys: mockKeys,
    values: mockValues,
    length: Object.keys(map).length,
    size: Object.keys(map).length,
  } as unknown as SyncedMap<T>;
};
