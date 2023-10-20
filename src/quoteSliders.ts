import { Controller, Navigation, Pagination } from 'swiper/modules';
import type { SwiperOptions } from 'swiper/types/swiper-options';

import { createSwiperInstance } from '$utils/createSwiperInstance';

window.Webflow ||= [];
window.Webflow.push(async () => {
  const components = [...document.querySelectorAll('[swiper="component"][swiper-options="2"]')];
  if (components.length === 0) return;

  components.forEach((component) => {
    // get the swiper element
    const element = <HTMLDivElement>component.querySelector('.swiper');
    if (!element) return;

    // get all slides in order to get Avatar images from each
    const slides = Array.from(component.querySelectorAll('.swiper-slide'));

    // get the list where Avatars will be placed
    const avatarBulletList = <HTMLDivElement>component.querySelector('[swiper="bullet-list"]');

    // select all avatars from the sliders
    const avatarBulletItems = slides.map((slide) => {
      const imgElement = slide.querySelector('img');
      return imgElement?.outerHTML;
    });

    // get the class name of template bullet
    const avatarBulletClass = component.querySelector('[swiper="bullet-class"]')?.className;

    // get the navigation arrows
    const prevEl = <HTMLDivElement>component.querySelector('[swiper="arrow-prev"]');
    const nextEl = <HTMLDivElement>component.querySelector('[swiper="arrow-next"]');

    // options passed to swiper initatior
    const options: SwiperOptions = {
      modules: [Pagination, Controller, Navigation],
      speed: 1000,
      spaceBetween: 48,
      slidesPerView: 1,
      pagination: {
        el: avatarBulletList,
        clickable: true,
        bulletClass: avatarBulletClass,
        bulletActiveClass: 'is-active',
        renderBullet: function (index: number, className: string) {
          return `<div class="${className}" role="listitem">${avatarBulletItems[index]}</div>`;
        },
      },
      navigation: {
        prevEl: prevEl,
        nextEl: nextEl,
      },
    };

    // initate the swiper
    createSwiperInstance(element, options);
  });
});
