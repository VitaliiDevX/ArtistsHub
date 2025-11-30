import Splide from '@splidejs/splide';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';

export function initSliders() {
  // левый
  new Splide('#slider-left', {
    direction: 'ttb',
    height: '500px',
    type: 'loop',
    drag: false,
    arrows: false,
    pagination: false,
    autoScroll: { speed: 0.5 },
  }).mount({ AutoScroll });

  // правый
  new Splide('#slider-right', {
    direction: 'ttb',
    height: '500px',
    type: 'loop',
    drag: false,
    arrows: false,
    pagination: false,
    autoScroll: { speed: -0.5 },
  }).mount({ AutoScroll });
}

export function renderSlider() {}
/*  Vanilla sliders version */
// export function createInfiniteScroll(selector, speed = 0.3, direction = 1) {
//   const column = document.querySelector(selector);
//   const track = column.querySelector('.track');
//   const block1 = track.children[0];
//   const block2 = block1.cloneNode(true);

//   track.appendChild(block2);

//   let height = block1.offsetHeight;

//   let pos1 = 0;
//   let pos2 = height;

//   function animate() {
//     pos1 -= speed * direction;
//     pos2 -= speed * direction;

//     height = block1.offsetHeight;

//     if (direction === 1) {
//       // движение вверх
//       if (pos1 <= -height) pos1 = pos2 + height;
//       if (pos2 <= -height) pos2 = pos1 + height;
//     } else {
//       // движение вниз
//       if (pos1 >= height) pos1 = pos2 - height;
//       if (pos2 >= height) pos2 = pos1 - height;
//     }

//     block1.style.transform = `translateY(${pos1}px)`;
//     block2.style.transform = `translateY(${pos2}px)`;

//     requestAnimationFrame(animate);
//   }

//   animate();
// }
