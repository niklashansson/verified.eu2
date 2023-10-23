import { queryElement } from '$utils/queryElement';

import type { SourceData } from './types';

export function createSourceElement(sourceData: SourceData, templateElement: HTMLDivElement) {
  const newElement = templateElement.cloneNode(true) as HTMLDivElement;

  const title = queryElement<HTMLDivElement>('[bw-cmsslots-data="title"]', newElement);
  const image = queryElement<HTMLImageElement>('[bw-cmsslots-data="thumbnail"]', newElement);
  const type = queryElement<HTMLDivElement>('[bw-cmsslots-data="type"]', newElement);
  const published = queryElement<HTMLDivElement>(
    '[bw-cmsslots-data="published"]',
    newElement
  ) as HTMLDivElement;
  const href = queryElement<HTMLLinkElement>('[bw-cmsslots-data="link"]', newElement);

  title ? (title.textContent = sourceData.title) : '';
  image ? (image.src = sourceData.img) : '';
  type ? (type.textContent = sourceData.category) : '';
  published && type?.textContent === 'News'
    ? (published.textContent = sourceData.published)
    : (published.textContent = '');
  href ? (href.href = sourceData.slug) : '';

  newElement.style.display = 'block';

  return newElement;
}
