import Raty from 'raty-js';
import Swiper from 'swiper';

const swiper = new Swiper('.swiper', {
  speed: 400,
  spaceBetween: 100,
});

const raty = new Raty(document.querySelector('[data-raty]'), {
  starType: 'i',
});

raty.init();
