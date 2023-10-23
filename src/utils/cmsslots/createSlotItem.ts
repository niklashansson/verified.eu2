import type { SlotItem } from './types';

/**
 * @description Creates Slot Item from HTML Element
 * @param {HTMLDivElement} slotEl
 * @param {number} i
 * @returns {SlotItem} Returns object with information about if it's empty or selected
 */

export function createSlotItem(slotEl: HTMLDivElement, i: number) {
  const { caseSlug, articleSlug, newsSlug } = slotEl.dataset;
  const slugs = [{ slug: caseSlug }, { slug: articleSlug }, { slug: newsSlug }];

  const selectedSlug = slugs.find(({ slug }) => slug);

  return {
    slug: selectedSlug ? selectedSlug.slug : '',
    index: i,
    isPopulated: selectedSlug ? true : false,
    element: slotEl,
  } as SlotItem;
}
