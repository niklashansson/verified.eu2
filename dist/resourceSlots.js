"use strict";
(() => {
  // bin/live-reload.js
  new EventSource(`${"http://localhost:3000"}/esbuild`).addEventListener("change", () => location.reload());

  // src/utils/cmsslots/checkIfSourceExists.ts
  function checkIfSourceExists(sourceSlug, slotItems) {
    return sourceSlug ? slotItems.some((slot) => sourceSlug === slot.slug) : void 0;
  }

  // src/utils/queryElements.ts
  function queryElements(selector, parent) {
    return Array.from((parent || document).querySelectorAll(selector));
  }

  // src/utils/cmsslots/combineSourceElements.ts
  function combineSourceElements() {
    const lists = Array.from(queryElements('[bw-cmsslots-element="source-list"]'));
    if (!lists.length)
      return;
    const firstList = lists[0];
    lists.forEach((list, i) => {
      if (i === 0)
        return;
      const elements = Array.from(list.childNodes);
      if (!elements.length)
        return;
      elements.forEach((el) => firstList.appendChild(el));
      list.parentElement?.remove();
    });
    const sourceElements = Array.from(firstList.childNodes);
    if (!sourceElements.length)
      return;
    return {
      elements: sourceElements,
      parent: firstList
    };
  }

  // src/utils/cmsslots/createSlotItem.ts
  function createSlotItem(slotEl, i) {
    const { caseSlug, articleSlug, newsSlug } = slotEl.dataset;
    const slugs = [{ slug: caseSlug }, { slug: articleSlug }, { slug: newsSlug }];
    const selectedSlug = slugs.find(({ slug }) => slug);
    return {
      slug: selectedSlug ? selectedSlug.slug : "",
      index: i,
      isPopulated: selectedSlug ? true : false,
      element: slotEl
    };
  }

  // src/utils/queryElement.ts
  function queryElement(selector, parent) {
    return (parent || document).querySelector(selector);
  }

  // src/utils/cmsslots/createSourceElement.ts
  function createSourceElement(sourceData, templateElement) {
    const newElement = templateElement.cloneNode(true);
    const title = queryElement('[bw-cmsslots-data="title"]', newElement);
    const image = queryElement('[bw-cmsslots-data="thumbnail"]', newElement);
    const type = queryElement('[bw-cmsslots-data="type"]', newElement);
    const published = queryElement(
      '[bw-cmsslots-data="published"]',
      newElement
    );
    const href = queryElement('[bw-cmsslots-data="link"]', newElement);
    title ? title.textContent = sourceData.title : "";
    image ? image.src = sourceData.img : "";
    type ? type.textContent = sourceData.category : "";
    published && type?.textContent === "News" ? published.textContent = sourceData.published : published.textContent = "";
    href ? href.href = sourceData.slug : "";
    newElement.style.display = "block";
    return newElement;
  }

  // src/utils/cmsslots/createSourceItem.ts
  function createSourceItem(element, published, slug, shouldReplace, data) {
    if (!published || !slug)
      return;
    return {
      element,
      published: new Date(published),
      slug,
      shouldReplace,
      data
    };
  }

  // src/utils/cmsslots/getDataFromSourceElement.ts
  function getDataFromSourceEl(sourceEl) {
    const scriptEl = queryElement('script[type="application/json"]', sourceEl);
    const scriptTxt = scriptEl?.textContent || void 0;
    if (!scriptTxt)
      return;
    return JSON.parse(scriptTxt);
  }

  // src/utils/sortArrayByDateProp.ts
  function sortArrayByDateProp(array, dateProp, order = "desc") {
    array.sort((a, b) => {
      const dateA = new Date(a[dateProp]);
      const dateB = new Date(b[dateProp]);
      if (order === "asc") {
        return dateA.getTime() - dateB.getTime();
      }
      if (order === "desc") {
        return dateB.getTime() - dateA.getTime();
      }
      throw new Error("Order must be asc or desc");
    });
  }

  // src/resourceSlots.ts
  window.Webflow = window.Webflow || [];
  window.Webflow.push(async () => {
    const listElement = queryElement('[bw-cmsslots-element="list"]');
    if (!listElement)
      return;
    const templateElement = queryElement('[bw-cmsslots-element="template"]') || void 0;
    const shouldReplace = templateElement === void 0 ? true : false;
    const slotItems = Array.from(listElement.childNodes).map(
      (element, index) => createSlotItem(element, index)
    );
    const emptySlots = slotItems.filter((slot) => !slot.isPopulated);
    const { elements: sourceElements, parent: sourceParentEl } = combineSourceElements();
    if (!sourceElements?.length)
      return;
    const sourceItems = sourceElements.map((el) => {
      const { published, slug } = el.dataset;
      if (!published || !slug)
        return;
      const data = {};
      return createSourceItem(el, published, slug, shouldReplace, data);
    });
    sortArrayByDateProp(sourceItems, "published", "desc");
    sourceParentEl.innerHTML = "";
    sourceItems.forEach((item) => {
      if (!item?.element)
        return;
      sourceParentEl.appendChild(item?.element);
    });
    sourceItems.forEach((item) => {
      if (!item)
        return;
      checkIfSourceExists(item.slug, slotItems) ? item.element?.remove() : void 0;
    });
    const filteredSourceItems = sourceItems.filter((item) => {
      if (!item)
        return;
      return !checkIfSourceExists(item.slug, slotItems);
    }).slice(0, emptySlots.length);
    if (!shouldReplace) {
      filteredSourceItems.forEach((sourceItem) => {
        if (!sourceItem)
          return;
        const data = getDataFromSourceEl(sourceItem.element);
        const newEl = createSourceElement(data, templateElement);
        sourceItem.element?.remove();
        const slotItem = slotItems.find((slot) => !slot.isPopulated);
        if (!slotItem)
          return;
        replaceSlotElement(newEl, slotItem);
      });
      return;
    }
    if (shouldReplace) {
      filteredSourceItems.forEach((sourceItem) => {
        if (!sourceItem?.element)
          return;
        const slotItem = slotItems.find((slot) => !slot.isPopulated);
        if (!slotItem)
          return;
        replaceSlotElement(sourceItem.element, slotItem);
      });
    }
  });
  function replaceSlotElement(element, slotItem) {
    slotItem.element.replaceWith(element);
    slotItem.isPopulated = true;
  }
})();
//# sourceMappingURL=resourceSlots.js.map
