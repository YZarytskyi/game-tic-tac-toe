const themeContainerRef = document.querySelector('.theme-container');
const itemRef = document.querySelector('.item');

themeContainerRef.addEventListener('click', onClickThemeToggle);

const savedTheme = localStorage.getItem('theme');
savedTheme === 'dark' ? toggleDark() : '';

function onClickThemeToggle() {
  localStorage.setItem('theme', document.body.className === 'dark' ? 'light' : 'dark');
  toggleDark();
}

function toggleDark() {
  document.body.classList.toggle('dark');
  themeContainerRef.classList.toggle('dark-toggler-container');
  themeContainerRef.lastElementChild.classList.toggle('dark-toggler');
  [...contentRef.children].forEach(el => {
    el.classList.toggle('item-dark')
  })
}