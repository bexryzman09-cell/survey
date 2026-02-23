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
    ru: {
        title: "Вход в систему",
        login: "Войти",
        error: "❌ Неверные данные или пароль уже использован",
        placeholder: "Имя пользователя",
        success: "✅ Успешный вход!"
    },
    uz: {
        title: "Tizimga kirish",
        login: "Kirish",
        error: "❌ Xato ma'lumot yoki parol ishlatilgan",
        placeholder: "Foydalanuvchi nomi",
        success: "✅ Muvaffaqiyatli kirish!"
    },
    en: {
        title: "System Login",
        login: "Login",
        error: "❌ Invalid credentials or password already used",
        placeholder: "Username",
        success: "✅ Login successful!"
    }
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

// ==== ОДНОРАЗОВЫЕ ПАРОЛИ (40 штук) ====
let oneTimePasswords = [];

// Функция для генерации случайных паролей
function generatePasswords(count) {
    const passwords = [];
    const prefixes = ['TEMP', 'GUEST', 'USER', 'ACCESS', 'CODE', 'KEY', 'OPEN', 'ENTER', 'VISIT', 'LOGIN'];
    const suffixes = ['001', '002', '003', '004', '005', '006', '007', '008', '009', '010',
        '011', '012', '013', '014', '015', '016', '017', '018', '019', '020',
        '021', '022', '023', '024', '025', '026', '027', '028', '029', '030',
        '031', '032', '033', '034', '035', '036', '037', '038', '039', '040'];

    for (let i = 0; i < count; i++) {
        const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
        const suffix = suffixes[i];
        const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');

        passwords.push({
            username: `${prefix}_${suffix}`,
            password: `${prefix}${randomNum}`,
            used: false,
            created: new Date().toISOString()
        });
    }

    return passwords;
}

// Загружаем одноразовые пароли
function loadOneTimePasswords() {
    const saved = localStorage.getItem('oneTimePasswords');
    if (saved) {
        oneTimePasswords = JSON.parse(saved);
    } else {
        // Создаем 40 одноразовых паролей
        oneTimePasswords = [
            // Основные тестовые (10 штук)
            { username: "guest_001", password: "guest123", used: false },
            { username: "tester_001", password: "test456", used: false },
            { username: "demo_001", password: "demo789", used: false },
            { username: "user_001", password: "user123", used: false },
            { username: "temp_001", password: "temp456", used: false },
            { username: "access_001", password: "access789", used: false },
            { username: "code_001", password: "code123", used: false },
            { username: "key_001", password: "key456", used: false },
            { username: "open_001", password: "open789", used: false },
            { username: "enter_001", password: "enter123", used: false },

            // TEMP серия (10 штук)
            { username: "TEMP_001", password: "TEMP2024_01", used: false },
            { username: "TEMP_002", password: "TEMP2024_02", used: false },
            { username: "TEMP_003", password: "TEMP2024_03", used: false },
            { username: "TEMP_004", password: "TEMP2024_04", used: false },
            { username: "TEMP_005", password: "TEMP2024_05", used: false },
            { username: "TEMP_006", password: "TEMP2024_06", used: false },
            { username: "TEMP_007", password: "TEMP2024_07", used: false },
            { username: "TEMP_008", password: "TEMP2024_08", used: false },
            { username: "TEMP_009", password: "TEMP2024_09", used: false },
            { username: "TEMP_010", password: "TEMP2024_10", used: false },

            // GUEST серия (10 штук)
            { username: "GUEST_011", password: "GUEST111", used: false },
            { username: "GUEST_012", password: "GUEST222", used: false },
            { username: "GUEST_013", password: "GUEST333", used: false },
            { username: "GUEST_014", password: "GUEST444", used: false },
            { username: "GUEST_015", password: "GUEST555", used: false },
            { username: "GUEST_016", password: "GUEST666", used: false },
            { username: "GUEST_017", password: "GUEST777", used: false },
            { username: "GUEST_018", password: "GUEST888", used: false },
            { username: "GUEST_019", password: "GUEST999", used: false },
            { username: "GUEST_020", password: "GUEST000", used: false },

            // ACCESS серия (10 штук)
            { username: "ACCESS_021", password: "ACCESS123", used: false },
            { username: "ACCESS_022", password: "ACCESS456", used: false },
            { username: "ACCESS_023", password: "ACCESS789", used: false },
            { username: "ACCESS_024", password: "ACCESS321", used: false },
            { username: "ACCESS_025", password: "ACCESS654", used: false },
            { username: "ACCESS_026", password: "ACCESS987", used: false },
            { username: "ACCESS_027", password: "ACCESS147", used: false },
            { username: "ACCESS_028", password: "ACCESS258", used: false },
            { username: "ACCESS_029", password: "ACCESS369", used: false },
            { username: "ACCESS_030", password: "ACCESS741", used: false },

            // Дополнительные (10 штук для запаса)
            { username: "VISITOR_031", password: "VISITOR123", used: false },
            { username: "VISITOR_032", password: "VISITOR456", used: false },
            { username: "VISITOR_033", password: "VISITOR789", used: false },
            { username: "VISITOR_034", password: "VISITOR321", used: false },
            { username: "VISITOR_035", password: "VISITOR654", used: false },
            { username: "VISITOR_036", password: "VISITOR987", used: false },
            { username: "VISITOR_037", password: "VISITOR147", used: false },
            { username: "VISITOR_038", password: "VISITOR258", used: false },
            { username: "VISITOR_039", password: "VISITOR369", used: false },
            { username: "VISITOR_040", password: "VISITOR741", used: false }
        ];
        localStorage.setItem('oneTimePasswords', JSON.stringify(oneTimePasswords));
    }
}

// Функция для проверки и использования одноразового пароля
function useOneTimePassword(username, password) {
    const passwords = JSON.parse(localStorage.getItem('oneTimePasswords')) || [];
    const index = passwords.findIndex(p =>
        p.username === username && p.password === password && !p.used
    );

    if (index !== -1) {
        // Помечаем как использованный
        passwords[index].used = true;
        passwords[index].usedBy = username;
        passwords[index].usedAt = new Date().toISOString();
        localStorage.setItem('oneTimePasswords', JSON.stringify(passwords));
        return true;
    }
    return false;
}

// Функция для получения списка неиспользованных паролей (для админов)
function getAvailablePasswords() {
    const passwords = JSON.parse(localStorage.getItem('oneTimePasswords')) || [];
    return passwords.filter(p => !p.used);
}

// Функция для добавления нового одноразового пароля (для админов)
function addOneTimePassword(username, password) {
    const passwords = JSON.parse(localStorage.getItem('oneTimePasswords')) || [];
    passwords.push({
        username: username,
        password: password,
        used: false,
        created: new Date().toISOString()
    });
    localStorage.setItem('oneTimePasswords', JSON.stringify(passwords));
}

// Загружаем пароли
loadOneTimePasswords();

// Логин
loginBtn.onclick = function () {
    const username = userInput.value.trim();
    const pass = password.value.trim();

    if (!username || !pass) {
        message.innerText = "❌ Заполните все поля";
        message.style.color = "var(--error)";
        return;
    }

    // Показываем спиннер
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
            valid = useOneTimePassword(username, pass);
            if (valid) {
                role = "temporary";
                // СОХРАНЯЕМ ФЛАГ, ЧТО ЭТО ОДНОРАЗОВЫЙ ПОЛЬЗОВАТЕЛЬ
                localStorage.setItem('isOneTimeUser', 'true');

                // Записываем в историю входов
                const loginHistory = JSON.parse(localStorage.getItem('loginHistory')) || [];
                loginHistory.push({
                    username: username,
                    time: new Date().toISOString(),
                    type: 'one-time'
                });
                localStorage.setItem('loginHistory', JSON.stringify(loginHistory));
            }
        }

        spinner.style.display = "none";
        btnText.style.display = "block";

        if (valid) {
            localStorage.setItem('currentUser', username);
            localStorage.setItem('role', role);
            localStorage.setItem('loginTime', Date.now());

            // Показываем сообщение об успехе
            const lang = language.value;
            message.innerText = translations[lang].success;
            message.style.color = "var(--success)";

            // Перенаправляем через небольшую задержку
            setTimeout(() => {
                window.location.href = "survey.html";
            }, 500);
        } else {
            const lang = language.value;
            message.innerText = translations[lang].error;
            message.style.color = "var(--error)";
            password.value = "";
        }
    }, 1500);
};

// Добавляем возможность просмотра доступных паролей для админов (скрытая функция)
// Можно вызвать в консоли: showAvailablePasswords()
window.showAvailablePasswords = function () {
    const available = getAvailablePasswords();
    console.log('Доступные одноразовые пароли:', available);
    return available;
};

// Функция для добавления нового пароля (для админов)
window.addNewPassword = function (username, password) {
    addOneTimePassword(username, password);
    console.log(`✅ Пароль добавлен: ${username} / ${password}`);
};

// Функция для сброса всех паролей (только для разработки)
window.resetAllPasswords = function () {
    if (confirm('Сбросить все одноразовые пароли?')) {
        localStorage.removeItem('oneTimePasswords');
        loadOneTimePasswords();
        console.log('✅ Все пароли сброшены');
    }
};