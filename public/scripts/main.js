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
async function send() {
  const msg = document.getElementById("msg").value;

  const res = await fetch("https://cursed-6ea8.onrender.com/api/chat"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ message: msg })
  });

  const data = await res.json();
  alert(data.reply);
}
