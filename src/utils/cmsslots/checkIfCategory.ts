import { CATEGORY_CONSTANTS } from './config';

/**
 * @param string string to check against Resources category constants
 * @returns {boolean}
 */

export function checkIfCategory(string: string) {
  return CATEGORY_CONSTANTS.some((category) => string === category.locale);
}

export function checkIfNews(string: string) {
  return CATEGORY_CONSTANTS.some(
    (category) => category.locale === string && category.en === 'News'
  );
}
