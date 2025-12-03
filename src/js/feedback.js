export function initFeedback() {
  const feedbackSection = document.querySelector('.feedback');
  if (!feedbackSection) return;

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          loadFeedbackLogic();
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '200px' }
  );

  observer.observe(feedbackSection);
}

async function loadFeedbackLogic() {
  const { default: Raty } = await import('raty-js');
  const { default: Swiper } = await import('swiper');
  const { Navigation, Pagination } = await import('swiper/modules');
  const { getFeedbacks } = await import('./soundwawe-api');

  const arrowBtns = document.querySelectorAll('.arrow-btn');
  const wrapper = document.querySelector('.swiper-wrapper');

  try {
    const pages = [1, 2, 3];
    const results = await Promise.all(pages.map(p => getFeedbacks(p)));

    const feedbacks = results.flat();

    const uniqueFeedbacks = feedbacks.filter(
      (item, index, self) =>
        index ===
        self.findIndex(f => f.descr === item.descr && f.name === item.name)
    );

    const shuffled = uniqueFeedbacks.sort(() => Math.random() - 0.5);

    shuffled.slice(0, 10).forEach(({ descr, name, rating }) => {
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

    // Initialize Swiper after rendering slides
    new Swiper('.swiper', {
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
        dynamicBullets: true,
        renderBullet: function (index, className) {
          return `<span class="${className}"></span>`;
        },
      },
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
