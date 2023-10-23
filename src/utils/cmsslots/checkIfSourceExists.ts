import type { SlotItem } from './types';

/**
 *
 * @param sourceSlug
 * @param slotItems
 * @returns
 */

export function checkIfSourceExists(sourceSlug: string | undefined, slotItems: SlotItem[]) {
  return sourceSlug ? slotItems.some((slot) => sourceSlug === slot.slug) : undefined;
}
