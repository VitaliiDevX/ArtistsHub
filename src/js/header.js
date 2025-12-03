export const initHeader = () => {
  const burgerBtnWrapper = document.querySelector('.burger-btn');
  const crossIcon = document.querySelector('.cross-icon');
  const burgerIcon = document.querySelector('.burger-icon');
  const menuBurger = document.querySelector('.menu-burger');

  if (!burgerBtnWrapper || !crossIcon || !burgerIcon || !menuBurger) {
    return;
  }

  const toggle = () => {
    burgerIcon.classList.toggle('hide');
    crossIcon.classList.toggle('hide');
    menuBurger.classList.toggle('hide');
  };

  burgerBtnWrapper.addEventListener('click', toggle);

  menuBurger.addEventListener('click', event => {
    if (event.target.closest('a')) {
      toggle();
    }
  });
};
