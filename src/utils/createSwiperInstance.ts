import { Swiper } from 'swiper';
import type { SwiperOptions } from 'swiper/types/swiper-options';

/**
 * @description Create a new Swiper instance
 * @param {HTMLDivElement} element swiper-wrapper element
 * @param { SwiperOptions} swiperOptions options for the swiper instance
 * @returns {Swiper} Swiper instance
 */
export function createSwiperInstance(element: HTMLDivElement, swiperOptions: SwiperOptions) {
  return new Swiper(element, swiperOptions);
}
