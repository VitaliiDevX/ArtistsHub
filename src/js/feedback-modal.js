import Raty from 'raty-js';
import axios from 'axios';
import iziToast from 'izitoast';

const BASE_URL = 'https://sound-wave.b.goit.study/api';
const FEEDBACK_PATH = '/feedbacks';

const feedbackBtnEl = document.querySelector('.js-feedback-btn');
const feedbackBackdropEl = document.querySelector('.backdrop-feedback-modal');
const feedbackFormEl = document.querySelector('.feedback-modal-form');
const feedbackCloseBtn = document.querySelector('.js-feedback-modal-close-btn');
const bodyElement = document.body;
const rating = document.querySelector('[data-raty]');

//! Зірочки
const raty = new Raty(rating, {
  starType: 'i',
});

raty.init();

// ! Запост фідбеку на сервер

const postFeedback = feedback => {
  return axios.post(`${BASE_URL}${FEEDBACK_PATH}`, feedback);
};

//! Валідація
const validateFeedbackData = data => {
  if (!data.name || data.name.length < 3) {
    iziToast.warning({
      message: 'Name must be at least 3 characters long',
      position: 'topRight',
      color: '#764191',
    });
    return false;
  }

  if (!data.descr || data.descr.length < 10) {
    iziToast.warning({
      message: 'Description must be at least 10 characters long',
      position: 'topRight',
    });
    return false;
  }
  if (data.rating === undefined) {
    iziToast.warning({
      message: 'Rating must be between 1 and 5',
      position: 'topRight',
    });
    return false;
  }

  return true;
};

// ! Дія на кнопку сабміт
const onFeedbackFormSubmit = async event => {
  event.preventDefault();

  const newFeedback = {
    name: feedbackFormEl.elements.name.value.trim(),
    rating: raty.score(),
    descr: feedbackFormEl.elements.message.value.trim(),
  };

  console.log(newFeedback);

  if (!validateFeedbackData(newFeedback)) {
    return;
  }
  console.log(newFeedback);

  try {
    const response = await postFeedback(newFeedback);

    console.log(response);

    iziToast.success({
      message: 'Your feedback submited successfully',
      position: 'topRight',
    });

    localStorage.removeItem('feedbackFormData');
    feedbackFormEl.reset();
    raty.score(0);

    onfeedbackCloseBtnClick();
  } catch (err) {
    console.log(err);
    iziToast.error({
      message: 'Error submitting feedback',
      position: 'topRight',
    });
  }
};

const onfeedbackCloseBtnClick = () => {
  feedbackBackdropEl.classList.remove('is-open');
  bodyElement.classList.remove('no-scroll');
};

const onfeedbackBtnClick = () => {
  feedbackBackdropEl.classList.add('is-open');
  bodyElement.classList.add('no-scroll');
};

const onEscPress = ({ key }) => {
  if (key === 'Escape') {
    onfeedbackCloseBtnClick();
  }
};

const onBackdropClickClose = ({ target }) => {
  if (target === feedbackBackdropEl) {
    onfeedbackCloseBtnClick();
  }
};

const getDataFromLS = () => {
  const savedData = JSON.parse(localStorage.getItem('feedbackFormData'));

  if (savedData) {
    feedbackFormEl.elements.name.value = savedData.name || '';
    feedbackFormEl.elements.message.value = savedData.descr || '';

    if (savedData.rating) {
      raty.score(savedData.rating);
    }
  }
};

const addDataFromLSToForm = () => {
  const formData = {
    name: feedbackFormEl.elements.name.value.trim(),
    descr: feedbackFormEl.elements.message.value.trim(),
    rating: raty.score(),
  };

  localStorage.setItem('feedbackFormData', JSON.stringify(formData));
};

//! Відкриття модалки
feedbackBtnEl.addEventListener('click', onfeedbackBtnClick);

//! Закриття модалки
feedbackCloseBtn.addEventListener('click', onfeedbackCloseBtnClick);

window.addEventListener('keydown', onEscPress);

window.addEventListener('click', onBackdropClickClose);

feedbackFormEl.addEventListener('submit', onFeedbackFormSubmit);

window.addEventListener('DOMContentLoaded', getDataFromLS);

feedbackFormEl.addEventListener('click', addDataFromLSToForm);
