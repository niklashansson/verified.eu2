"use strict";
(() => {
  // bin/live-reload.js
  new EventSource(`${"http://localhost:3000"}/esbuild`).addEventListener("change", () => location.reload());

  // node_modules/.pnpm/@finsweet+ts-utils@0.39.2/node_modules/@finsweet/ts-utils/dist/helpers/simulateEvent.js
  var simulateEvent = (target, events) => {
    if (!Array.isArray(events))
      events = [events];
    const eventsSuccess = events.map((event) => target.dispatchEvent(new Event(event, { bubbles: true })));
    return eventsSuccess.every((success) => success);
  };

  // node_modules/.pnpm/@finsweet+ts-utils@0.39.2/node_modules/@finsweet/ts-utils/dist/webflow/closeDropdown.js
  var closeDropdown = (dropdownToggle, focusToggle = true) => {
    if (focusToggle)
      dropdownToggle.focus();
    simulateEvent(dropdownToggle, "w-close");
  };

  // src/utils/navbar/setNavDropdownsReturnLink.ts
  function setNavDropdownsReturnLink(returnLinks) {
    returnLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        const dropdown = link.closest(".w-dropdown");
        if (!dropdown)
          return;
        e.preventDefault();
        closeDropdown(dropdown);
      });
    });
  }

  // src/utils/navbar/setNavMenuToWindowHeight.ts
  var setNavMenuToWindowHeight = (menu, banner) => {
    menu.style.height = `${window.innerHeight - banner.clientHeight}px`;
  };

  // src/utils/throttleFunction.ts
  var throttleFunction = (fn, wait) => {
    let lastExecuted = Date.now();
    let timeout = null;
    return function() {
      const now = Date.now();
      const elapsed = now - lastExecuted;
      const later = () => {
        lastExecuted = Date.now();
        timeout = null;
        fn();
      };
      if (elapsed >= wait) {
        later();
      } else if (!timeout) {
        timeout = setTimeout(later, wait - elapsed);
      }
    };
  };

  // src/navbar.ts
  window.Webflow = window.Webflow || [];
  window.Webflow.push(async () => {
    const banner = document.querySelector('[verified-navbar-element="component"]');
    const menu = document.querySelector('[verified-navbar-element="menu"]');
    const toggleMenuBtn = document.querySelector(
      '[verified-navbar-element="button"]'
    );
    if (!banner || !menu || !toggleMenuBtn)
      return;
    if (window.innerWidth <= 991)
      navbarMobile();
    function navbarMobile() {
      const returnLinks = document.querySelectorAll(
        '[verified-navbar-element="close-dropdown"]'
      );
      toggleMenuBtn.addEventListener("click", () => {
        setNavMenuToWindowHeight(menu, banner);
        if (!returnLinks.length)
          return;
        setNavDropdownsReturnLink(returnLinks);
      });
    }
    const bannerClasses = banner.classList;
    const isBannerMode2 = banner.getAttribute("navbar-mode") === "2";
    let lastScrollTop = 0;
    const throttledScroll = throttleFunction(changeNavbarOnScroll, 100);
    window.addEventListener("scroll", throttledScroll);
    function changeNavbarOnScroll() {
      const scrolledPixels = window.scrollY;
      if (scrolledPixels > 20) {
        bannerClasses.add("is-bg");
        if (isBannerMode2)
          banner.setAttribute("navbar-mode", "1");
      } else if (scrolledPixels <= 20) {
        bannerClasses.remove("is-bg");
        if (isBannerMode2)
          banner.setAttribute("navbar-mode", "2");
      }
      if (scrolledPixels > lastScrollTop && scrolledPixels > 200) {
        bannerClasses.add("is-hidden");
        bannerClasses.remove("is-visible");
      } else if (scrolledPixels < lastScrollTop) {
        bannerClasses.remove("is-hidden");
        bannerClasses.add("is-visible");
      }
      lastScrollTop = scrolledPixels <= 0 ? 0 : scrolledPixels;
    }
    return () => {
      window.removeEventListener("scroll", throttledScroll);
    };
  });
})();
//# sourceMappingURL=navbar.js.map
