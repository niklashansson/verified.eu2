/**
 * @description Set the HTML lang attribute to the current locale ISO code
 * @param {string} isoCode - The locale ISO code
 */
export function setHTMLLangAttribute(isoCode: string) {
  if (isoCode) document.documentElement.setAttribute('lang', isoCode);
}
