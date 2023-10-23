import 'video.js/dist/video-js.min.css';

import videojs from 'video.js';

import { queryElements } from '$utils/queryElements';

window.Webflow = window.Webflow || [];

window.Webflow.push(async () => {
  const elements = queryElements<HTMLVideoElement>('#verified-video-1');

  if (!elements.length) return;

  elements.forEach((element) => {
    videojs(element);
  });
});
