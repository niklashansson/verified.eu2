import '@dotlottie/player-component';

import type { DotLottiePlayer } from '@dotlottie/player-component';

window.Webflow = window.Webflow || [];

window.Webflow.push(async () => {
  const slides = document.querySelectorAll(
    '.swiper-slide.is-productlayout1'
  ) as NodeListOf<HTMLDivElement>;

  const config = {
    attributes: true,
    attributeOldValue: true,
  };

  let debounceTimer: number;

  // Load Lottie for any slides that are initially active
  slides.forEach((slide) => {
    if (slide.classList.contains('swiper-slide-active')) {
      loadLottieForSlide(slide);
    }
  });

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
        const current = (mutation.target as HTMLDivElement).getAttribute('class');
        if (!current) return;

        const old = mutation.oldValue;
        if (!old) return;

        if (
          current.includes('swiper-slide-active') &&
          (!old || !old.includes('swiper-slide-active'))
        ) {
          clearTimeout(debounceTimer); // Clear any previous timers
          debounceTimer = setTimeout(() => {
            loadLottieForSlide(mutation.target as HTMLDivElement);
          }, 20); // Wait for 100ms to react
        }
      }
    });
  });

  slides.forEach((slide) => {
    observer.observe(slide, config);
  });
});

function loadLottieForSlide(slide: HTMLDivElement) {
  const { lottie } = slide.dataset;
  const player = slide.querySelector('dotlottie-player') as DotLottiePlayer;
  if (!player || !lottie) return;
  const { lottieLoaded } = player.dataset;

  if (lottieLoaded) return;
  player.load(lottie);
  player.setAttribute('data-lottie-loaded', 'true');
}
