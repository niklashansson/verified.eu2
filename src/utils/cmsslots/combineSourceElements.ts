import type { SourceElements } from '$utils/cmsslots/types';
import { sortArrayByDateProp } from '$utils/sortArrayByDateProp';

import { queryElements } from '../queryElements';

/**
 * @returns { HTMLDivElement[] } returns source elements
 */

export function combineSourceElements() {
  // select all lists with "source-list" (in order to get data from multiple Collection Lists)
  const lists = Array.from(queryElements<HTMLDivElement>('[bw-cmsslots-element="source-list"]'));
  if (!lists.length) return;

  const firstList = lists[0];

  lists.forEach((list, i) => {
    if (i === 0) return;
    const elements = Array.from(list.childNodes) as HTMLDivElement[];
    if (!elements.length) return;

    elements.forEach((el) => firstList.appendChild(el));
    list.parentElement?.remove();
  });

  // return source elements
  const sourceElements = Array.from(firstList.childNodes) as HTMLDivElement[];
  if (!sourceElements.length) return;

  return {
    elements: sourceElements as HTMLDivElement[],
    parent: firstList,
  } as SourceElements;
}
