document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById('contacts');
  const menu = document.getElementById('menuList');
 
  btn.addEventListener('click', () => {
    menu.classList.toggle('show');
  });
  window.onclick = (event) => {
    if (!event.target.closest('#contacts') && !event.target.closest('#menuList')) {
      menu.classList.remove('show');
    }
  };
});

async function send() {
  const input = document.getElementById("msg");
  const text = input.value;

  if (!text) return;

  const messages = document.getElementById("chatMessages");
  const chat = document.getElementById("aiChat");
  const ai = document.querySelector('.ai');
  const aiWrapper = document.getElementById("aiWrapper")
  const aiOpen = document.getElementById("aiOpen")

  // 👉 1. ОТКРЫВАЕМ ЧАТ
  chat.classList.add('open');
  aiWrapper.classList.add('open')
  ai.classList.add('active');
  aiOpen.textContent = "⇧";
  aiOpenStatus = true;

  // 👉 2. ДОБАВЛЯЕМ сообщение пользователя
  messages.innerHTML += `<div class="man-msg">🧑: ${text}</div>`;

  input.value = "";
  // 👉 3. ЗАПРОС К ИИ
  const typing = document.createElement("div");
  typing.className = "ai-msg typing";
  typing.textContent = "🤖: .";
  messages.appendChild(typing);
  
  let dots = 1;
  const interval = setInterval(() => {
    dots = (dots % 3) + 1;
    typing.textContent = "🤖: " + ".".repeat(dots);
  }, 500);
  
  try {
    const res = await fetch("https://cursed-6ea8.onrender.com/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: text })
    });
  
    const data = await res.json();
  
    clearInterval(interval);
    typing.remove();
   // 👉 4. ПИЧАТАЕМ ОТВЕТ
    const aiMsg = document.createElement("div");
    aiMsg.className = "ai-msg";
    aiMsg.textContent = `🤖: ${data.reply}`;
    messages.appendChild(aiMsg);
  
  } catch (err) {
    clearInterval(interval);
    typing.textContent = "🤖: ошибка";
  }
  

  // 👉 5. Скролл вниз
  messages.scrollTop = messages.scrollHeight;
}
document.getElementById("msg").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    send();
  }
});
let aiOpenStatus = false

function aiOpen(){
  const chat = document.getElementById("aiChat");
  const ai = document.querySelector('.ai');
  const aiWrapper = document.getElementById("aiWrapper")
  const aiOpen = document.getElementById("aiOpen")

 if (aiOpenStatus === false) {
  // 👉  ОТКРЫВАЕМ ЧАТ
  ai.classList.add('active');
  chat.classList.add('open');
  aiWrapper.classList.add('open')
  aiOpen.textContent = "⇧";
  aiOpenStatus = true;
 }
 else {
  // 👉  ЗАКРЫВАЕМ ЧАТ
  ai.classList.remove('active');
  chat.classList.remove('open');
  aiWrapper.classList.remove('open')
  aiOpen.textContent = "⇩";
  aiOpenStatus = false;
 }
}
