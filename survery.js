// Защита
document.addEventListener('contextmenu', e => e.preventDefault());
document.addEventListener('keydown', e => {
    if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I')) {
        e.preventDefault();
    }
});

// ПРОВЕРКА ОДНОРАЗОВОГО ДОСТУПА
const isOneTimeUser = localStorage.getItem('isOneTimeUser') === 'true';
const hasCompletedTest = localStorage.getItem('completedTest') === 'true';

// Если это одноразовый пользователь и он уже проходил тест - НЕ ПУСКАЕМ!
if (isOneTimeUser && hasCompletedTest) {
    alert('❌ Одноразовый доступ уже использован!');
    window.location.href = 'index.html';
}

// Проверка авторизации
if (!localStorage.getItem('currentUser')) {
    window.location.href = 'index.html';
}

// Элементы
const elements = {
    startUser: document.getElementById("startUser"),
    startBtn: document.getElementById("startBtn"),
    startScreen: document.getElementById("startScreen"),
    quizContent: document.getElementById("quizContent"),
    resultScreen: document.getElementById("resultScreen"),
    quizCard: document.getElementById("quizCard"),
    nextBtn: document.getElementById("nextBtn"),
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
    answersList: document.getElementById("answersList") // Новый элемент
};

// Данные пользователя
const role = localStorage.getItem("role") || "guest";
const username = localStorage.getItem("currentUser") || "Гость";

// Вопросы
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

// Переменные теста
let currentQuestion = 0;
let score = 0;
let userAnswers = new Array(questions.length).fill(null);

// Для хранения истории ответов (для показа в конце)
let answersHistory = [];

// Устанавливаем информацию о пользователе
if (elements.startUser) {
    elements.startUser.textContent = `Привет, ${username}! 👋`;
}

if (elements.userRole) {
    elements.userRole.textContent = role === 'admin' ? '👑 Админ' : '👤 Пользователь';
}

if (elements.userName) {
    elements.userName.textContent = username;
}

// Показываем админ-панель
if (role === 'admin' && elements.adminPanel) {
    elements.adminPanel.classList.remove('hidden');
    loadQuestionsList();
}

// Тема
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

// Язык
if (elements.language) {
    if (localStorage.getItem("lang")) {
        elements.language.value = localStorage.getItem("lang");
    }
}

// Старт теста
if (elements.startBtn) {
    elements.startBtn.addEventListener("click", startTest);
}

function startTest() {
    elements.startScreen.classList.add("hidden");
    elements.quizContent.classList.remove("hidden");
    elements.resultScreen.classList.add("hidden");

    currentQuestion = 0;
    score = 0;
    userAnswers = new Array(questions.length).fill(null);
    answersHistory = [];

    showQuestion();
}

// Показ вопроса
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

        if (userAnswers[currentQuestion] !== null) {
            if (i === question.correct) {
                answerClass += " correct";
            }
            if (i === userAnswers[currentQuestion] && i !== question.correct) {
                answerClass += " wrong";
            }
        }

        html += `<div class="${answerClass}" data-index="${i}">${question.answers[i]}</div>`;
    }

    html += `</div>`;

    elements.quizCard.innerHTML = html;

    // Обработчики ответов
    document.querySelectorAll(".answer").forEach(answer => {
        answer.addEventListener("click", function () {
            selectAnswer(parseInt(this.dataset.index));
        });
    });

    // Прогресс
    if (elements.progress) {
        const progressPercent = ((currentQuestion + 1) / questions.length) * 100;
        elements.progress.style.width = progressPercent + "%";
    }
}

// Выбор ответа
function selectAnswer(index) {
    if (userAnswers[currentQuestion] !== null) return;

    userAnswers[currentQuestion] = index;

    // Сохраняем в историю
    answersHistory[currentQuestion] = {
        question: questions[currentQuestion].question,
        userAnswer: index,
        correctAnswer: questions[currentQuestion].correct,
        answers: questions[currentQuestion].answers,
        isCorrect: index === questions[currentQuestion].correct
    };

    if (index === questions[currentQuestion].correct) {
        score++;
    }

    const answers = document.querySelectorAll(".answer");
    answers.forEach((answer, i) => {
        if (i === questions[currentQuestion].correct) {
            answer.classList.add("correct");
        }
        if (i === index && i !== questions[currentQuestion].correct) {
            answer.classList.add("wrong");
        }
    });
}

// Кнопка Далее
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

// Завершение теста с показом правильных ответов
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

    // ПОКАЗЫВАЕМ ПРАВИЛЬНЫЕ ОТВЕТЫ
    showAnswersReview();

    // Если это одноразовый пользователь - сохраняем флаг
    if (isOneTimeUser) {
        localStorage.setItem('completedTest', 'true');
    }
}

// Функция для показа разбора ответов
function showAnswersReview() {
    if (!elements.answersList) return;

    let html = '';

    questions.forEach((question, index) => {
        const userAnswer = userAnswers[index];
        const isCorrect = userAnswer === question.correct;
        const userAnswerText = userAnswer !== null ? question.answers[userAnswer] : 'Не выбран';
        const correctAnswerText = question.answers[question.correct];

        let statusClass = isCorrect ? 'correct-answer' : 'wrong-answer';
        let statusText = isCorrect ? '✅ Правильно' : '❌ Неправильно';

        html += `
            <div class="review-item ${statusClass}">
                <div class="review-question">${index + 1}. ${question.question}</div>
                <div class="review-answers">
        `;

        // Показываем все варианты ответов
        question.answers.forEach((answer, i) => {
            let answerClass = 'review-answer';

            if (i === question.correct && i === userAnswer) {
                answerClass += ' both-correct'; // Пользователь выбрал правильный
            } else if (i === question.correct) {
                answerClass += ' correct-answer'; // Это правильный ответ
            } else if (i === userAnswer) {
                answerClass += ' user-selected'; // Пользователь выбрал этот (неправильный)
            }

            html += `<span class="${answerClass}">${answer}</span>`;
        });

        html += `
                </div>
                <div class="review-status ${isCorrect ? 'status-correct' : 'status-wrong'}">
                    ${statusText} • Ваш ответ: ${userAnswerText} • Правильный: ${correctAnswerText}
                </div>
            </div>
        `;
    });

    elements.answersList.innerHTML = html;
}

// Загрузка вопросов для админа
function loadQuestionsList() {
    if (!elements.questionsList) return;

    let html = '';

    questions.forEach((q, index) => {
        html += `
            <div class="question-edit" data-index="${index}">
                <input type="text" class="q-text" value="${q.question}" placeholder="Вопрос">
                <input type="text" class="a1" value="${q.answers[0]}" placeholder="Ответ 1">
                <input type="text" class="a2" value="${q.answers[1]}" placeholder="Ответ 2">
                <input type="text" class="a3" value="${q.answers[2]}" placeholder="Ответ 3">
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

// Добавление вопроса
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

// Сохранение вопросов
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

// Удаление вопроса
window.deleteQuestion = function (index) {
    questions.splice(index, 1);
    loadQuestionsList();
};

// Выход
window.logout = function () {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('role');
    localStorage.removeItem('loginTime');
    localStorage.removeItem('isOneTimeUser');
    localStorage.removeItem('completedTest');
    window.location.href = 'index.html';
};

window.goToStart = function () {
    elements.resultScreen.classList.add("hidden");
    elements.startScreen.classList.remove("hidden");
};

window.restartTest = startTest;

if (elements.logoutBtn) {
    elements.logoutBtn.addEventListener("click", logout);
}

// Защита от перезагрузки для одноразовых
window.addEventListener('beforeunload', function (e) {
    if (isOneTimeUser && !elements.resultScreen.classList.contains('hidden')) {
        if (!localStorage.getItem('completedTest')) {
            e.preventDefault();
            e.returnValue = '';
        }
    }
});