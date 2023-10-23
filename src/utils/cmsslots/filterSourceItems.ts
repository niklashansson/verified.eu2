import type { SlotItem, SourceItem } from './types';

/**
 *
 * @param slotItems
 * @param sourceItems
 * @returns
 */

export function filterSourceItems(slotItems: SlotItem[], sourceItems: SourceItem[]) {
  if (!sourceItems) return;

  return sourceItems.filter((sourceItem) =>
    slotItems.every((slotItem) => slotItem.slug !== sourceItem.slug)
  );
}
