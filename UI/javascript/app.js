const savebtn = document.querySelector('#diary-btn');
const navContainer = document.querySelector('.container');
const mobileMenuBtn = document.querySelector('.menu__btn');
const mobileMenuWrapper = document.querySelector('.mobile_menu');
const closeMenuBtn = document.querySelector('.menu__close');


savebtn.addEventListener('click', (e) => {
  e.preventDefault();

  const newTitle = document.querySelector('.diary__title').value;
  const newContent = document.querySelector('.diary__content').value;
  if (newTitle.length === 0 || newContent.length === 0) {
    //  popup message

    const popup = document.createElement('span');
    popup.className = 'popup-text';

    popup.appendChild(document.createTextNode('fill title and description!'));

    navContainer.appendChild(popup);

    savebtn.classList.toggle('show');

    setTimeout(() => {
      navContainer.removeChild(popup);
    }, 3000);
  } else {
    window.location.href = './dashboard.html';
  }
});

/* Mobile Menu */

mobileMenuBtn.addEventListener('click', () => {
  mobileMenuWrapper.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
});
closeMenuBtn.addEventListener('click', () => {
  mobileMenuWrapper.classList.add('hidden');
  document.body.style.overflow = 'unset';
});
