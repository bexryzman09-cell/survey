// Защита от просмотра кода
document.addEventListener('contextmenu', e => e.preventDefault());
document.addEventListener('keydown', e => {
    if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I')) {
        e.preventDefault();
    }
});

// Элементы
const body = document.body;
const themeToggle = document.getElementById("themeToggle");
const language = document.getElementById("language");
const togglePass = document.getElementById("togglePass");
const password = document.getElementById("password");
const userInput = document.getElementById("user");
const loginBtn = document.getElementById("loginBtn");
const spinner = document.getElementById("spinner");
const btnText = document.getElementById("btnText");
const message = document.getElementById("message");

// Тема
if (localStorage.getItem("theme") === "light") {
    body.classList.add("light");
    themeToggle.textContent = "☀";
}

themeToggle.onclick = () => {
    body.classList.toggle("light");
    const mode = body.classList.contains("light") ? "light" : "dark";
    localStorage.setItem("theme", mode);
    themeToggle.textContent = mode === "light" ? "☀" : "🌙";
};

// Показ пароля
togglePass.onclick = () => {
    password.type = password.type === "password" ? "text" : "password";
    togglePass.textContent = password.type === "password" ? "👁" : "👁‍🗨";
};

// Переводы
const translations = {
    ru: { title: "Вход в систему", login: "Войти", error: "❌ Неверные данные", placeholder: "Имя пользователя" },
    uz: { title: "Tizimga kirish", login: "Kirish", error: "❌ Xato ma'lumot", placeholder: "Foydalanuvchi nomi" },
    en: { title: "System Login", login: "Login", error: "❌ Invalid credentials", placeholder: "Username" }
};

// Язык
if (localStorage.getItem("lang")) {
    language.value = localStorage.getItem("lang");
    applyLang(language.value);
}

language.onchange = function () {
    localStorage.setItem("lang", this.value);
    applyLang(this.value);
};

function applyLang(lang) {
    document.getElementById("title").innerText = translations[lang].title;
    btnText.innerText = translations[lang].login;
    userInput.placeholder = translations[lang].placeholder;
}

// Админы
const admins = {
    "Bexruzbek": "2009",
    "xurcode": "777",
    "said": "392"
};

// ОДНОРАЗОВЫЕ ПОЛЬЗОВАТЕЛИ (ВАЖНО!)
let oneTimeUsers = [];

// Загружаем пользователей
function loadOneTimeUsers() {
    const saved = localStorage.getItem('oneTimeUsers');
    if (saved) {
        oneTimeUsers = JSON.parse(saved);
    } else {
        oneTimeUsers = [
            { username: "guestA91", password: "X9k21", used: false },
            { username: "student77", password: "P4z88", used: false },
            { username: "tempUser5", password: "Lm203", used: false },
            { username: "visitorX", password: "Qw912", used: false },
            { username: "trial09", password: "Rt556", used: false }
        ];
        localStorage.setItem('oneTimeUsers', JSON.stringify(oneTimeUsers));
    }
}

loadOneTimeUsers();

// Логин
loginBtn.onclick = function () {
    const username = userInput.value.trim();
    const pass = password.value.trim();

    if (!username || !pass) {
        message.innerText = "❌ Заполните все поля";
        message.style.color = "var(--error)";
        return;
    }

    spinner.style.display = "block";
    btnText.style.display = "none";
    message.innerText = "";

    setTimeout(() => {
        let valid = false;
        let role = "user";

        // Проверка админов
        if (admins[username] && admins[username] === pass) {
            valid = true;
            role = "admin";
        }

        // Проверка одноразовых пользователей
        if (!valid) {
            const users = JSON.parse(localStorage.getItem('oneTimeUsers')) || [];
            const userIndex = users.findIndex(u =>
                u.username === username && u.password === pass && !u.used
            );

            if (userIndex !== -1) {
                valid = true;
                // ПОМЕЧАЕМ КАК ИСПОЛЬЗОВАННЫЙ - БОЛЬШЕ НЕЛЬЗЯ!
                users[userIndex].used = true;
                localStorage.setItem('oneTimeUsers', JSON.stringify(users));
                role = "temporary";

                // СОХРАНЯЕМ ФЛАГ, ЧТО ЭТО ОДНОРАЗОВЫЙ ПОЛЬЗОВАТЕЛЬ
                localStorage.setItem('isOneTimeUser', 'true');
            }
        }

        spinner.style.display = "none";
        btnText.style.display = "block";

        if (valid) {
            localStorage.setItem('currentUser', username);
            localStorage.setItem('role', role);
            localStorage.setItem('loginTime', Date.now());

            window.location.href = "survey.html";
        } else {
            const lang = language.value;
            message.innerText = translations[lang].error;
            message.style.color = "var(--error)";
            password.value = "";
        }
    }, 1500);
};