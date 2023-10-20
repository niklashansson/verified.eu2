import { setNavDropdownsReturnLink } from '$utils/navbar/setNavDropdownsReturnLink';
import { setNavMenuToWindowHeight } from '$utils/navbar/setNavMenuToWindowHeight';
import { throttleFunction } from '$utils/throttleFunction';

window.Webflow = window.Webflow || [];
window.Webflow.push(async () => {
  // select essential navbar elements
  const banner = <HTMLDivElement>document.querySelector('[verified-navbar-element="component"]');
  const menu = <HTMLMenuElement>document.querySelector('[verified-navbar-element="menu"]');
  const toggleMenuBtn = document.querySelector(
    '[verified-navbar-element="button"]'
  ) as HTMLButtonElement;
  if (!banner || !menu || !toggleMenuBtn) return;

  // run navbar mobile functionalities on smaller breakpoints
  if (window.innerWidth <= 991) navbarMobile();

  function navbarMobile() {
    // get return links from menu items' dropdown submenus
    const returnLinks: NodeListOf<HTMLButtonElement> = document.querySelectorAll(
      '[verified-navbar-element="close-dropdown"]'
    );

    toggleMenuBtn.addEventListener('click', () => {
      setNavMenuToWindowHeight(menu, banner);

      if (!returnLinks.length) return;
      setNavDropdownsReturnLink(returnLinks);
    });
  }

  const bannerClasses = banner.classList;
  const isBannerMode2 = banner.getAttribute('navbar-mode') === '2';
  let lastScrollTop = 0;

  const throttledScroll = throttleFunction(changeNavbarOnScroll, 100);
  window.addEventListener('scroll', throttledScroll);

  function changeNavbarOnScroll() {
    // number of pixels that the document is currently scrolled vertically
    const scrolledPixels = window.scrollY;

    // when scrolling down, add the background class to the navbar
    if (scrolledPixels > 20) {
      bannerClasses.add('is-bg');

      // if banner mode 2 (transparent with white text) - change navbar mode to 1 since white bg is added
      if (isBannerMode2) banner.setAttribute('navbar-mode', '1');
    }
    // change back when scrolling back to top
    else if (scrolledPixels <= 20) {
      bannerClasses.remove('is-bg');

      if (isBannerMode2) banner.setAttribute('navbar-mode', '2');
    }

    if (scrolledPixels > lastScrollTop && scrolledPixels > 200) {
      bannerClasses.add('is-hidden');
      bannerClasses.remove('is-visible');
    } else if (scrolledPixels < lastScrollTop) {
      bannerClasses.remove('is-hidden');
      bannerClasses.add('is-visible');
    }

    lastScrollTop = scrolledPixels <= 0 ? 0 : scrolledPixels;
  }

  return () => {
    window.removeEventListener('scroll', throttledScroll);
  };
});
