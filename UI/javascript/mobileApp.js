/* Mobile Menu */
const mobileMenuBtn = document.querySelector('.menu__btn');
const mobileMenuWrapper = document.querySelector('.mobile_menu');
const closeMenuBtn = document.querySelector('.menu__close');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenuWrapper.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  });
  closeMenuBtn.addEventListener('click', () => {
    mobileMenuWrapper.classList.add('hidden');
    document.body.style.overflow = 'unset';
  });
