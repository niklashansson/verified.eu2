import { Controller, Pagination } from 'swiper/modules';
import type { SwiperOptions } from 'swiper/types/swiper-options';

import { createSwiperInstance } from '$utils/createSwiperInstance';

window.Webflow ||= [];
window.Webflow.push(async () => {
  const components = [...document.querySelectorAll('[swiper="component"][swiper-options="1"]')];
  if (components.length === 0) return;

  components.forEach((component) => {
    // get the swiper element
    const element = <HTMLDivElement>component.querySelector('.swiper');
    if (!element) return;

    // get the list where tab links will be placed
    const tabLinksList = <HTMLDivElement>component.querySelector('[swiper="bullet-list"]');

    // tab links values
    const tabLinksValues = Array.from(
      component.querySelectorAll('[swiper-pagination-element="value"]')
    ).map((value) => value.textContent);

    // get the class name of template tab link
    const tabLinkClass: string =
      component.querySelector('[swiper="bullet-class"]')?.className || '';

    // options passed to swiper initatior
    const options: SwiperOptions = {
      modules: [Pagination, Controller],
      speed: 0,
      allowTouchMove: false,
      spaceBetween: 0,
      preventClicks: true,
      slidesPerView: 1,
      pagination: {
        el: tabLinksList,
        clickable: true,
        bulletClass: tabLinkClass,
        bulletActiveClass: 'is-active',
        renderBullet: function (index: number, className: string) {
          return `<div class="${className}" role="listitem">${tabLinksValues[index]}</div>`;
        },
      },
    };

    // initate the swiper
    createSwiperInstance(element, options);
  });
});
