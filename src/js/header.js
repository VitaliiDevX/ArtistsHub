export const initHeader = () => {
  const burgerBtnWrapper = document.querySelector('.burger-btn');
  const croseIcon = document.querySelector('.cross-icon');
  const burgerIcon = document.querySelector('.burger-icon');

  const menuBurger = document.querySelector('.menu-burger');

  burgerBtnWrapper.addEventListener('click', () => {
    burgerIcon.classList.toggle('hide');
    croseIcon.classList.toggle('hide');

    menuBurger.classList.toggle('hide');
  });
};
