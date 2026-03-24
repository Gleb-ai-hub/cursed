const btn = document.getElementById('contacts');
const menu = document.getElementById('menuList');

btn.addEventListener('click', (event) => {
  menu.classList.toggle('show');
});

window.onclick = (event) => {
  if (!event.target.closest('#contacts') && !event.target.closest('#menuList')) {
    menu.classList.remove('show');
  }
};
