import { getLocale } from '$utils/getLocaleFromPath';
import { setHTMLLangAttribute } from '$utils/setHTMLLangAttribute';
import { setLangSelectorLinks } from '$utils/setLangSelectorLinks';

window.Webflow ||= [];
window.Webflow.push(() => {
  // set the HTML lang attribute to the current locale ISO code
  const { isoCode } = getLocale();
  setHTMLLangAttribute(isoCode);

  // set the language switcher links to the existing hreflang links in the head of the document
  setLangSelectorLinks();
});
