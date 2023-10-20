import { getPathFromUrl } from './getPathFromUrl';

/**
 * Set hreflang links
 */

interface hrefLangObj {
  href: string | null;
  hreflang: string | null;
}

export async function setLangSelectorLinks() {
  // links in the head of the document to add to the language switcher locale links
  const hrefLangLinks = Array.from(document.querySelectorAll('link[hreflang]')).map((link) => {
    const hrefLangObj: hrefLangObj = {
      href: link.getAttribute('href'),
      hreflang: link.getAttribute('hreflang'),
    };

    return hrefLangObj;
  });

  if (!hrefLangLinks.length) return;

  // gets all locale links from language switcher
  const langSwitchLinks = Array.from(document.querySelectorAll('[switcher-lang]'));
  if (!langSwitchLinks.length) return;

  hrefLangLinks.forEach((hrefLangObj) => {
    const { href, hreflang } = hrefLangObj;

    if (href === null || hreflang === null) return;

    // find the link in the language switcher that matches the current locale
    const langSwitchLink = langSwitchLinks.find((langSwitchLink) =>
      langSwitchLink.getAttribute('switcher-lang')?.includes(hreflang)
    );

    if (!langSwitchLink) return;

    // get the path from the hreflang link
    const path = getPathFromUrl(href);
    if (!path) return;

    // set the locale link to the hreflang link
    langSwitchLink.setAttribute('href', path);
  });
}
