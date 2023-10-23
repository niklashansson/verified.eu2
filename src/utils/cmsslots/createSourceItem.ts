import type { SourceItem } from './types';

/**
 * @description Creates a SourceItem object from a div element
 * @param element
 * @param published from element dataset
 * @param slug from element dataset
 * @param shouldReplace if true then the source items element is moved to slot items element, if false new element is created and source element is removed
 * @returns {SourceItem | undefined }
 */

export function createSourceItem(
  element: HTMLDivElement,
  published: string,
  slug: string,
  shouldReplace: boolean,
  data: any
) {
  if (!published || !slug) return;

  return {
    element,
    published: new Date(published),
    slug,
    shouldReplace,
    data,
  } as SourceItem;
}
