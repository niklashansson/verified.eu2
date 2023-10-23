import { queryElement } from '$utils/queryElement';

import type { SourceData } from './types';

/**
 * @description extract application/json data from Webflow embed from source element
 * @param sourceEl
 * @returns {SourceData}
 */

export function getDataFromSourceEl(sourceEl: HTMLDivElement) {
  const scriptEl = queryElement<HTMLDivElement>('script[type="application/json"]', sourceEl);
  const scriptTxt = scriptEl?.textContent || undefined;
  if (!scriptTxt) return;

  return JSON.parse(scriptTxt) as SourceData;
}
