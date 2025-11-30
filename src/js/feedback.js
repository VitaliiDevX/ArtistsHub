import Raty from 'raty-js';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import { getFeedbacks } from './soundwawe-api';

const arrowBtns = document.querySelectorAll('.arrow-btn');

async function renderFeedbacks() {
  const wrapper = document.querySelector('.swiper-wrapper');

  try {
    const pages = [1, 2, 3];
    const results = await Promise.all(pages.map(p => getFeedbacks(p)));

    const feedbacks = results.flat();

    const shuffled = feedbacks.sort(() => Math.random() - 0.5);

    shuffled.slice(0, 8).forEach(({ descr, name, rating }) => {
      const slide = document.createElement('div');
      slide.classList.add('swiper-slide');

      const roundedRating = Math.round(rating);

      slide.innerHTML = `
      <div class="feedback-item">
        <div class="raty" data-score="${roundedRating}"></div>
        <p class="feedback-text">"${descr}"</p>
        <p class="feedback-author">${name}</p>
      </div>
    `;

      wrapper.appendChild(slide);
    });

    document.querySelectorAll('.raty').forEach(el => {
      const score = el.dataset.score;
      const raty = new Raty(el, { starType: 'i', score, readOnly: true });
      raty.init();
    });
  } catch (error) {
    console.error('Error fetching feedbacks:', error);

    wrapper.innerHTML = `
      <div class="swiper-slide">
        <div class="feedback-item">
          <p class="feedback-text">Could not load reviews. Please try again later.</p>
        </div>
      </div>
    `;

    arrowBtns.forEach(a => {
      a.style.display = 'none';
    });
  }
}
renderFeedbacks().then(() => {
  const swiper = new Swiper('.swiper', {
    modules: [Navigation, Pagination],
    speed: 400,
    spaceBetween: 30,
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      renderBullet: function (index, className) {
        return `<span class="${className}"></span>`;
      },
    },
  });
});
