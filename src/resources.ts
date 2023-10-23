import { checkIfSourceExists } from '$utils/cmsslots/checkIfSourceExists';
import { combineSourceElements } from '$utils/cmsslots/combineSourceElements';
import { createSlotItem } from '$utils/cmsslots/createSlotItem';
import { createSourceElement } from '$utils/cmsslots/createSourceElement';
import { createSourceItem } from '$utils/cmsslots/createSourceItem';
import { getDataFromSourceEl } from '$utils/cmsslots/getDataFromSourceElement';
import type { SlotItem, SourceData, SourceElements } from '$utils/cmsslots/types';
import { queryElement } from '$utils/queryElement';
import { sortArrayByDateProp } from '$utils/sortArrayByDateProp';

window.Webflow = window.Webflow || [];

window.Webflow.push(async () => {
  // slots list element (resource positions Webflow collection list)
  const listElement = queryElement<HTMLDivElement>('[bw-cmsslots-element="list"]');
  if (!listElement) return;

  // template element if new source elements should be created
  const templateElement =
    queryElement<HTMLDivElement>('[bw-cmsslots-element="template"]') || undefined;

  // check if source items inserts new element or replaces the empty slot element
  const shouldReplace = templateElement === undefined ? true : false;

  // creates array with slot items
  const slotItems = Array.from(listElement.childNodes).map((element, index) =>
    createSlotItem(element as HTMLDivElement, index)
  );

  // array with empty slots that will be populated from source items
  const emptySlots = slotItems.filter((slot) => !slot.isPopulated);

  // source elements from multiple lists
  const { elements: sourceElements, parent: sourceParentEl } =
    combineSourceElements() as SourceElements;
  if (!sourceElements?.length) return;

  // sort elements by publish date

  // create slot items from source elements
  const sourceItems = sourceElements.map((el) => {
    const { published, slug } = el.dataset;
    if (!published || !slug) return;

    // if new element should be created
    const data = {};

    return createSourceItem(el, published, slug, shouldReplace, data);
  });

  // sort source items by publish date and render to list
  sortArrayByDateProp(sourceItems, 'published', 'desc');
  sourceParentEl.innerHTML = '';
  sourceItems.forEach((item) => {
    if (!item?.element) return;
    sourceParentEl.appendChild(item?.element);
  });

  // removes source items' element that already exist in slot items
  sourceItems.forEach((item) => {
    if (!item) return;
    checkIfSourceExists(item.slug, slotItems) ? item.element?.remove() : undefined;
  });

  // source items filtered out by source resources that is present in any slot resource
  const filteredSourceItems = sourceItems
    .filter((item) => {
      if (!item) return;
      return !checkIfSourceExists(item.slug, slotItems);
    })
    .slice(0, emptySlots.length);

  if (!shouldReplace) {
    filteredSourceItems.forEach((sourceItem) => {
      if (!sourceItem) return;

      // get data from element
      const data = getDataFromSourceEl(sourceItem.element as HTMLDivElement) as SourceData;

      // create new element
      const newEl = createSourceElement(data, templateElement as HTMLDivElement);

      // remove old element
      sourceItem.element?.remove();

      // find slot item
      const slotItem = slotItems.find((slot) => !slot.isPopulated);
      if (!slotItem) return;

      // replace slot items element with source items element
      replaceSlotElement(newEl, slotItem);
    });

    return;
  }

  if (shouldReplace) {
    filteredSourceItems.forEach((sourceItem) => {
      if (!sourceItem?.element) return;

      // find slot item that is not populated
      const slotItem = slotItems.find((slot) => !slot.isPopulated);
      if (!slotItem) return;

      replaceSlotElement(sourceItem.element, slotItem);
    });
  }
});

function replaceSlotElement(element: HTMLDivElement, slotItem: SlotItem) {
  // replace slot items element with element
  slotItem.element.replaceWith(element);
  // set to populated
  slotItem.isPopulated = true;
}
