// Защита от просмотра кода
document.addEventListener('contextmenu', event => event.preventDefault());
document.addEventListener('keydown', function (e) {
    if (e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && e.key === 'I') ||
        (e.ctrlKey && e.shiftKey && e.key === 'J') ||
        (e.ctrlKey && e.key === 'r') ||
        (e.ctrlKey && e.key === 'R') ||
        (e.key === 'F5') ||
        (e.ctrlKey && e.key === 'F5') ||
        (e.ctrlKey && e.shiftKey && e.key === 'r')) {
        e.preventDefault();
        return false;
    }
});

// Предупреждение при попытке обновить страницу
window.addEventListener('beforeunload', function (e) {
    if (document.getElementById('quizContent') && !document.getElementById('quizContent').classList.contains('hidden')) {
        e.preventDefault();
        e.returnValue = '';
        return '';
    }
});

// Проверка авторизации
if (!localStorage.getItem('currentUser')) {
    window.location.href = 'index.html';
}

// ==== ПОЛУЧАЕМ ДАННЫЕ ====
const role = localStorage.getItem("role") || "guest";
const username = localStorage.getItem("currentUser") || "Гость";

// Проверяем, проходил ли пользователь тест (кроме админа)
const userTestKey = `test_completed_${username}`;
const testCompleted = localStorage.getItem(userTestKey);

// ==== ЭЛЕМЕНТЫ ====
const elements = {
    startUser: document.getElementById("startUser"),
    startBtn: document.getElementById("startBtn"),
    startScreen: document.getElementById("startScreen"),
    quizContent: document.getElementById("quizContent"),
    resultScreen: document.getElementById("resultScreen"),
    quizCard: document.getElementById("quizCard"),
    nextBtn: document.getElementById("nextBtn"),
    backBtn: document.getElementById("backBtn"),
    progress: document.getElementById("progress"),
    finalScore: document.getElementById("finalScore"),
    themeToggle: document.getElementById("themeToggle"),
    language: document.getElementById("language"),
    logoutBtn: document.getElementById("logoutBtn"),
    userRole: document.getElementById("userRole"),
    userName: document.getElementById("userName"),
    questionCounter: document.getElementById("questionCounter"),
    adminPanel: document.getElementById("adminPanel"),
    questionsList: document.getElementById("questionsList"),
    addQuestionBtn: document.getElementById("addQuestionBtn"),
    saveQuestionsBtn: document.getElementById("saveQuestionsBtn"),
    correctCount: document.getElementById("correctCount"),
    percentValue: document.getElementById("percentValue"),
    answersList: document.getElementById("answersList")
};

// ==== ВОПРОСЫ ====
let questions = JSON.parse(localStorage.getItem('surveyQuestions')) || [
    {
        question: "Что такое HTML?",
        answers: ["Язык разметки", "База данных", "Сервер"],
        correct: 0
    },
    {
        question: "CSS отвечает за?",
        answers: ["Стиль", "Логику", "API"],
        correct: 0
    },
    {
        question: "JS нужен для?",
        answers: ["Интерактивности", "Цвета", "Шрифтов"],
        correct: 0
    },
    {
        question: "SCSS это?",
        answers: ["CSS препроцессор", "Браузер", "Фреймворк"],
        correct: 0
    },
    {
        question: "Как подключить JS?",
        answers: ["<script>", "<link>", "<style>"],
        correct: 0
    },
    {
        question: "Flexbox нужен для?",
        answers: ["Расположения элементов", "Цветов", "Файлов"],
        correct: 0
    },
    {
        question: "Grid это?",
        answers: ["Сетка на странице", "Сервер", "База данных"],
        correct: 0
    },
    {
        question: "localStorage хранит?",
        answers: ["Данные в браузере", "Видео", "Фото"],
        correct: 0
    },
    {
        question: "addEventListener используется для?",
        answers: ["Событий", "Стилей", "Файлов"],
        correct: 0
    },
    {
        question: "DOM это?",
        answers: ["Document Object Model", "Database", "Drive"],
        correct: 0
    }
];

// ==== ПЕРЕМЕННЫЕ ТЕСТА ====
let currentQuestion = 0;
let score = 0;
let userAnswers = new Array(questions.length).fill(null);

// ==== УСТАНАВЛИВАЕМ ИНФОРМАЦИЮ О ПОЛЬЗОВАТЕЛЕ ====
if (elements.startUser) {
    elements.startUser.textContent = `Привет, ${username}!`;
}

if (elements.userRole) {
    elements.userRole.textContent = role === 'admin' ? '👑 Админ' : '👤 Пользователь';
}

if (elements.userName) {
    elements.userName.textContent = username;
}

// ==== ПРОВЕРКА ДОСТУПА К ТЕСТУ ====
function checkTestAccess() {
    if (testCompleted && role !== 'admin') {
        if (elements.startScreen) {
            elements.startScreen.innerHTML = `
                <h2>${username}</h2>
                <p>Вы уже прошли этот тест.</p>
                <p>Только администратор может проходить тест повторно.</p>
                <button onclick="logout()" class="btn-glow">Выйти</button>
            `;
        }
        if (elements.startBtn) {
            elements.startBtn.style.display = 'none';
        }
        return false;
    }
    return true;
}

// ==== ПОКАЗЫВАЕМ АДМИН-ПАНЕЛЬ ====
if (role === 'admin' && elements.adminPanel) {
    elements.adminPanel.classList.remove('hidden');
    if (elements.backBtn) {
        elements.backBtn.classList.remove('hidden');
    }
    loadQuestionsList();
}

// ==== ТЕМА ====
if (elements.themeToggle) {
    if (localStorage.getItem("theme") === "light") {
        document.body.classList.add("light");
        elements.themeToggle.textContent = "☀";
    }

    elements.themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("light");
        const mode = document.body.classList.contains("light") ? "light" : "dark";
        localStorage.setItem("theme", mode);
        elements.themeToggle.textContent = mode === "light" ? "☀" : "🌙";
    });
}

// ==== ЯЗЫК ====
if (elements.language) {
    if (localStorage.getItem("lang")) {
        elements.language.value = localStorage.getItem("lang");
    }
}

// ==== СТАРТ ТЕСТА ====
if (elements.startBtn) {
    if (!checkTestAccess()) {
        elements.startBtn.style.display = 'none';
    } else {
        elements.startBtn.addEventListener("click", startTest);
    }
}

function startTest() {
    elements.startScreen.classList.add("hidden");
    elements.quizContent.classList.remove("hidden");
    elements.resultScreen.classList.add("hidden");

    currentQuestion = 0;
    score = 0;
    userAnswers = new Array(questions.length).fill(null);

    showQuestion();
}

// ==== ПОКАЗ ВОПРОСА ====
function showQuestion() {
    if (!elements.quizCard) return;

    const question = questions[currentQuestion];

    if (elements.questionCounter) {
        elements.questionCounter.textContent = `Вопрос ${currentQuestion + 1}/${questions.length}`;
    }

    let html = `
        <div class="answers-container">
            <h3 class="question-title">${currentQuestion + 1}. ${question.question}</h3>
    `;

    for (let i = 0; i < question.answers.length; i++) {
        let answerClass = "answer";

        // Если этот ответ был выбран пользователем, добавляем класс selected
        if (userAnswers[currentQuestion] === i) {
            answerClass += " selected";
        }

        html += `<div class="${answerClass}" data-index="${i}">${question.answers[i]}</div>`;
    }

    html += `</div>`;

    elements.quizCard.innerHTML = html;

    // Добавляем обработчики
    document.querySelectorAll(".answer").forEach(answer => {
        answer.addEventListener("click", function () {
            selectAnswer(parseInt(this.dataset.index));
        });
    });

    // Обновляем прогресс
    if (elements.progress) {
        const progressPercent = ((currentQuestion + 1) / questions.length) * 100;
        elements.progress.style.width = progressPercent + "%";
    }
}

// ==== ВЫБОР ОТВЕТА ====
function selectAnswer(index) {
    if (userAnswers[currentQuestion] !== null) return;

    // Сохраняем ответ пользователя
    userAnswers[currentQuestion] = index;

    // Подсвечиваем выбранный ответ
    const answers = document.querySelectorAll(".answer");
    answers.forEach(answer => {
        answer.classList.remove("selected");
    });

    // Добавляем класс selected только выбранному ответу
    answers[index].classList.add("selected");

    // Считаем правильные ответы (но не показываем их)
    if (index === questions[currentQuestion].correct) {
        score++;
    }
}

// ==== КНОПКА ДАЛЕЕ ====
if (elements.nextBtn) {
    elements.nextBtn.addEventListener("click", () => {
        if (userAnswers[currentQuestion] === null) {
            alert("Пожалуйста, выберите ответ!");
            return;
        }

        currentQuestion++;

        if (currentQuestion < questions.length) {
            showQuestion();
        } else {
            finishQuiz();
        }
    });
}

// ==== КНОПКА НАЗАД ====
if (elements.backBtn) {
    elements.backBtn.addEventListener("click", () => {
        if (role !== "admin") {
            alert("Только администратор может вернуться к предыдущему вопросу!");
            return;
        }

        if (currentQuestion > 0) {
            currentQuestion--;
            showQuestion();
        }
    });
}

// ==== ЗАВЕРШЕНИЕ ТЕСТА ====
function finishQuiz() {
    elements.quizContent.classList.add("hidden");
    elements.resultScreen.classList.remove("hidden");

    const percent = Math.round((score / questions.length) * 100);

    if (elements.finalScore) {
        elements.finalScore.textContent = `${username}, ваш результат: ${score}/${questions.length}`;
    }

    if (elements.correctCount) {
        elements.correctCount.textContent = `${score}/${questions.length}`;
    }

    if (elements.percentValue) {
        elements.percentValue.textContent = percent + '%';
    }

    // Показываем правильные ответы ТОЛЬКО в результатах
    showAnswersReview();

    // Отмечаем, что пользователь прошел тест (если это не админ)
    if (role !== 'admin') {
        localStorage.setItem(userTestKey, 'completed');
    }
}

// ==== ПОКАЗ ПРАВИЛЬНЫХ ОТВЕТОВ (ТОЛЬКО В РЕЗУЛЬТАТАХ) ====
function showAnswersReview() {
    if (!elements.answersList) return;

    let html = '';

    questions.forEach((q, index) => {
        const userAnswer = userAnswers[index];
        const isCorrect = userAnswer === q.correct;
        const correctAnswerText = q.answers[q.correct];
        const userAnswerText = userAnswer !== null ? q.answers[userAnswer] : 'Не выбран';

        html += `
            <div class="review-item ${isCorrect ? 'correct-answer' : 'wrong-answer'}">
                <div class="review-question">${index + 1}. ${q.question}</div>
                <div class="review-answers">
                    <span class="review-answer correct-answer">✓ Правильный: ${correctAnswerText}</span>
                    <span class="review-answer ${userAnswer !== null ? (isCorrect ? 'both-correct' : 'user-selected') : ''}">
                        ${userAnswer !== null ? 'Ваш ответ: ' + userAnswerText : '❌ Ответ не выбран'}
                    </span>
                </div>
                <div class="review-status ${isCorrect ? 'status-correct' : 'status-wrong'}">
                    ${isCorrect ? '✅ Правильно' : '❌ Неправильно'}
                </div>
            </div>
        `;
    });

    elements.answersList.innerHTML = html;
}

// ==== ЗАГРУЗКА ВОПРОСОВ ДЛЯ АДМИНА ====
function loadQuestionsList() {
    if (!elements.questionsList) return;

    let html = '';

    questions.forEach((q, index) => {
        html += `
            <div class="question-edit" data-index="${index}">
                <input type="text" class="q-text" value="${q.question.replace(/"/g, '&quot;')}" placeholder="Вопрос">
                <input type="text" class="a1" value="${q.answers[0].replace(/"/g, '&quot;')}" placeholder="Ответ 1">
                <input type="text" class="a2" value="${q.answers[1].replace(/"/g, '&quot;')}" placeholder="Ответ 2">
                <input type="text" class="a3" value="${q.answers[2].replace(/"/g, '&quot;')}" placeholder="Ответ 3">
                <select class="correct-select">
                    <option value="0" ${q.correct === 0 ? 'selected' : ''}>Ответ 1</option>
                    <option value="1" ${q.correct === 1 ? 'selected' : ''}>Ответ 2</option>
                    <option value="2" ${q.correct === 2 ? 'selected' : ''}>Ответ 3</option>
                </select>
                <button class="delete-btn" onclick="deleteQuestion(${index})">🗑️ Удалить</button>
            </div>
        `;
    });

    elements.questionsList.innerHTML = html;
}

// ==== ДОБАВЛЕНИЕ ВОПРОСА ====
if (elements.addQuestionBtn) {
    elements.addQuestionBtn.addEventListener("click", () => {
        questions.push({
            question: "Новый вопрос",
            answers: ["Ответ 1", "Ответ 2", "Ответ 3"],
            correct: 0
        });
        loadQuestionsList();
    });
}

// ==== СОХРАНЕНИЕ ВОПРОСОВ ====
if (elements.saveQuestionsBtn) {
    elements.saveQuestionsBtn.addEventListener("click", () => {
        const questionEdits = document.querySelectorAll('.question-edit');

        questionEdits.forEach((edit, index) => {
            const qText = edit.querySelector('.q-text').value;
            const a1 = edit.querySelector('.a1').value;
            const a2 = edit.querySelector('.a2').value;
            const a3 = edit.querySelector('.a3').value;
            const correct = parseInt(edit.querySelector('.correct-select').value);

            if (index < questions.length) {
                questions[index] = {
                    question: qText,
                    answers: [a1, a2, a3],
                    correct: correct
                };
            }
        });

        localStorage.setItem('surveyQuestions', JSON.stringify(questions));
        alert('✅ Вопросы сохранены!');
    });
}

// ==== УДАЛЕНИЕ ВОПРОСА ====
window.deleteQuestion = function (index) {
    if (confirm('Вы уверены, что хотите удалить этот вопрос?')) {
        questions.splice(index, 1);
        loadQuestionsList();
    }
};

// ==== ВЫХОД ====
window.logout = function () {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('role');
    localStorage.removeItem('loginTime');
    window.location.href = 'index.html';
};

window.goToStart = function () {
    elements.resultScreen.classList.add("hidden");
    elements.startScreen.classList.remove("hidden");
};

window.restartTest = function () {
    if (role !== 'admin') {
        alert('Только администратор может проходить тест повторно!');
        return;
    }
    startTest();
};

if (elements.logoutBtn) {
    elements.logoutBtn.addEventListener("click", logout);
}

// Добавляем CSS для выделения выбранного ответа
const style = document.createElement('style');
style.textContent = `
    .answer.selected {
        background: linear-gradient(135deg, var(--accent), var(--accent-secondary));
        color: white;
        border-color: var(--accent);
        transform: scale(1.02);
        box-shadow: var(--neon-shadow);
    }
    
    .answer.selected:hover {
        transform: scale(1.02);
    }
`;
document.head.appendChild(style);

// Проверяем доступ при загрузке страницы
checkTestAccess();