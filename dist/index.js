"use strict";
(() => {
  // bin/live-reload.js
  new EventSource(`${"http://localhost:3000"}/esbuild`).addEventListener("change", () => location.reload());

  // src/utils/getLocaleFromPath.ts
  var getLocale = function() {
    const path = window.location.pathname.slice(1, 3);
    let locale = { country: "International", isoCode: "en" };
    if (path === "no")
      locale = { country: "Norway", isoCode: "no" };
    if (path === "sv")
      locale = { country: "Sweden", isoCode: "sv" };
    if (path === "fi")
      locale = { country: "Finland", isoCode: "fi" };
    return locale;
  };

  // src/utils/setHTMLLangAttribute.ts
  function setHTMLLangAttribute(isoCode) {
    if (isoCode)
      document.documentElement.setAttribute("lang", isoCode);
  }

  // src/utils/getPathFromUrl.ts
  function getPathFromUrl(urlString) {
    try {
      const url = new URL(urlString);
      return url.pathname;
    } catch (e) {
      console.error("Could not extract path from URL");
      return void 0;
    }
  }

  // src/utils/setLangSelectorLinks.ts
  async function setLangSelectorLinks() {
    const hrefLangLinks = Array.from(document.querySelectorAll("link[hreflang]")).map((link) => {
      const hrefLangObj = {
        href: link.getAttribute("href"),
        hreflang: link.getAttribute("hreflang")
      };
      return hrefLangObj;
    });
    if (!hrefLangLinks.length)
      return;
    const langSwitchLinks = Array.from(document.querySelectorAll("[switcher-lang]"));
    if (!langSwitchLinks.length)
      return;
    hrefLangLinks.forEach((hrefLangObj) => {
      const { href, hreflang } = hrefLangObj;
      if (href === null || hreflang === null)
        return;
      const langSwitchLink = langSwitchLinks.find(
        (langSwitchLink2) => langSwitchLink2.getAttribute("switcher-lang")?.includes(hreflang)
      );
      if (!langSwitchLink)
        return;
      const path = getPathFromUrl(href);
      if (!path)
        return;
      langSwitchLink.setAttribute("href", path);
    });
  }

  // src/index.ts
  window.Webflow ||= [];
  window.Webflow.push(() => {
    const { isoCode } = getLocale();
    setHTMLLangAttribute(isoCode);
    setLangSelectorLinks();
  });
})();
//# sourceMappingURL=index.js.map
