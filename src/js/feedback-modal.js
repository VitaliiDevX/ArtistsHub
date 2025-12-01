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

const nameErrorEl = feedbackFormEl.querySelector('[data-error-for="name"]');
const messageErrorEl = feedbackFormEl.querySelector(
  '[data-error-for="message"]'
);
const ratingErrorEl = feedbackFormEl.querySelector('[data-error-for="rating"]');

const nameInput = feedbackFormEl.elements.name;
const messageInput = feedbackFormEl.elements.message;

//! Зірочки
const raty = new Raty(rating, {
  starType: 'i',
  click(score) {
    // якщо юзер вибрав хоча б 1 зірку – знімаємо помилку
    if (score >= 1) {
      rating.classList.remove('feedback-modal-error');
      ratingErrorEl.textContent = '';
    }
  },
});

raty.init();

// ! Запост фідбеку на сервер

const postFeedback = feedback => {
  return axios.post(`${BASE_URL}${FEEDBACK_PATH}`, feedback);
};

//! Валідація
const validateFeedbackData = data => {
  nameInput.classList.remove('feedback-modal-error');
  messageInput.classList.remove('feedback-modal-error');

  nameErrorEl.textContent = '';
  messageErrorEl.textContent = '';
  ratingErrorEl.textContent = '';

  if (!data.name || data.name.length < 3) {
    nameInput.classList.add('feedback-modal-error');
    nameErrorEl.textContent = 'Name must be at least 3 characters long';

    return false;
  }

  if (!data.descr || data.descr.length < 10) {
    messageInput.classList.add('feedback-modal-error');
    messageErrorEl.textContent =
      'Description must be at least 10 characters long';

    return false;
  }
  if (!data.rating || data.rating < 1) {
    rating.classList.add('feedback-modal-error');
    ratingErrorEl.textContent = 'Please select a rating from 1 to 5';

    return false;
  }

  return true;
};

const onClickValidationCheck = () => {
  const nameValue = nameInput.value.trim();
  const messageValue = messageInput.value.trim();

  if (nameValue.length >= 3) {
    nameInput.classList.remove('feedback-modal-error');
    nameErrorEl.textContent = '';
  }
  if (messageValue.length >= 10) {
    messageInput.classList.remove('feedback-modal-error');
    messageErrorEl.textContent = '';
  }
};

// ! Дія на кнопку сабміт
const onFeedbackFormSubmit = async event => {
  event.preventDefault();

  const newFeedback = {
    name: feedbackFormEl.elements.name.value.trim(),
    rating: raty.score(),
    descr: feedbackFormEl.elements.message.value.trim(),
  };

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
      color: '#9f7ab2',
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
      color: '#af4040',
    });
  }
};

const onfeedbackCloseBtnClick = () => {
  feedbackBackdropEl.classList.remove('is-open');
  bodyElement.classList.remove('no-scroll');

  localStorage.removeItem('feedbackFormData');
  feedbackFormEl.reset();
  raty.score(0);
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
  const savedDataJSON = localStorage.getItem('feedbackFormData');

  if (!savedDataJSON) return;

  const savedData = JSON.parse(savedDataJSON);

  onfeedbackBtnClick();

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

//! видалення помилки валідації при введенні полів
feedbackFormEl.addEventListener('input', onClickValidationCheck);

//! відправка на бекенд
feedbackFormEl.addEventListener('submit', onFeedbackFormSubmit);

//! збереження, видалення і отримання даних з LS
window.addEventListener('DOMContentLoaded', getDataFromLS);
feedbackFormEl.addEventListener('click', addDataFromLSToForm);
