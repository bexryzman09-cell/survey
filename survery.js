// // Защита от просмотра кода
// document.addEventListener('contextmenu', event => event.preventDefault());
// document.addEventListener('keydown', function (e) {
//     if (e.key === 'F12' ||
//         (e.ctrlKey && e.shiftKey && e.key === 'I') ||
//         (e.ctrlKey && e.shiftKey && e.key === 'J') ||
//         (e.ctrlKey && e.key === 'r') ||
//         (e.ctrlKey && e.key === 'R') ||
//         (e.key === 'F5') ||
//         (e.ctrlKey && e.key === 'F5') ||
//         (e.ctrlKey && e.shiftKey && e.key === 'r')) {
//         e.preventDefault();
//         return false;
//     }
// });

// // Проверка авторизации
// if (!localStorage.getItem('currentUser')) {
//     window.location.href = 'index.html';
// }

// // ==== ПОЛУЧАЕМ ДАННЫЕ ====
// const role = localStorage.getItem("role") || "user";
// const username = localStorage.getItem("currentUser") || "Гость";
// const isOneTimeUser = localStorage.getItem('isOneTimeUser') === 'true';
// const userTestKey = `test_completed_${username}`;
// const testCompleted = localStorage.getItem(userTestKey);

// // ==== ЭЛЕМЕНТЫ ====
// const elements = {
//     startUser: document.getElementById("startUser"),
//     startDescription: document.getElementById("startDescription"),
//     startBtn: document.getElementById("startBtn"),
//     startScreen: document.getElementById("startScreen"),
//     quizContent: document.getElementById("quizContent"),
//     resultScreen: document.getElementById("resultScreen"),
//     quizCard: document.getElementById("quizCard"),
//     nextBtn: document.getElementById("nextBtn"),
//     backBtn: document.getElementById("backBtn"),
//     progress: document.getElementById("progress"),
//     finalScore: document.getElementById("finalScore"),
//     themeToggle: document.getElementById("themeToggle"),
//     language: document.getElementById("language"),
//     logoutBtn: document.getElementById("logoutBtn"),
//     userRole: document.getElementById("userRole"),
//     userName: document.getElementById("userName"),
//     questionCounter: document.getElementById("questionCounter"),
//     adminPanel: document.getElementById("adminPanel"),
//     questionsList: document.getElementById("questionsList"),
//     addQuestionBtn: document.getElementById("addQuestionBtn"),
//     saveQuestionsBtn: document.getElementById("saveQuestionsBtn"),
//     correctCount: document.getElementById("correctCount"),
//     percentValue: document.getElementById("percentValue"),
//     answersList: document.getElementById("answersList")
// };

// // ==== ПЕРЕВОДЫ ====
// const translations = {
//     ru: {
//         hello: 'Привет',
//         guest: 'Гость',
//         admin: '👑 Админ',
//         user: '👤 Пользователь',
//         startDescription: 'Проверьте свои знания по Frontend разработке',
//         startTest: 'Начать тест',
//         question: 'Вопрос',
//         next: 'Следующий ➔',
//         yourResult: 'ваш результат',
//         correctAnswers: 'Правильных ответов:',
//         percentage: 'Процент:',
//         answersReview: '📋 Разбор ответов:',
//         correct: '✓ Правильно',
//         wrong: '❌ Неправильно',
//         notSelected: 'Не выбран',
//         yourAnswer: 'Ваш ответ:',
//         correctAnswer: 'Правильный:',
//         restart: '🔄 Пройти снова',
//         logout: 'Выйти',
//         selectAnswer: 'Пожалуйста, выберите ответ!',
//         alreadyPassed: 'Вы уже прошли этот тест.',

//         // Уровни
//         level1: '🔰 Junior (Начинающий)',
//         level1_desc: 'Вы только начинаете путь во Frontend. Продолжайте учиться!',
//         level2: '🌱 Junior+',
//         level2_desc: 'У вас есть базовые знания HTML/CSS/JS.',
//         level3: '🌿 Middle',
//         level3_desc: 'Хороший уровень! Вы понимаете современный Frontend.',
//         level4: '🌳 Senior',
//         level4_desc: 'Отличный результат! Вы эксперт во Frontend.',
//         level5: '🏆 Expert',
//         level5_desc: 'Превосходно! Вы настоящий Frontend гуру!',

//         // Вопросы 1-15 (Frontend)
//         q1: 'Что такое React?',
//         q2: 'Что такое Virtual DOM?',
//         q3: 'Что такое useState в React?',
//         q4: 'Что такое useEffect?',
//         q5: 'Что такое props в React?',
//         q6: 'Что такое JSX?',
//         q7: 'Что такое Flexbox в CSS?',
//         q8: 'Что такое Grid в CSS?',
//         q9: 'Что такое localStorage?',
//         q10: 'Что такое Promise в JavaScript?',
//         q11: 'Что такое async/await?',
//         q12: 'Что такое Closure в JavaScript?',
//         q13: 'Что такое npm?',
//         q14: 'Что такое Webpack?',
//         q15: 'Что такое REST API?',

//         // Ответы (правильные на разных позициях)
//         a1_1: 'Библиотека для UI',
//         a1_2: 'Язык программирования',
//         a1_3: 'База данных',

//         a2_1: 'База данных',
//         a2_2: 'Виртуальное представление DOM',
//         a2_3: 'Язык запросов',

//         a3_1: 'Хук для состояния',
//         a3_2: 'Хук для эффектов',
//         a3_3: 'Хук для контекста',

//         a4_1: 'Хук для эффектов',
//         a4_2: 'Хук для состояния',
//         a4_3: 'Хук для рефа',

//         a5_1: 'Свойства компонента',
//         a5_2: 'Состояние компонента',
//         a5_3: 'Метод компонента',

//         a6_1: 'CSS фреймворк',
//         a6_2: 'Расширение синтаксиса JS',
//         a6_3: 'База данных',

//         a7_1: 'Система сеток в CSS',
//         a7_2: 'Язык программирования',
//         a7_3: 'База данных',

//         a8_1: 'База данных',
//         a8_2: 'Двумерная сетка в CSS',
//         a8_3: 'Фреймворк',

//         a9_1: 'Хранилище в браузере',
//         a9_2: 'База данных на сервере',
//         a9_3: 'Кэш браузера',

//         a10_1: 'Объект для асинхронных операций',
//         a10_2: 'Тип данных',
//         a10_3: 'Метод массива',

//         a11_1: 'Синтаксис для промисов',
//         a11_2: 'Тип цикла',
//         a11_3: 'CSS свойство',

//         a12_1: 'Функция с доступом к внешней области',
//         a12_2: 'Закрытая переменная',
//         a12_3: 'Тип данных',

//         a13_1: 'Менеджер пакетов',
//         a13_2: 'Язык программирования',
//         a13_3: 'Фреймворк',

//         a14_1: 'Сборщик модулей',
//         a14_2: 'Тестовый фреймворк',
//         a14_3: 'База данных',

//         a15_1: 'Архитектурный стиль API',
//         a15_2: 'Язык программирования',
//         a15_3: 'База данных'
//     },

//     uz: {
//         hello: 'Salom',
//         guest: 'Mehmon',
//         admin: '👑 Admin',
//         user: '👤 Foydalanuvchi',
//         startDescription: 'Frontend bilimingizni sinab ko\'ring',
//         startTest: 'Testni boshlash',
//         question: 'Savol',
//         next: 'Keyingi ➔',
//         yourResult: 'Sizning natijangiz',
//         correctAnswers: 'To\'g\'ri javoblar:',
//         percentage: 'Foiz:',
//         answersReview: '📋 Javoblar tahlili:',
//         correct: '✓ To\'g\'ri',
//         wrong: '❌ Noto\'g\'ri',
//         notSelected: 'Tanlanmagan',
//         yourAnswer: 'Sizning javobingiz:',
//         correctAnswer: 'To\'g\'ri javob:',
//         restart: '🔄 Qayta topshirish',
//         logout: 'Chiqish',
//         selectAnswer: 'Iltimos, javobni tanlang!',
//         alreadyPassed: 'Siz bu testni allaqachon topshirgansiz.',

//         level1: '🔰 Junior (Boshlang\'ich)',
//         level1_desc: 'Frontend yo\'lida endi boshlayapsiz. O\'rganing!',
//         level2: '🌱 Junior+',
//         level2_desc: 'HTML/CSS/JS asoslarini bilasiz.',
//         level3: '🌿 Middle',
//         level3_desc: 'Yaxshi daraja! Zamonaviy Frontendni tushunasiz.',
//         level4: '🌳 Senior',
//         level4_desc: 'Ajoyib! Frontend ekspertisiz.',
//         level5: '🏆 Expert',
//         level5_desc: 'Zo\'r! Haqiqiy Frontend gurusiz!',

//         q1: 'React nima?',
//         q2: 'Virtual DOM nima?',
//         q3: 'Reactda useState nima?',
//         q4: 'useEffect nima?',
//         q5: 'Reactda props nima?',
//         q6: 'JSX nima?',
//         q7: 'CSSda Flexbox nima?',
//         q8: 'CSSda Grid nima?',
//         q9: 'localStorage nima?',
//         q10: 'JavaScriptda Promise nima?',
//         q11: 'async/await nima?',
//         q12: 'JavaScriptda Closure nima?',
//         q13: 'npm nima?',
//         q14: 'Webpack nima?',
//         q15: 'REST API nima?',

//         a1_1: 'UI kutubxonasi',
//         a1_2: 'Dasturlash tili',
//         a1_3: 'Ma\'lumotlar bazasi',

//         a2_1: 'Ma\'lumotlar bazasi',
//         a2_2: 'DOM virtual ko\'rinishi',
//         a2_3: 'So\'rovlar tili',

//         a3_1: 'Holat uchun huk',
//         a3_2: 'Effektlar uchun huk',
//         a3_3: 'Kontekst uchun huk',

//         a4_1: 'Effektlar uchun huk',
//         a4_2: 'Holat uchun huk',
//         a4_3: 'Ref uchun huk',

//         a5_1: 'Komponent xususiyatlari',
//         a5_2: 'Komponent holati',
//         a5_3: 'Komponent metodi',

//         a6_1: 'CSS freymvork',
//         a6_2: 'JS sintaksis kengaytmasi',
//         a6_3: 'Ma\'lumotlar bazasi',

//         a7_1: 'CSS setka tizimi',
//         a7_2: 'Dasturlash tili',
//         a7_3: 'Ma\'lumotlar bazasi',

//         a8_1: 'Ma\'lumotlar bazasi',
//         a8_2: 'CSS ikki o\'lchovli setka',
//         a8_3: 'Freymvork',

//         a9_1: 'Brauzer xotirasi',
//         a9_2: 'Serverdagi ma\'lumotlar bazasi',
//         a9_3: 'Brauzer keshi',

//         a10_1: 'Asinxron operatsiyalar obyekti',
//         a10_2: 'Ma\'lumot turi',
//         a10_3: 'Massiv metodi',

//         a11_1: 'Promislar sintaksisi',
//         a11_2: 'Sikl turi',
//         a11_3: 'CSS xususiyati',

//         a12_1: 'Tashqi sohaga kirish funksiyasi',
//         a12_2: 'Yopiq o\'zgaruvchi',
//         a12_3: 'Ma\'lumot turi',

//         a13_1: 'Paket menejeri',
//         a13_2: 'Dasturlash tili',
//         a13_3: 'Freymvork',

//         a14_1: 'Modul yig\'uvchi',
//         a14_2: 'Test freymvorki',
//         a14_3: 'Ma\'lumotlar bazasi',

//         a15_1: 'API arxitektura uslubi',
//         a15_2: 'Dasturlash tili',
//         a15_3: 'Ma\'lumotlar bazasi'
//     },

//     en: {
//         hello: 'Hello',
//         guest: 'Guest',
//         admin: '👑 Admin',
//         user: '👤 User',
//         startDescription: 'Test your Frontend knowledge',
//         startTest: 'Start Test',
//         question: 'Question',
//         next: 'Next ➔',
//         yourResult: 'your result',
//         correctAnswers: 'Correct answers:',
//         percentage: 'Percentage:',
//         answersReview: '📋 Answers Review:',
//         correct: '✓ Correct',
//         wrong: '❌ Wrong',
//         notSelected: 'Not selected',
//         yourAnswer: 'Your answer:',
//         correctAnswer: 'Correct:',
//         restart: '🔄 Restart',
//         logout: 'Logout',
//         selectAnswer: 'Please select an answer!',
//         alreadyPassed: 'You have already passed this test.',

//         level1: '🔰 Junior',
//         level1_desc: 'You are starting your Frontend journey. Keep learning!',
//         level2: '🌱 Junior+',
//         level2_desc: 'You know HTML/CSS/JS basics.',
//         level3: '🌿 Middle',
//         level3_desc: 'Good level! You understand modern Frontend.',
//         level4: '🌳 Senior',
//         level4_desc: 'Excellent! You are a Frontend expert.',
//         level5: '🏆 Expert',
//         level5_desc: 'Perfect! You are a true Frontend guru!',

//         q1: 'What is React?',
//         q2: 'What is Virtual DOM?',
//         q3: 'What is useState in React?',
//         q4: 'What is useEffect?',
//         q5: 'What are props in React?',
//         q6: 'What is JSX?',
//         q7: 'What is Flexbox in CSS?',
//         q8: 'What is Grid in CSS?',
//         q9: 'What is localStorage?',
//         q10: 'What is Promise in JavaScript?',
//         q11: 'What is async/await?',
//         q12: 'What is Closure in JavaScript?',
//         q13: 'What is npm?',
//         q14: 'What is Webpack?',
//         q15: 'What is REST API?',

//         a1_1: 'UI Library',
//         a1_2: 'Programming language',
//         a1_3: 'Database',

//         a2_1: 'Database',
//         a2_2: 'Virtual representation of DOM',
//         a2_3: 'Query language',

//         a3_1: 'State hook',
//         a3_2: 'Effect hook',
//         a3_3: 'Context hook',

//         a4_1: 'Effect hook',
//         a4_2: 'State hook',
//         a4_3: 'Ref hook',

//         a5_1: 'Component properties',
//         a5_2: 'Component state',
//         a5_3: 'Component method',

//         a6_1: 'CSS framework',
//         a6_2: 'JS syntax extension',
//         a6_3: 'Database',

//         a7_1: 'CSS layout system',
//         a7_2: 'Programming language',
//         a7_3: 'Database',

//         a8_1: 'Database',
//         a8_2: '2D CSS layout',
//         a8_3: 'Framework',

//         a9_1: 'Browser storage',
//         a9_2: 'Server database',
//         a9_3: 'Browser cache',

//         a10_1: 'Object for async operations',
//         a10_2: 'Data type',
//         a10_3: 'Array method',

//         a11_1: 'Syntax for promises',
//         a11_2: 'Loop type',
//         a11_3: 'CSS property',

//         a12_1: 'Function with outer scope access',
//         a12_2: 'Private variable',
//         a12_3: 'Data type',

//         a13_1: 'Package manager',
//         a13_2: 'Programming language',
//         a13_3: 'Framework',

//         a14_1: 'Module bundler',
//         a14_2: 'Test framework',
//         a14_3: 'Database',

//         a15_1: 'API architectural style',
//         a15_2: 'Programming language',
//         a15_3: 'Database'
//     }
// };

// // ==== 15 ВОПРОСОВ ПО FRONTEND С РАНДОМНЫМИ ПРАВИЛЬНЫМИ ОТВЕТАМИ ====
// const baseQuestions = [
//     { questionKey: 'q1', answers: ['a1_1', 'a1_2', 'a1_3'], correct: 0 },
//     { questionKey: 'q2', answers: ['a2_1', 'a2_2', 'a2_3'], correct: 1 },
//     { questionKey: 'q3', answers: ['a3_1', 'a3_2', 'a3_3'], correct: 0 },
//     { questionKey: 'q4', answers: ['a4_1', 'a4_2', 'a4_3'], correct: 0 },
//     { questionKey: 'q5', answers: ['a5_1', 'a5_2', 'a5_3'], correct: 0 },
//     { questionKey: 'q6', answers: ['a6_1', 'a6_2', 'a6_3'], correct: 1 },
//     { questionKey: 'q7', answers: ['a7_1', 'a7_2', 'a7_3'], correct: 0 },
//     { questionKey: 'q8', answers: ['a8_1', 'a8_2', 'a8_3'], correct: 1 },
//     { questionKey: 'q9', answers: ['a9_1', 'a9_2', 'a9_3'], correct: 0 },
//     { questionKey: 'q10', answers: ['a10_1', 'a10_2', 'a10_3'], correct: 0 },
//     { questionKey: 'q11', answers: ['a11_1', 'a11_2', 'a11_3'], correct: 0 },
//     { questionKey: 'q12', answers: ['a12_1', 'a12_2', 'a12_3'], correct: 0 },
//     { questionKey: 'q13', answers: ['a13_1', 'a13_2', 'a13_3'], correct: 0 },
//     { questionKey: 'q14', answers: ['a14_1', 'a14_2', 'a14_3'], correct: 0 },
//     { questionKey: 'q15', answers: ['a15_1', 'a15_2', 'a15_3'], correct: 0 }
// ];

// // Перемешиваем вопросы
// let questions = [...baseQuestions].sort(() => Math.random() - 0.5);

// // ==== ТЕКУЩИЙ ЯЗЫК ====
// let currentLang = localStorage.getItem('lang') || 'ru';

// // ==== ФУНКЦИЯ ПЕРЕВОДА ====
// function t(key) {
//     return translations[currentLang]?.[key] || translations['ru'][key] || key;
// }

// // ==== ПЕРЕМЕННЫЕ ТЕСТА ====
// let currentQuestion = 0;
// let score = 0;
// let userAnswers = new Array(questions.length).fill(null);

// // ==== УСТАНАВЛИВАЕМ ИНФОРМАЦИЮ ====
// function updateUILanguage() {
//     if (elements.startUser) {
//         elements.startUser.textContent = `${t('hello')}, ${username}!`;
//     }

//     if (elements.startDescription) {
//         elements.startDescription.textContent = t('startDescription');
//     }

//     if (elements.startBtn) {
//         elements.startBtn.textContent = t('startTest');
//     }

//     if (elements.nextBtn) {
//         elements.nextBtn.textContent = t('next');
//     }

//     if (elements.userRole) {
//         elements.userRole.textContent = role === 'admin' ? t('admin') : t('user');
//     }

//     if (elements.userName) {
//         elements.userName.textContent = username;
//     }

//     // Обновляем текущий вопрос если тест активен
//     if (!elements.quizContent.classList.contains('hidden')) {
//         showQuestion();
//     }

//     // Обновляем результаты если показаны
//     if (!elements.resultScreen.classList.contains('hidden')) {
//         finishQuiz();
//     }
// }

// // ==== ПРОВЕРКА ДОСТУПА ====
// function checkTestAccess() {
//     // Для одноразовых пользователей всегда разрешаем
//     if (isOneTimeUser) {
//         return true;
//     }

//     if (testCompleted && role !== 'admin') {
//         if (elements.startScreen) {
//             elements.startScreen.innerHTML = `
//                 <h2>${username}</h2>
//                 <p>${t('alreadyPassed')}</p>
//                 <button onclick="logout()" class="btn-glow">${t('logout')}</button>
//             `;
//         }
//         if (elements.startBtn) {
//             elements.startBtn.style.display = 'none';
//         }
//         return false;
//     }
//     return true;
// }

// // ==== ТЕМА ====
// if (elements.themeToggle) {
//     if (localStorage.getItem("theme") === "light") {
//         document.body.classList.add("light");
//         elements.themeToggle.textContent = "☀";
//     }

//     elements.themeToggle.addEventListener("click", () => {
//         document.body.classList.toggle("light");
//         const mode = document.body.classList.contains("light") ? "light" : "dark";
//         localStorage.setItem("theme", mode);
//         elements.themeToggle.textContent = mode === "light" ? "☀" : "🌙";
//     });
// }

// // ==== ЯЗЫК ====
// if (elements.language) {
//     elements.language.value = currentLang;

//     elements.language.addEventListener("change", function (e) {
//         currentLang = e.target.value;
//         localStorage.setItem('lang', currentLang);
//         updateUILanguage();
//     });
// }

// // ==== СТАРТ ТЕСТА ====
// if (elements.startBtn) {
//     // Всегда показываем кнопку для одноразовых пользователей
//     if (!checkTestAccess() && !isOneTimeUser) {
//         elements.startBtn.style.display = 'none';
//     } else {
//         elements.startBtn.addEventListener("click", startTest);
//     }
// }

// function startTest() {
//     elements.startScreen.classList.add("hidden");
//     elements.quizContent.classList.remove("hidden");
//     elements.resultScreen.classList.add("hidden");

//     currentQuestion = 0;
//     score = 0;
//     userAnswers = new Array(questions.length).fill(null);

//     showQuestion();
// }

// // ==== ПОКАЗ ВОПРОСА ====
// function showQuestion() {
//     if (!elements.quizCard) return;

//     const question = questions[currentQuestion];
//     const questionText = t(question.questionKey);
//     const answers = question.answers.map(key => t(key));

//     if (elements.questionCounter) {
//         elements.questionCounter.textContent = `${t('question')} ${currentQuestion + 1}/${questions.length}`;
//     }

//     let html = `
//         <div class="answers-container">
//             <h3 class="question-title">${currentQuestion + 1}. ${questionText}</h3>
//     `;

//     for (let i = 0; i < answers.length; i++) {
//         let answerClass = "answer";

//         if (userAnswers[currentQuestion] === i) {
//             answerClass += " selected";
//         }

//         html += `<div class="${answerClass}" data-index="${i}">${answers[i]}</div>`;
//     }

//     html += `</div>`;

//     elements.quizCard.innerHTML = html;

//     document.querySelectorAll(".answer").forEach(answer => {
//         answer.addEventListener("click", function () {
//             selectAnswer(parseInt(this.dataset.index));
//         });
//     });

//     if (elements.progress) {
//         const progressPercent = ((currentQuestion + 1) / questions.length) * 100;
//         elements.progress.style.width = progressPercent + "%";
//     }
// }

// // ==== ВЫБОР ОТВЕТА ====
// function selectAnswer(index) {
//     if (userAnswers[currentQuestion] !== null) return;

//     userAnswers[currentQuestion] = index;

//     const answers = document.querySelectorAll(".answer");
//     answers.forEach(answer => {
//         answer.classList.remove("selected");
//     });

//     answers[index].classList.add("selected");

//     if (index === questions[currentQuestion].correct) {
//         score++;
//     }
// }

// // ==== КНОПКА ДАЛЕЕ ====
// if (elements.nextBtn) {
//     elements.nextBtn.addEventListener("click", () => {
//         if (userAnswers[currentQuestion] === null) {
//             alert(t('selectAnswer'));
//             return;
//         }

//         currentQuestion++;

//         if (currentQuestion < questions.length) {
//             showQuestion();
//         } else {
//             finishQuiz();
//         }
//     });
// }

// // ==== ФУНКЦИЯ УРОВНЯ ====
// function getProgrammerLevel(percent) {
//     if (percent < 20) {
//         return {
//             title: t('level1'),
//             desc: t('level1_desc'),
//             icon: '🔰',
//             color: '#4CAF50'
//         };
//     } else if (percent < 40) {
//         return {
//             title: t('level2'),
//             desc: t('level2_desc'),
//             icon: '🌱',
//             color: '#8BC34A'
//         };
//     } else if (percent < 60) {
//         return {
//             title: t('level3'),
//             desc: t('level3_desc'),
//             icon: '🌿',
//             color: '#FFC107'
//         };
//     } else if (percent < 80) {
//         return {
//             title: t('level4'),
//             desc: t('level4_desc'),
//             icon: '🌳',
//             color: '#FF9800'
//         };
//     } else {
//         return {
//             title: t('level5'),
//             desc: t('level5_desc'),
//             icon: '🏆',
//             color: '#F44336'
//         };
//     }
// }

// // ==== ЗАВЕРШЕНИЕ ТЕСТА ====
// function finishQuiz() {
//     elements.quizContent.classList.add("hidden");
//     elements.resultScreen.classList.remove("hidden");

//     const percent = Math.round((score / questions.length) * 100);
//     const level = getProgrammerLevel(percent);

//     if (elements.finalScore) {
//         elements.finalScore.textContent = `${username}, ${t('yourResult')}: ${score}/${questions.length}`;
//     }

//     if (elements.correctCount) {
//         elements.correctCount.textContent = `${score}/${questions.length}`;
//     }

//     if (elements.percentValue) {
//         elements.percentValue.textContent = percent + '%';
//     }

//     // Показываем уровень
//     const resultCard = document.querySelector('.result .card');
//     if (resultCard) {
//         const oldLevel = document.getElementById('programmerLevelBlock');
//         if (oldLevel) oldLevel.remove();

//         const levelBlock = document.createElement('div');
//         levelBlock.id = 'programmerLevelBlock';
//         levelBlock.className = 'programmer-level';
//         levelBlock.innerHTML = `
//             <div style="font-size: 4rem; margin-bottom: 10px;">${level.icon}</div>
//             <h3 style="color: ${level.color};">${level.title}</h3>
//             <p>${level.desc}</p>
//         `;

//         const stats = document.querySelector('.result-stats');
//         if (stats) {
//             stats.insertAdjacentElement('afterend', levelBlock);
//         }
//     }

//     showAnswersReview();

//     // Отмечаем, что пользователь прошел тест (кроме одноразовых)
//     if (!isOneTimeUser && role !== 'admin') {
//         localStorage.setItem(userTestKey, 'completed');
//     }
// }

// // ==== ПОКАЗ ОТВЕТОВ ====
// function showAnswersReview() {
//     if (!elements.answersList) return;

//     let html = '';

//     questions.forEach((q, index) => {
//         const questionText = t(q.questionKey);
//         const answers = q.answers.map(key => t(key));
//         const userAnswer = userAnswers[index];
//         const isCorrect = userAnswer === q.correct;
//         const correctAnswerText = answers[q.correct];
//         const userAnswerText = userAnswer !== null ? answers[userAnswer] : t('notSelected');

//         html += `
//             <div class="review-item ${isCorrect ? 'correct-answer' : 'wrong-answer'}">
//                 <div class="review-question">${index + 1}. ${questionText}</div>
//                 <div class="review-answers">
//                     <span class="review-answer correct-answer">✓ ${t('correctAnswer')} ${correctAnswerText}</span>
//                     <span class="review-answer ${userAnswer !== null ? (isCorrect ? 'both-correct' : 'user-selected') : ''}">
//                         ${userAnswer !== null ? t('yourAnswer') + ' ' + userAnswerText : '❌ ' + t('notSelected')}
//                     </span>
//                 </div>
//                 <div class="review-status ${isCorrect ? 'status-correct' : 'status-wrong'}">
//                     ${isCorrect ? '✅ ' + t('correct') : '❌ ' + t('wrong')}
//                 </div>
//             </div>
//         `;
//     });

//     elements.answersList.innerHTML = html;
// }

// // ==== ВЫХОД ====
// window.logout = function () {
//     localStorage.removeItem('currentUser');
//     localStorage.removeItem('role');
//     localStorage.removeItem('loginTime');
//     localStorage.removeItem('isOneTimeUser');
//     window.location.href = 'index.html';
// };

// window.restartTest = function () {
//     startTest();
// };

// if (elements.logoutBtn) {
//     elements.logoutBtn.addEventListener("click", logout);
// }

// // Добавляем CSS
// const style = document.createElement('style');
// style.textContent = `
//     .answer.selected {
//         background: linear-gradient(135deg, var(--accent), var(--accent-secondary));
//         color: white;
//         border-color: var(--accent);
//         transform: scale(1.02);
//         box-shadow: var(--neon-shadow);
//     }

//     .programmer-level {
//         text-align: center;
//         margin: 20px 0;
//         padding: 20px;
//         background: var(--glass-bg);
//         border-radius: 15px;
//         animation: slideIn 0.5s ease;
//     }

//     @keyframes slideIn {
//         from {
//             opacity: 0;
//             transform: translateY(20px);
//         }
//         to {
//             opacity: 1;
//             transform: translateY(0);
//         }
//     }
// `;
// document.head.appendChild(style);

// // Инициализация
// updateUILanguage();
// checkTestAccess();

// // Защита от просмотра кода
// document.addEventListener('contextmenu', event => event.preventDefault());
// document.addEventListener('keydown', function (e) {
//     if (e.key === 'F12' ||
//         (e.ctrlKey && e.shiftKey && e.key === 'I') ||
//         (e.ctrlKey && e.shiftKey && e.key === 'J') ||
//         (e.ctrlKey && e.key === 'r') ||
//         (e.ctrlKey && e.key === 'R') ||
//         (e.key === 'F5') ||
//         (e.ctrlKey && e.key === 'F5') ||
//         (e.ctrlKey && e.shiftKey && e.key === 'r')) {
//         e.preventDefault();
//         return false;
//     }
// });

// // Проверка авторизации
// if (!localStorage.getItem('currentUser')) {
//     window.location.href = 'index.html';
// }

// // ==== ПОЛУЧАЕМ ДАННЫЕ ====
// const role = localStorage.getItem("role") || "user";
// const username = localStorage.getItem("currentUser") || "Гость";
// const isOneTimeUser = localStorage.getItem('isOneTimeUser') === 'true';
// const userTestKey = `test_completed_${username}`;
// const testCompleted = localStorage.getItem(userTestKey);

// // ==== ЭЛЕМЕНТЫ ====
// const elements = {
//     startUser: document.getElementById("startUser"),
//     startDescription: document.getElementById("startDescription"),
//     startBtn: document.getElementById("startBtn"),
//     startScreen: document.getElementById("startScreen"),
//     quizContent: document.getElementById("quizContent"),
//     resultScreen: document.getElementById("resultScreen"),
//     quizCard: document.getElementById("quizCard"),
//     nextBtn: document.getElementById("nextBtn"),
//     backBtn: document.getElementById("backBtn"),
//     progress: document.getElementById("progress"),
//     finalScore: document.getElementById("finalScore"),
//     themeToggle: document.getElementById("themeToggle"),
//     language: document.getElementById("language"),
//     logoutBtn: document.getElementById("logoutBtn"),
//     userRole: document.getElementById("userRole"),
//     userName: document.getElementById("userName"),
//     questionCounter: document.getElementById("questionCounter"),
//     adminPanel: document.getElementById("adminPanel"),
//     questionsList: document.getElementById("questionsList"),
//     addQuestionBtn: document.getElementById("addQuestionBtn"),
//     saveQuestionsBtn: document.getElementById("saveQuestionsBtn"),
//     correctCount: document.getElementById("correctCount"),
//     percentValue: document.getElementById("percentValue"),
//     answersList: document.getElementById("answersList")
// };

// // ==== ПЕРЕВОДЫ - РУССКИЙ ====
// const ru = {
//     hello: 'Кандидат',
//     guest: 'Кандидат',
//     admin: '👑 Tech Lead',
//     user: '👤 Кандидат',
//     startDescription: 'Техническое собеседование уровня Senior/Lead (Google/Meta/Amazon)',
//     startTest: 'Начать интервью',
//     question: 'Вопрос',
//     next: 'Следующий ➔',
//     yourResult: 'Ваш результат',
//     correctAnswers: 'Правильных ответов:',
//     percentage: 'Процент:',
//     answersReview: '📋 Детальный разбор:',
//     correct: '✓ Верно',
//     wrong: '❌ Неверно',
//     notSelected: 'Не выбран',
//     yourAnswer: 'Ваш ответ:',
//     correctAnswer: 'Эталонный ответ:',
//     restart: '🔄 Пройти заново',
//     logout: 'Выйти',
//     selectAnswer: 'Пожалуйста, выберите ответ!',
//     alreadyPassed: 'Вы уже проходили это интервью.',

//     level1: '❌ Не прошел (T1 - Intern)',
//     level1_desc: 'Нужно усилить фундаментальные знания. Готовьтесь к алгоритмам и system design.',
//     level2: '⚠️ T2 - Junior',
//     level2_desc: 'Базовый уровень, но для Google нужно глубже. Фокус на алгоритмы.',
//     level3: '📊 T3 - Mid-Level',
//     level3_desc: 'Хороший уровень. Рассматривайте позиции в стартапах.',
//     level4: '🌟 T4 - Senior',
//     level4_desc: 'Отличный результат! Соответствуете уровню Senior в топ компаниях.',
//     level5: '🏆 T5/T6 - Staff/Lead',
//     level5_desc: 'ЭКСТРАОРДИНАРНО! Вы готовы к позиции Staff Engineer в Google/Facebook!',

//     q1: 'Объясните внутреннее устройство Event Loop в браузере. Как связаны микротаски и макротаски?',
//     q2: 'Как V8 оптимизирует JavaScript? Объясните Hidden Classes и Inline Caching.',
//     q3: 'Реализуйте глубокое сравнение объектов с учетом циклических ссылок.',
//     q4: 'Объясните модель безопасности Same-Origin Policy и CORS.',
//     q5: 'Как устроен Virtual DOM в React? Как происходит reconciliation?',
//     q6: 'Объясните работу паттерна Publisher-Subscriber в контексте браузера.',
//     q7: 'Как работает сборка мусора в JavaScript?',
//     q8: 'Реализуйте debounce и throttle с поддержкой leading и trailing опций.',
//     q9: 'Как работают Service Workers? Опишите lifecycle.',
//     q10: 'Что такое CSS Houdini? Как создать custom paint worklet?',
//     q11: 'Объясните протокол HTTP/2 и HTTP/3.',
//     q12: 'Как оптимизировать Critical Rendering Path?',
//     q13: 'Реализуйте Promise.all с ограничением на количество одновременных запросов.',
//     q14: 'Как работает WebAssembly?',
//     q15: 'Что такое JIT компиляция?',
//     q16: 'Как устроена система типов TypeScript? Что такое conditional types?',
//     q17: 'Реализуйте мемоизацию функции с LRU кэшем.',
//     q18: 'Как работают Web Workers? Чем отличаются от Service Workers?',
//     q19: 'Объясните алгоритмы рендеринга в браузере.',
//     q20: 'Как реализовать виртуальный скролл для 1,000,000 элементов?',

//     a1_1: 'Event Loop: микротаски (Promise) выполняются перед макротасками (setTimeout)',
//     a1_2: 'Event Loop: макротаски важнее микротасок',
//     a1_3: 'Event Loop: все таски в очереди без приоритетов',

//     a2_1: 'V8 использует Hidden Classes и Inline Caching',
//     a2_2: 'V8 просто интерпретирует код',
//     a2_3: 'V8 компилирует весь код заранее',

//     a3_1: 'Использовать WeakMap для циклических ссылок',
//     a3_2: 'JSON.stringify все обработает',
//     a3_3: '=== достаточно',

//     a4_1: 'Preflight OPTIONS для non-simple запросов',
//     a4_2: 'CORS можно отключить',
//     a4_3: 'CORS не важен',

//     a5_1: 'React Fiber для инкрементального рендеринга',
//     a5_2: 'React заменяет весь DOM',
//     a5_3: 'Virtual DOM медленнее',

//     a6_1: 'EventBus с Map событий и копированием массива',
//     a6_2: 'EventBus это глобальный объект',
//     a6_3: 'EventBus не нужен',

//     a7_1: 'Поколенческая сборка: Minor и Major GC',
//     a7_2: 'JS сам управляет памятью',
//     a7_3: 'GC раз в минуту',

//     a8_1: 'Debounce до паузы, throttle ограничивает частоту',
//     a8_2: 'Debounce и throttle одно и то же',
//     a8_3: 'Только для resize',

//     a9_1: 'Lifecycle: Download -> Install -> Activate',
//     a9_2: 'Service Workers это кэш',
//     a9_3: 'Работают в основном потоке',

//     a10_1: 'CSS Houdini расширяет CSS через JS',
//     a10_2: 'Houdini это CSS фреймворк',
//     a10_3: 'Houdini не поддерживается',

//     a11_1: 'HTTP/2 мультиплексирует, HTTP/3 на QUIC',
//     a11_2: 'HTTP/2 быстрее из-за сжатия',
//     a11_3: 'HTTP/3 не отличается',

//     a12_1: 'Inline критический CSS, defer скриптов',
//     a12_2: 'Просто минифицировать CSS',
//     a12_3: 'Критический путь не важен',

//     a13_1: 'Пул промисов с лимитом и Promise.race',
//     a13_2: 'Promise.all сам ограничивает',
//     a13_3: 'Нельзя ограничить промисы',

//     a14_1: 'Wasm для CPU-интенсивных задач',
//     a14_2: 'Wasm всегда быстрее JS',
//     a14_3: 'Wasm заменяет JS',

//     a15_1: 'JIT компилирует горячий код',
//     a15_2: 'JIT компилирует один раз',
//     a15_3: 'Интерпретатор лучше',

//     a16_1: 'Conditional Types (T extends U ? X : Y)',
//     a16_2: 'TypeScript только для IDE',
//     a16_3: 'Нет сложных типов',

//     a17_1: 'LRU кэш с Map и списком O(1)',
//     a17_2: 'Мемоизация через объект',
//     a17_3: 'Нельзя ограничить кэш',

//     a18_1: 'Web Workers для CPU, Service Workers для сети',
//     a18_2: 'Web и Service Workers одно и то же',
//     a18_3: 'Оба имеют доступ к DOM',

//     a19_1: 'Layout -> Paint -> Composite',
//     a19_2: 'Браузер просто рисует',
//     a19_3: 'Composite не важен',

//     a20_1: 'Virtual scroll + Intersection Observer',
//     a20_2: 'Рендерить все элементы',
//     a20_3: 'Нельзя отрисовать миллион'
// };

// // ==== ПЕРЕВОДЫ - УЗБЕКСКИЙ ====
// const uz = {
//     hello: 'Nomzod',
//     guest: 'Mehmon',
//     admin: '👑 Tech Lead',
//     user: '👤 Nomzod',
//     startDescription: 'Senior/Lead darajadagi texnik intervyu (Google/Meta/Amazon)',
//     startTest: 'Intervyuni boshlash',
//     question: 'Savol',
//     next: 'Keyingi ➔',
//     yourResult: 'Sizning natijangiz',
//     correctAnswers: "To'g'ri javoblar:",
//     percentage: 'Foiz:',
//     answersReview: '📋 Batafsil tahlil:',
//     correct: '✓ To\'g\'ri',
//     wrong: '❌ Noto\'g\'ri',
//     notSelected: 'Tanlanmagan',
//     yourAnswer: 'Sizning javobingiz:',
//     correctAnswer: "To'g'ri javob:",
//     restart: '🔄 Qayta topshirish',
//     logout: 'Chiqish',
//     selectAnswer: 'Iltimos, javobni tanlang!',
//     alreadyPassed: 'Siz bu intervyuni allaqachon topshirgansiz.',

//     level1: '❌ T1 - Intern',
//     level1_desc: 'Asosiy bilimlarni kuchaytirish kerak.',
//     level2: '⚠️ T2 - Junior',
//     level2_desc: 'Asosiy daraja, lekin chuqurroq kerak.',
//     level3: '📊 T3 - Mid-Level',
//     level3_desc: 'Yaxshi natija.',
//     level4: '🌟 T4 - Senior',
//     level4_desc: 'Ajoyib! Senior darajasiga mos.',
//     level5: '🏆 T5/T6 - Staff/Lead',
//     level5_desc: "FAVQULODDA! Staff Engineer darajasiga tayyor!",

//     q1: 'Event Loop qanday ishlaydi? Mikrotask va makrotask farqi?',
//     q2: 'V8 JavaScript qanday optimizatsiya qiladi?',
//     q3: 'Objectlarni chuqur solishtirish funksiyasini yozing.',
//     q4: 'Same-Origin Policy va CORS qanday ishlaydi?',
//     q5: 'Virtual DOM qanday ishlaydi?',
//     q6: 'Publisher-Subscriber patternini tushuntiring.',
//     q7: 'JavaScript garbage collection qanday ishlaydi?',
//     q8: 'Debounce va throttle implementatsiyasini yozing.',
//     q9: 'Service Workers qanday ishlaydi?',
//     q10: 'CSS Houdini nima?',
//     q11: 'HTTP/2 va HTTP/3 protokollarini solishtiring.',
//     q12: 'Critical Rendering Path qanday optimizatsiya qilinadi?',
//     q13: 'Promise.all ni concurrency limit bilan implement qiling.',
//     q14: 'WebAssembly qachon samarali?',
//     q15: 'JIT kompilyatsiya nima?',
//     q16: 'TypeScript conditional types nima?',
//     q17: 'Memoization funksiyasini LRU cache bilan yozing.',
//     q18: 'Web Workers va Service Workers farqi?',
//     q19: 'Brauzer rendering algoritmini tushuntiring.',
//     q20: '1,000,000 element uchun virtual scroll qanday implement qilinadi?',

//     a1_1: 'Event Loop: mikrotasklar makrotasklardan oldin',
//     a1_2: 'Makrotasklar muhimroq',
//     a1_3: 'Hammasi bir xil',

//     a2_1: 'V8 Hidden Classes va Inline Caching ishlatadi',
//     a2_2: 'Optimizatsiya yo\'q',
//     a2_3: 'Faqat kompilyatsiya',

//     a3_1: 'WeakMap ishlatish kerak',
//     a3_2: 'JSON.stringify yetarli',
//     a3_3: '=== operatori',

//     a4_1: 'Preflight OPTIONS murakkab so\'rovlar uchun',
//     a4_2: 'CORS ni o\'chirish mumkin',
//     a4_3: 'CORS muhim emas',

//     a5_1: 'React Fiber incremental render',
//     a5_2: 'Hamma DOMni almashtiradi',
//     a5_3: 'Virtual DOM sekin',

//     a6_1: 'EventBus Map va array nusxasi',
//     a6_2: 'Global obyekt',
//     a6_3: 'Kerak emas',

//     a7_1: 'Generational GC',
//     a7_2: 'JS o\'zi boshqaradi',
//     a7_3: 'Minutda bir marta',

//     a8_1: 'Debounce pauzagacha, throttle cheklaydi',
//     a8_2: 'Bir xil',
//     a8_3: 'Faqat resize',

//     a9_1: 'Download -> Install -> Activate',
//     a9_2: 'Faqat kesh',
//     a9_3: 'Asosiy threadda',

//     a20_1: 'Virtual scroll + Intersection Observer',
//     a20_2: 'Hamma elementlarni render',
//     a20_3: 'Million render bo\'lmaydi'
// };

// // ==== ПЕРЕВОДЫ - АНГЛИЙСКИЙ ====
// const en = {
//     hello: 'Candidate',
//     guest: 'Guest',
//     admin: '👑 Tech Lead',
//     user: '👤 Candidate',
//     startDescription: 'Senior/Lead Level Technical Interview (Google/Meta/Amazon)',
//     startTest: 'Start Interview',
//     question: 'Question',
//     next: 'Next ➔',
//     yourResult: 'Your result',
//     correctAnswers: 'Correct answers:',
//     percentage: 'Percentage:',
//     answersReview: '📋 Detailed Analysis:',
//     correct: '✓ Correct',
//     wrong: '❌ Wrong',
//     notSelected: 'Not selected',
//     yourAnswer: 'Your answer:',
//     correctAnswer: 'Correct answer:',
//     restart: '🔄 Retake',
//     logout: 'Logout',
//     selectAnswer: 'Please select an answer!',
//     alreadyPassed: 'You have already passed this interview.',

//     level1: '❌ T1 - Intern',
//     level1_desc: 'Need to strengthen fundamentals.',
//     level2: '⚠️ T2 - Junior',
//     level2_desc: 'Basic level, need deeper knowledge.',
//     level3: '📊 T3 - Mid-Level',
//     level3_desc: 'Good result.',
//     level4: '🌟 T4 - Senior',
//     level4_desc: 'Excellent! Senior level.',
//     level5: '🏆 T5/T6 - Staff/Lead',
//     level5_desc: 'EXTRAORDINARY! Ready for Staff Engineer!',

//     q1: 'Explain Event Loop internals. How microtasks and macrotasks work?',
//     q2: 'How V8 optimizes JavaScript? Explain Hidden Classes and Inline Caching.',
//     q3: 'Implement deep object comparison with circular references.',
//     q4: 'Explain Same-Origin Policy and CORS.',
//     q5: 'How Virtual DOM works? How reconciliation happens?',
//     q6: 'Explain Publisher-Subscriber pattern in browser.',
//     q7: 'How garbage collection works in JS?',
//     q8: 'Implement debounce and throttle with leading/trailing options.',
//     q9: 'How Service Workers work? Describe lifecycle.',
//     q10: 'What is CSS Houdini? How to create custom paint worklet?',
//     q11: 'Explain HTTP/2 vs HTTP/3 protocols.',
//     q12: 'How to optimize Critical Rendering Path?',
//     q13: 'Implement Promise.all with concurrency limit.',
//     q14: 'How WebAssembly works?',
//     q15: 'What is JIT compilation?',
//     q16: 'Explain TypeScript conditional types.',
//     q17: 'Implement memoization with LRU cache.',
//     q18: 'How Web Workers work? Difference from Service Workers?',
//     q19: 'Explain browser rendering algorithm.',
//     q20: 'How to implement virtual scroll for 1,000,000 items?',

//     a1_1: 'Event Loop: microtasks before macrotasks',
//     a1_2: 'Macrotasks are more important',
//     a1_3: 'All tasks in queue order',

//     a2_1: 'V8 uses Hidden Classes and Inline Caching',
//     a2_2: 'V8 just interprets code',
//     a2_3: 'V8 pre-compiles everything',

//     a3_1: 'Use WeakMap for circular references',
//     a3_2: 'JSON.stringify handles everything',
//     a3_3: '=== is enough',

//     a4_1: 'Preflight OPTIONS for non-simple requests',
//     a4_2: 'CORS can be disabled',
//     a4_3: 'CORS not important',

//     a5_1: 'React Fiber for incremental rendering',
//     a5_2: 'React replaces entire DOM',
//     a5_3: 'Virtual DOM is slower',

//     a6_1: 'EventBus with Map and array copying',
//     a6_2: 'Global object',
//     a6_3: 'Not needed',

//     a7_1: 'Generational GC: Minor and Major',
//     a7_2: 'JS manages memory itself',
//     a7_3: 'GC once per minute',

//     a8_1: 'Debounce until pause, throttle limits frequency',
//     a8_2: 'Debounce and throttle same',
//     a8_3: 'Only for resize',

//     a9_1: 'Download -> Install -> Activate',
//     a9_2: 'Just cache',
//     a9_3: 'Run in main thread',

//     a20_1: 'Virtual scroll + Intersection Observer',
//     a20_2: 'Render all items',
//     a20_3: 'Cannot render million'
// };

// // Объект с переводами
// const translations = { ru, uz, en };

// // ==== 20 СЛОЖНЫХ ВОПРОСОВ С РАНДОМНЫМИ ПРАВИЛЬНЫМИ ОТВЕТАМИ ====
// function createQuestions() {
//     return [
//         { questionKey: 'q1', answers: ['a1_1', 'a1_2', 'a1_3'], correct: Math.floor(Math.random() * 3) },
//         { questionKey: 'q2', answers: ['a2_1', 'a2_2', 'a2_3'], correct: Math.floor(Math.random() * 3) },
//         { questionKey: 'q3', answers: ['a3_1', 'a3_2', 'a3_3'], correct: Math.floor(Math.random() * 3) },
//         { questionKey: 'q4', answers: ['a4_1', 'a4_2', 'a4_3'], correct: Math.floor(Math.random() * 3) },
//         { questionKey: 'q5', answers: ['a5_1', 'a5_2', 'a5_3'], correct: Math.floor(Math.random() * 3) },
//         { questionKey: 'q6', answers: ['a6_1', 'a6_2', 'a6_3'], correct: Math.floor(Math.random() * 3) },
//         { questionKey: 'q7', answers: ['a7_1', 'a7_2', 'a7_3'], correct: Math.floor(Math.random() * 3) },
//         { questionKey: 'q8', answers: ['a8_1', 'a8_2', 'a8_3'], correct: Math.floor(Math.random() * 3) },
//         { questionKey: 'q9', answers: ['a9_1', 'a9_2', 'a9_3'], correct: Math.floor(Math.random() * 3) },
//         { questionKey: 'q10', answers: ['a10_1', 'a10_2', 'a10_3'], correct: Math.floor(Math.random() * 3) },
//         { questionKey: 'q11', answers: ['a11_1', 'a11_2', 'a11_3'], correct: Math.floor(Math.random() * 3) },
//         { questionKey: 'q12', answers: ['a12_1', 'a12_2', 'a12_3'], correct: Math.floor(Math.random() * 3) },
//         { questionKey: 'q13', answers: ['a13_1', 'a13_2', 'a13_3'], correct: Math.floor(Math.random() * 3) },
//         { questionKey: 'q14', answers: ['a14_1', 'a14_2', 'a14_3'], correct: Math.floor(Math.random() * 3) },
//         { questionKey: 'q15', answers: ['a15_1', 'a15_2', 'a15_3'], correct: Math.floor(Math.random() * 3) },
//         { questionKey: 'q16', answers: ['a16_1', 'a16_2', 'a16_3'], correct: Math.floor(Math.random() * 3) },
//         { questionKey: 'q17', answers: ['a17_1', 'a17_2', 'a17_3'], correct: Math.floor(Math.random() * 3) },
//         { questionKey: 'q18', answers: ['a18_1', 'a18_2', 'a18_3'], correct: Math.floor(Math.random() * 3) },
//         { questionKey: 'q19', answers: ['a19_1', 'a19_2', 'a19_3'], correct: Math.floor(Math.random() * 3) },
//         { questionKey: 'q20', answers: ['a20_1', 'a20_2', 'a20_3'], correct: Math.floor(Math.random() * 3) }
//     ];
// }

// // Создаем вопросы
// let questions = createQuestions();

// // Перемешиваем порядок вопросов
// function shuffleArray(array) {
//     for (let i = array.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [array[i], array[j]] = [array[j], array[i]];
//     }
//     return array;
// }

// questions = shuffleArray(questions);

// // ==== ТЕКУЩИЙ ЯЗЫК ====
// let currentLang = localStorage.getItem('lang') || 'ru';

// // ==== ФУНКЦИЯ ПЕРЕВОДА ====
// function t(key) {
//     if (!key) return '';

//     // Прямой доступ к переводам
//     if (currentLang === 'ru') return ru[key] || key;
//     if (currentLang === 'uz') return uz[key] || ru[key] || key;
//     if (currentLang === 'en') return en[key] || ru[key] || key;

//     return ru[key] || key;
// }

// // ==== ПЕРЕМЕННЫЕ ТЕСТА ====
// let currentQuestion = 0;
// let score = 0;
// let userAnswers = new Array(questions.length).fill(null);

// // ==== УСТАНАВЛИВАЕМ ИНФОРМАЦИЮ ====
// function updateUILanguage() {
//     if (elements.startUser) {
//         elements.startUser.textContent = `${t('hello')}, ${username}!`;
//     }

//     if (elements.startDescription) {
//         elements.startDescription.textContent = t('startDescription');
//     }

//     if (elements.startBtn) {
//         elements.startBtn.textContent = t('startTest');
//     }

//     if (elements.nextBtn) {
//         elements.nextBtn.textContent = t('next');
//     }

//     if (elements.userRole) {
//         elements.userRole.textContent = role === 'admin' ? t('admin') : t('user');
//     }

//     if (elements.userName) {
//         elements.userName.textContent = username;
//     }

//     // Обновляем текущий вопрос
//     if (!elements.quizContent.classList.contains('hidden')) {
//         showQuestion();
//     }

//     // Обновляем результаты
//     if (!elements.resultScreen.classList.contains('hidden')) {
//         finishQuiz();
//     }

//     // Обновляем админ панель
//     if (!elements.adminPanel.classList.contains('hidden')) {
//         loadQuestionsList();
//     }
// }

// // ==== ПРОВЕРКА ДОСТУПА ====
// function checkTestAccess() {
//     if (isOneTimeUser) {
//         return true;
//     }

//     if (testCompleted && role !== 'admin') {
//         if (elements.startScreen) {
//             elements.startScreen.innerHTML = `
//                 <h2>${username}</h2>
//                 <p>${t('alreadyPassed')}</p>
//                 <button onclick="logout()" class="btn-glow">${t('logout')}</button>
//             `;
//         }
//         if (elements.startBtn) {
//             elements.startBtn.style.display = 'none';
//         }
//         return false;
//     }
//     return true;
// }

// // ==== ТЕМА ====
// if (elements.themeToggle) {
//     if (localStorage.getItem("theme") === "light") {
//         document.body.classList.add("light");
//         elements.themeToggle.textContent = "☀";
//     }

//     elements.themeToggle.addEventListener("click", () => {
//         document.body.classList.toggle("light");
//         const mode = document.body.classList.contains("light") ? "light" : "dark";
//         localStorage.setItem("theme", mode);
//         elements.themeToggle.textContent = mode === "light" ? "☀" : "🌙";
//     });
// }

// // ==== ЯЗЫК - ГЛАВНЫЙ ФИКС ====
// if (elements.language) {
//     // Устанавливаем значение из localStorage
//     elements.language.value = currentLang;

//     // Обработчик изменения языка
//     elements.language.addEventListener("change", function (e) {
//         currentLang = e.target.value;
//         localStorage.setItem('lang', currentLang);

//         // Обновляем весь интерфейс
//         updateUILanguage();

//         // Принудительно обновляем вопрос
//         if (!elements.quizContent.classList.contains('hidden')) {
//             showQuestion();
//         }
//     });
// }

// // ==== СТАРТ ТЕСТА ====
// if (elements.startBtn) {
//     if (!checkTestAccess() && !isOneTimeUser) {
//         elements.startBtn.style.display = 'none';
//     } else {
//         elements.startBtn.addEventListener("click", startTest);
//     }
// }

// function startTest() {
//     elements.startScreen.classList.add("hidden");
//     elements.quizContent.classList.remove("hidden");
//     elements.resultScreen.classList.add("hidden");

//     currentQuestion = 0;
//     score = 0;
//     userAnswers = new Array(questions.length).fill(null);

//     showQuestion();
// }

// // ==== ПОКАЗ ВОПРОСА ====
// function showQuestion() {
//     if (!elements.quizCard) return;

//     const question = questions[currentQuestion];
//     const questionText = t(question.questionKey);
//     const answers = question.answers.map(key => t(key));

//     if (elements.questionCounter) {
//         elements.questionCounter.textContent = `${t('question')} ${currentQuestion + 1}/${questions.length}`;
//     }

//     let html = `
//         <div class="answers-container">
//             <h3 class="question-title">${currentQuestion + 1}. ${questionText}</h3>
//     `;

//     for (let i = 0; i < answers.length; i++) {
//         let answerClass = "answer";

//         if (userAnswers[currentQuestion] === i) {
//             answerClass += " selected";
//         }

//         html += `<div class="${answerClass}" data-index="${i}">${answers[i]}</div>`;
//     }

//     html += `</div>`;

//     elements.quizCard.innerHTML = html;

//     document.querySelectorAll(".answer").forEach(answer => {
//         answer.addEventListener("click", function () {
//             selectAnswer(parseInt(this.dataset.index));
//         });
//     });

//     if (elements.progress) {
//         const progressPercent = ((currentQuestion + 1) / questions.length) * 100;
//         elements.progress.style.width = progressPercent + "%";
//     }
// }

// // ==== ВЫБОР ОТВЕТА ====
// function selectAnswer(index) {
//     if (userAnswers[currentQuestion] !== null) return;

//     userAnswers[currentQuestion] = index;

//     const answers = document.querySelectorAll(".answer");
//     answers.forEach(answer => {
//         answer.classList.remove("selected");
//     });

//     answers[index].classList.add("selected");

//     if (index === questions[currentQuestion].correct) {
//         score++;
//     }
// }

// // ==== КНОПКА ДАЛЕЕ ====
// if (elements.nextBtn) {
//     elements.nextBtn.addEventListener("click", () => {
//         if (userAnswers[currentQuestion] === null) {
//             alert(t('selectAnswer'));
//             return;
//         }

//         currentQuestion++;

//         if (currentQuestion < questions.length) {
//             showQuestion();
//         } else {
//             finishQuiz();
//         }
//     });
// }

// // ==== ФУНКЦИЯ УРОВНЯ ====
// function getProgrammerLevel(percent) {
//     if (percent < 20) {
//         return { title: t('level1'), desc: t('level1_desc'), icon: '❌', color: '#ff4d6d' };
//     } else if (percent < 40) {
//         return { title: t('level2'), desc: t('level2_desc'), icon: '⚠️', color: '#ffaa00' };
//     } else if (percent < 60) {
//         return { title: t('level3'), desc: t('level3_desc'), icon: '📊', color: '#4CAF50' };
//     } else if (percent < 80) {
//         return { title: t('level4'), desc: t('level4_desc'), icon: '🌟', color: '#2196F3' };
//     } else {
//         return { title: t('level5'), desc: t('level5_desc'), icon: '🏆', color: '#9c27b0' };
//     }
// }

// // ==== ЗАВЕРШЕНИЕ ТЕСТА ====
// function finishQuiz() {
//     elements.quizContent.classList.add("hidden");
//     elements.resultScreen.classList.remove("hidden");

//     const percent = Math.round((score / questions.length) * 100);
//     const level = getProgrammerLevel(percent);

//     if (elements.finalScore) {
//         elements.finalScore.textContent = `${username}, ${t('yourResult')}: ${score}/${questions.length}`;
//     }

//     if (elements.correctCount) {
//         elements.correctCount.textContent = `${score}/${questions.length}`;
//     }

//     if (elements.percentValue) {
//         elements.percentValue.textContent = percent + '%';
//     }

//     // Показываем уровень
//     const resultCard = document.querySelector('.result .card');
//     if (resultCard) {
//         const oldLevel = document.getElementById('programmerLevelBlock');
//         if (oldLevel) oldLevel.remove();

//         const levelBlock = document.createElement('div');
//         levelBlock.id = 'programmerLevelBlock';
//         levelBlock.className = 'programmer-level';
//         levelBlock.innerHTML = `
//             <div style="font-size: 4rem; margin-bottom: 10px;">${level.icon}</div>
//             <h3 style="color: ${level.color};">${level.title}</h3>
//             <p>${level.desc}</p>
//         `;

//         const stats = document.querySelector('.result-stats');
//         if (stats) {
//             stats.insertAdjacentElement('afterend', levelBlock);
//         }
//     }

//     showAnswersReview();

//     if (!isOneTimeUser && role !== 'admin') {
//         localStorage.setItem(userTestKey, 'completed');
//     }
// }

// // ==== ПОКАЗ ОТВЕТОВ ====
// function showAnswersReview() {
//     if (!elements.answersList) return;

//     let html = '';

//     questions.forEach((q, index) => {
//         const questionText = t(q.questionKey);
//         const answers = q.answers.map(key => t(key));
//         const userAnswer = userAnswers[index];
//         const isCorrect = userAnswer === q.correct;
//         const correctAnswerText = answers[q.correct];
//         const userAnswerText = userAnswer !== null ? answers[userAnswer] : t('notSelected');

//         html += `
//             <div class="review-item ${isCorrect ? 'correct-answer' : 'wrong-answer'}">
//                 <div class="review-question">${index + 1}. ${questionText}</div>
//                 <div class="review-answers">
//                     <span class="review-answer correct-answer">✓ ${t('correctAnswer')} ${correctAnswerText}</span>
//                     <span class="review-answer ${userAnswer !== null ? (isCorrect ? 'both-correct' : 'user-selected') : ''}">
//                         ${userAnswer !== null ? t('yourAnswer') + ' ' + userAnswerText : '❌ ' + t('notSelected')}
//                     </span>
//                 </div>
//                 <div class="review-status ${isCorrect ? 'status-correct' : 'status-wrong'}">
//                     ${isCorrect ? '✅ ' + t('correct') : '❌ ' + t('wrong')}
//                 </div>
//             </div>
//         `;
//     });

//     elements.answersList.innerHTML = html;
// }

// // ==== ЗАГРУЗКА ВОПРОСОВ ДЛЯ АДМИНА ====
// function loadQuestionsList() {
//     if (!elements.questionsList) return;

//     let html = '';

//     questions.forEach((q, index) => {
//         const questionText = t(q.questionKey);
//         const answers = q.answers.map(key => t(key));

//         html += `
//             <div class="question-edit" data-index="${index}">
//                 <input type="text" class="q-text" value="${q.questionKey}" placeholder="Question key">
//                 <input type="text" class="a1" value="${q.answers[0]}" placeholder="Answer 1 key">
//                 <input type="text" class="a2" value="${q.answers[1]}" placeholder="Answer 2 key">
//                 <input type="text" class="a3" value="${q.answers[2]}" placeholder="Answer 3 key">
//                 <select class="correct-select">
//                     <option value="0" ${q.correct === 0 ? 'selected' : ''}>${t('correctAnswer')} 1</option>
//                     <option value="1" ${q.correct === 1 ? 'selected' : ''}>${t('correctAnswer')} 2</option>
//                     <option value="2" ${q.correct === 2 ? 'selected' : ''}>${t('correctAnswer')} 3</option>
//                 </select>
//                 <button class="delete-btn" onclick="deleteQuestion(${index})">${t('delete') || 'Удалить'}</button>
//             </div>
//         `;
//     });

//     elements.questionsList.innerHTML = html;
// }

// // ==== АДМИН ПАНЕЛЬ ====
// if (role === 'admin' && elements.adminPanel) {
//     elements.adminPanel.classList.remove('hidden');
//     loadQuestionsList();
// }

// // ==== ДОБАВЛЕНИЕ ВОПРОСА ====
// if (elements.addQuestionBtn) {
//     elements.addQuestionBtn.addEventListener("click", () => {
//         questions.push({
//             questionKey: "q_new",
//             answers: ["a_new_1", "a_new_2", "a_new_3"],
//             correct: 0
//         });
//         loadQuestionsList();
//     });
// }

// // ==== СОХРАНЕНИЕ ВОПРОСОВ ====
// if (elements.saveQuestionsBtn) {
//     elements.saveQuestionsBtn.addEventListener("click", () => {
//         localStorage.setItem('surveyQuestions', JSON.stringify(questions));
//         alert(t('saved') || '✅ Сохранено!');
//     });
// }

// // ==== УДАЛЕНИЕ ВОПРОСА ====
// window.deleteQuestion = function (index) {
//     if (confirm(t('confirmDelete') || 'Удалить вопрос?')) {
//         questions.splice(index, 1);
//         loadQuestionsList();
//     }
// };

// // ==== ВЫХОД ====
// window.logout = function () {
//     localStorage.removeItem('currentUser');
//     localStorage.removeItem('role');
//     localStorage.removeItem('loginTime');
//     localStorage.removeItem('isOneTimeUser');
//     window.location.href = 'index.html';
// };

// window.restartTest = function () {
//     startTest();
// };

// if (elements.logoutBtn) {
//     elements.logoutBtn.addEventListener("click", logout);
// }

// // Добавляем CSS
// const style = document.createElement('style');
// style.textContent = `
//     .answer.selected {
//         background: linear-gradient(135deg, var(--accent), var(--accent-secondary));
//         color: white;
//         border-color: var(--accent);
//         transform: scale(1.02);
//         box-shadow: var(--neon-shadow);
//     }
    
//     .programmer-level {
//         text-align: center;
//         margin: 20px 0;
//         padding: 20px;
//         background: var(--glass-bg);
//         border-radius: 15px;
//         animation: slideIn 0.5s ease;
//     }
    
//     @keyframes slideIn {
//         from {
//             opacity: 0;
//             transform: translateY(20px);
//         }
//         to {
//             opacity: 1;
//             transform: translateY(0);
//         }
//     }
// `;
// document.head.appendChild(style);

// // Инициализация
// updateUILanguage();
// checkTestAccess();


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

// Проверка авторизации
if (!localStorage.getItem('currentUser')) {
    window.location.href = 'index.html';
}

// ==== ПОЛУЧАЕМ ДАННЫЕ ====
const role = localStorage.getItem("role") || "user";
const username = localStorage.getItem("currentUser") || "Гость";
const isOneTimeUser = localStorage.getItem('isOneTimeUser') === 'true';
const userTestKey = `test_completed_${username}`;
const testCompleted = localStorage.getItem(userTestKey);

// ==== ЭЛЕМЕНТЫ ====
const elements = {
    startUser: document.getElementById("startUser"),
    startDescription: document.getElementById("startDescription"),
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

// ==== ПЕРЕВОДЫ - РУССКИЙ (ДЛЯ НАЧИНАЮЩИХ) ====
const ru = {
    hello: 'Привет',
    guest: 'Ученик',
    admin: '👑 Учитель',
    user: '👤 Ученик',
    startDescription: 'Проверьте свои знания по основам программирования',
    startTest: 'Начать тест',
    question: 'Вопрос',
    next: 'Следующий ➔',
    yourResult: 'Твой результат',
    correctAnswers: 'Правильных ответов:',
    percentage: 'Процент:',
    answersReview: '📋 Разбор ответов:',
    correct: '✓ Правильно',
    wrong: '❌ Неправильно',
    notSelected: 'Не выбран',
    yourAnswer: 'Твой ответ:',
    correctAnswer: 'Правильный ответ:',
    restart: '🔄 Пройти заново',
    logout: 'Выйти',
    selectAnswer: 'Пожалуйста, выбери ответ!',
    alreadyPassed: 'Ты уже проходил этот тест.',
    
    // Уровни для начинающих
    level1: '🌱 Новичок',
    level1_desc: 'Ты только начинаешь путь в программировании. Продолжай учиться!',
    level2: '📚 Начинающий',
    level2_desc: 'У тебя есть базовые знания. Учи дальше!',
    level3: '⭐ Любитель',
    level3_desc: 'Хороший результат! Ты много знаешь.',
    level4: '🌟 Продвинутый',
    level4_desc: 'Отлично! Ты готов к сложным темам.',
    level5: '🏆 Профи',
    level5_desc: 'Превосходно! Ты настоящий программист!',
    
    // Простые вопросы для начинающих
    q1: 'Что такое HTML?',
    q2: 'Что такое CSS?',
    q3: 'Что такое JavaScript?',
    q4: 'Какой тег для заголовка в HTML?',
    q5: 'Какой тег для абзаца в HTML?',
    q6: 'Как подключить CSS к HTML?',
    q7: 'Как объявить переменную в JavaScript?',
    q8: 'Что такое функция в программировании?',
    q9: 'Какой тип данных "Привет мир"?',
    q10: 'Что такое массив?',
    q11: 'Какой оператор для сложения?',
    q12: 'Что такое цикл for?',
    q13: 'Что такое if/else?',
    q14: 'Как вывести сообщение в консоль?',
    q15: 'Что такое DOM?',
    q16: 'Какой тег для картинки?',
    q17: 'Что такое класс в CSS?',
    q18: 'Какой атрибут для ссылки?',
    q19: 'Что такое комментарий в коде?',
    q20: 'Какой тег для списка?',
    
    // Простые ответы
    a1_1: 'Язык для создания веб-страниц',
    a1_2: 'Язык для стилей',
    a1_3: 'Язык для логики',
    
    a2_1: 'Язык для стилей',
    a2_2: 'Язык для разметки',
    a2_3: 'Язык для баз данных',
    
    a3_1: 'Язык для программирования на сайте',
    a3_2: 'Язык для стилей',
    a3_3: 'Язык для верстки',
    
    a4_1: '<h1>',
    a4_2: '<p>',
    a4_3: '<div>',
    
    a5_1: '<p>',
    a5_2: '<h1>',
    a5_3: '<span>',
    
    a6_1: '<link>',
    a6_2: '<script>',
    a6_3: '<style>',
    
    a7_1: 'let имя = значение;',
    a7_2: 'var имя: значение',
    a7_3: 'int имя = значение',
    
    a8_1: 'Блок кода для выполнения задачи',
    a8_2: 'Переменная',
    a8_3: 'Цикл',
    
    a9_1: 'Строка',
    a9_2: 'Число',
    a9_3: 'Массив',
    
    a10_1: 'Список элементов',
    a10_2: 'Одно значение',
    a10_3: 'Функция',
    
    a11_1: '+',
    a11_2: '-',
    a11_3: '*',
    
    a12_1: 'Повторяет код несколько раз',
    a12_2: 'Проверяет условие',
    a12_3: 'Объявляет функцию',
    
    a13_1: 'Проверяет условие',
    a13_2: 'Повторяет код',
    a13_3: 'Создает переменную',
    
    a14_1: 'console.log()',
    a14_2: 'alert()',
    a14_3: 'print()',
    
    a15_1: 'Документ и элементы на странице',
    a15_2: 'База данных',
    a15_3: 'Сервер',
    
    a16_1: '<img>',
    a16_2: '<image>',
    a16_3: '<pic>',
    
    a17_1: 'Имя для стилей',
    a17_2: 'Тег',
    a17_3: 'Атрибут',
    
    a18_1: 'href',
    a18_2: 'src',
    a18_3: 'link',
    
    a19_1: 'Текст для пояснения кода',
    a19_2: 'Ошибка в коде',
    a19_3: 'Название переменной',
    
    a20_1: '<ul> или <ol>',
    a20_2: '<list>',
    a20_3: '<li>'
};

// ==== ПЕРЕВОДЫ - УЗБЕКСКИЙ (ДЛЯ НАЧИНАЮЩИХ) ====
const uz = {
    hello: 'Salom',
    guest: 'O\'quvchi',
    admin: '👑 O\'qituvchi',
    user: '👤 O\'quvchi',
    startDescription: 'Dasturlash asoslarini bilimingizni sinab ko\'ring',
    startTest: 'Testni boshlash',
    question: 'Savol',
    next: 'Keyingi ➔',
    yourResult: 'Sizning natijangiz',
    correctAnswers: "To'g'ri javoblar:",
    percentage: 'Foiz:',
    answersReview: '📋 Javoblar tahlili:',
    correct: '✓ To\'g\'ri',
    wrong: '❌ Noto\'g\'ri',
    notSelected: 'Tanlanmagan',
    yourAnswer: 'Sizning javobingiz:',
    correctAnswer: "To'g'ri javob:",
    restart: '🔄 Qayta topshirish',
    logout: 'Chiqish',
    selectAnswer: 'Iltimos, javobni tanlang!',
    alreadyPassed: 'Siz bu testni allaqachon topshirgansiz.',
    
    level1: '🌱 Yangi boshlovchi',
    level1_desc: 'Siz dasturlash yo\'lida endi boshlayapsiz. O\'rganishda davom eting!',
    level2: '📚 Boshlovchi',
    level2_desc: 'Asosiy bilimlar bor. Davom eting!',
    level3: '⭐ Havaskor',
    level3_desc: 'Yaxshi natija! Ko\'p narsani bilasiz.',
    level4: '🌟 Ilg\'or',
    level4_desc: 'Ajoyib! Murakkab mavzularga tayyor.',
    level5: '🏆 Professional',
    level5_desc: "Zo'r! Haqiqiy dasturchi!",
    
    q1: 'HTML nima?',
    q2: 'CSS nima?',
    q3: 'JavaScript nima?',
    q4: 'HTMLda sarlavha uchun qaysi teg?',
    q5: 'HTMLda paragraf uchun qaysi teg?',
    q6: 'CSSni HTMLga qanday ulash mumkin?',
    q7: 'JavaScriptda o\'zgaruvchi qanday e\'lon qilinadi?',
    q8: 'Funksiya nima?',
    q9: '"Salom dunyo" qanday ma\'lumot turi?',
    q10: 'Array nima?',
    q11: 'Qo\'shish uchun qaysi operator?',
    q12: 'for loop nima?',
    q13: 'if/else nima?',
    q14: 'Konsolga xabar qanday chiqariladi?',
    q15: 'DOM nima?',
    q16: 'Rasm uchun qaysi teg?',
    q17: 'CSSda class nima?',
    q18: 'Havola uchun qaysi atribut?',
    q19: 'Kodda komment nima?',
    q20: 'Ro\'yxat uchun qaysi teg?',
    
    a1_1: 'Veb-sahifa yaratish tili',
    a1_2: 'Stillar tili',
    a1_3: 'Mantiq tili',
    
    a2_1: 'Stillar tili',
    a2_2: 'Belgilash tili',
    a2_3: "Ma'lumotlar bazasi tili",
    
    a3_1: 'Veb-sayt uchun dasturlash tili',
    a3_2: 'Stillar tili',
    a3_3: 'Belgilash tili',
    
    a4_1: '<h1>',
    a4_2: '<p>',
    a4_3: '<div>',
    
    a5_1: '<p>',
    a5_2: '<h1>',
    a5_3: '<span>',
    
    a6_1: '<link>',
    a6_2: '<script>',
    a6_3: '<style>',
    
    a7_1: 'let nom = qiymat;',
    a7_2: 'var nom: qiymat',
    a7_3: 'int nom = qiymat',
    
    a8_1: 'Vazifa bajaruvchi kod bloki',
    a8_2: "O'zgaruvchi",
    a8_3: 'Sikl',
    
    a9_1: 'Matn',
    a9_2: 'Raqam',
    a9_3: "Massiv",
    
    a10_1: 'Elementlar ro\'yxati',
    a10_2: 'Bitta qiymat',
    a10_3: 'Funksiya',
    
    a11_1: '+',
    a11_2: '-',
    a11_3: '*',
    
    a12_1: 'Kodni bir necha marta takrorlaydi',
    a12_2: 'Shartni tekshiradi',
    a12_3: 'Funksiya e\'lon qiladi',
    
    a13_1: 'Shartni tekshiradi',
    a13_2: 'Kodni takrorlaydi',
    a13_3: "O'zgaruvchi yaratadi",
    
    a14_1: 'console.log()',
    a14_2: 'alert()',
    a14_3: 'print()',
    
    a15_1: 'Hujjat va sahifa elementlari',
    a15_2: "Ma'lumotlar bazasi",
    a15_3: 'Server',
    
    a16_1: '<img>',
    a16_2: '<image>',
    a16_3: '<pic>',
    
    a17_1: 'Stillar uchun nom',
    a17_2: 'Teg',
    a17_3: 'Atribut',
    
    a18_1: 'href',
    a18_2: 'src',
    a18_3: 'link',
    
    a19_1: 'Kodni tushuntiruvchi matn',
    a19_2: 'Xatolik',
    a19_3: "O'zgaruvchi nomi",
    
    a20_1: '<ul> yoki <ol>',
    a20_2: '<list>',
    a20_3: '<li>'
};

// ==== ПЕРЕВОДЫ - АНГЛИЙСКИЙ (ДЛЯ НАЧИНАЮЩИХ) ====
const en = {
    hello: 'Hello',
    guest: 'Student',
    admin: '👑 Teacher',
    user: '👤 Student',
    startDescription: 'Test your programming basics knowledge',
    startTest: 'Start Test',
    question: 'Question',
    next: 'Next ➔',
    yourResult: 'Your result',
    correctAnswers: 'Correct answers:',
    percentage: 'Percentage:',
    answersReview: '📋 Answers Review:',
    correct: '✓ Correct',
    wrong: '❌ Wrong',
    notSelected: 'Not selected',
    yourAnswer: 'Your answer:',
    correctAnswer: 'Correct answer:',
    restart: '🔄 Restart',
    logout: 'Logout',
    selectAnswer: 'Please select an answer!',
    alreadyPassed: 'You have already passed this test.',
    
    level1: '🌱 Beginner',
    level1_desc: 'You are just starting your programming journey. Keep learning!',
    level2: '📚 Novice',
    level2_desc: 'You have basic knowledge. Keep going!',
    level3: '⭐ Intermediate',
    level3_desc: 'Good result! You know a lot.',
    level4: '🌟 Advanced',
    level4_desc: 'Excellent! Ready for complex topics.',
    level5: '🏆 Pro',
    level5_desc: 'Perfect! You are a real programmer!',
    
    q1: 'What is HTML?',
    q2: 'What is CSS?',
    q3: 'What is JavaScript?',
    q4: 'Which tag for heading in HTML?',
    q5: 'Which tag for paragraph in HTML?',
    q6: 'How to connect CSS to HTML?',
    q7: 'How to declare a variable in JavaScript?',
    q8: 'What is a function in programming?',
    q9: 'What data type is "Hello world"?',
    q10: 'What is an array?',
    q11: 'Which operator for addition?',
    q12: 'What is a for loop?',
    q13: 'What is if/else?',
    q14: 'How to print message to console?',
    q15: 'What is DOM?',
    q16: 'Which tag for image?',
    q17: 'What is a class in CSS?',
    q18: 'Which attribute for link?',
    q19: 'What is a comment in code?',
    q20: 'Which tag for list?',
    
    a1_1: 'Language for creating web pages',
    a1_2: 'Language for styles',
    a1_3: 'Language for logic',
    
    a2_1: 'Language for styles',
    a2_2: 'Language for markup',
    a2_3: 'Language for databases',
    
    a3_1: 'Language for website programming',
    a3_2: 'Language for styles',
    a3_3: 'Language for markup',
    
    a4_1: '<h1>',
    a4_2: '<p>',
    a4_3: '<div>',
    
    a5_1: '<p>',
    a5_2: '<h1>',
    a5_3: '<span>',
    
    a6_1: '<link>',
    a6_2: '<script>',
    a6_3: '<style>',
    
    a7_1: 'let name = value;',
    a7_2: 'var name: value',
    a7_3: 'int name = value',
    
    a8_1: 'Block of code for a task',
    a8_2: 'Variable',
    a8_3: 'Loop',
    
    a9_1: 'String',
    a9_2: 'Number',
    a9_3: 'Array',
    
    a10_1: 'List of items',
    a10_2: 'Single value',
    a10_3: 'Function',
    
    a11_1: '+',
    a11_2: '-',
    a11_3: '*',
    
    a12_1: 'Repeats code multiple times',
    a12_2: 'Checks condition',
    a12_3: 'Declares function',
    
    a13_1: 'Checks condition',
    a13_2: 'Repeats code',
    a13_3: 'Creates variable',
    
    a14_1: 'console.log()',
    a14_2: 'alert()',
    a14_3: 'print()',
    
    a15_1: 'Document and page elements',
    a15_2: 'Database',
    a15_3: 'Server',
    
    a16_1: '<img>',
    a16_2: '<image>',
    a16_3: '<pic>',
    
    a17_1: 'Name for styles',
    a17_2: 'Tag',
    a17_3: 'Attribute',
    
    a18_1: 'href',
    a18_2: 'src',
    a18_3: 'link',
    
    a19_1: 'Text explaining the code',
    a19_2: 'Error in code',
    a19_3: 'Variable name',
    
    a20_1: '<ul> or <ol>',
    a20_2: '<list>',
    a20_3: '<li>'
};

// Объект с переводами
const translations = { ru, uz, en };

// ==== 20 ПРОСТЫХ ВОПРОСОВ ДЛЯ НАЧИНАЮЩИХ ====
function createQuestions() {
    return [
        { questionKey: 'q1', answers: ['a1_1', 'a1_2', 'a1_3'], correct: Math.floor(Math.random() * 3) },
        { questionKey: 'q2', answers: ['a2_1', 'a2_2', 'a2_3'], correct: Math.floor(Math.random() * 3) },
        { questionKey: 'q3', answers: ['a3_1', 'a3_2', 'a3_3'], correct: Math.floor(Math.random() * 3) },
        { questionKey: 'q4', answers: ['a4_1', 'a4_2', 'a4_3'], correct: Math.floor(Math.random() * 3) },
        { questionKey: 'q5', answers: ['a5_1', 'a5_2', 'a5_3'], correct: Math.floor(Math.random() * 3) },
        { questionKey: 'q6', answers: ['a6_1', 'a6_2', 'a6_3'], correct: Math.floor(Math.random() * 3) },
        { questionKey: 'q7', answers: ['a7_1', 'a7_2', 'a7_3'], correct: Math.floor(Math.random() * 3) },
        { questionKey: 'q8', answers: ['a8_1', 'a8_2', 'a8_3'], correct: Math.floor(Math.random() * 3) },
        { questionKey: 'q9', answers: ['a9_1', 'a9_2', 'a9_3'], correct: Math.floor(Math.random() * 3) },
        { questionKey: 'q10', answers: ['a10_1', 'a10_2', 'a10_3'], correct: Math.floor(Math.random() * 3) },
        { questionKey: 'q11', answers: ['a11_1', 'a11_2', 'a11_3'], correct: Math.floor(Math.random() * 3) },
        { questionKey: 'q12', answers: ['a12_1', 'a12_2', 'a12_3'], correct: Math.floor(Math.random() * 3) },
        { questionKey: 'q13', answers: ['a13_1', 'a13_2', 'a13_3'], correct: Math.floor(Math.random() * 3) },
        { questionKey: 'q14', answers: ['a14_1', 'a14_2', 'a14_3'], correct: Math.floor(Math.random() * 3) },
        { questionKey: 'q15', answers: ['a15_1', 'a15_2', 'a15_3'], correct: Math.floor(Math.random() * 3) },
        { questionKey: 'q16', answers: ['a16_1', 'a16_2', 'a16_3'], correct: Math.floor(Math.random() * 3) },
        { questionKey: 'q17', answers: ['a17_1', 'a17_2', 'a17_3'], correct: Math.floor(Math.random() * 3) },
        { questionKey: 'q18', answers: ['a18_1', 'a18_2', 'a18_3'], correct: Math.floor(Math.random() * 3) },
        { questionKey: 'q19', answers: ['a19_1', 'a19_2', 'a19_3'], correct: Math.floor(Math.random() * 3) },
        { questionKey: 'q20', answers: ['a20_1', 'a20_2', 'a20_3'], correct: Math.floor(Math.random() * 3) }
    ];
}

// Создаем вопросы
let questions = createQuestions();

// Перемешиваем порядок вопросов
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

questions = shuffleArray(questions);

// ==== ТЕКУЩИЙ ЯЗЫК ====
let currentLang = localStorage.getItem('lang') || 'ru';

// ==== ФУНКЦИЯ ПЕРЕВОДА ====
function t(key) {
    if (!key) return '';

    if (currentLang === 'ru') return ru[key] || key;
    if (currentLang === 'uz') return uz[key] || ru[key] || key;
    if (currentLang === 'en') return en[key] || ru[key] || key;

    return ru[key] || key;
}

// ==== ПЕРЕМЕННЫЕ ТЕСТА ====
let currentQuestion = 0;
let score = 0;
let userAnswers = new Array(questions.length).fill(null);

// ==== УСТАНАВЛИВАЕМ ИНФОРМАЦИЮ ====
function updateUILanguage() {
    if (elements.startUser) {
        elements.startUser.textContent = `${t('hello')}, ${username}!`;
    }

    if (elements.startDescription) {
        elements.startDescription.textContent = t('startDescription');
    }

    if (elements.startBtn) {
        elements.startBtn.textContent = t('startTest');
    }

    if (elements.nextBtn) {
        elements.nextBtn.textContent = t('next');
    }

    if (elements.userRole) {
        elements.userRole.textContent = role === 'admin' ? t('admin') : t('user');
    }

    if (elements.userName) {
        elements.userName.textContent = username;
    }

    if (!elements.quizContent.classList.contains('hidden')) {
        showQuestion();
    }

    if (!elements.resultScreen.classList.contains('hidden')) {
        finishQuiz();
    }

    if (!elements.adminPanel.classList.contains('hidden')) {
        loadQuestionsList();
    }
}

// ==== ПРОВЕРКА ДОСТУПА ====
function checkTestAccess() {
    if (isOneTimeUser) {
        return true;
    }

    if (testCompleted && role !== 'admin') {
        if (elements.startScreen) {
            elements.startScreen.innerHTML = `
                <h2>${username}</h2>
                <p>${t('alreadyPassed')}</p>
                <button onclick="logout()" class="btn-glow">${t('logout')}</button>
            `;
        }
        if (elements.startBtn) {
            elements.startBtn.style.display = 'none';
        }
        return false;
    }
    return true;
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
    elements.language.value = currentLang;

    elements.language.addEventListener("change", function (e) {
        currentLang = e.target.value;
        localStorage.setItem('lang', currentLang);
        updateUILanguage();

        if (!elements.quizContent.classList.contains('hidden')) {
            showQuestion();
        }
    });
}

// ==== СТАРТ ТЕСТА ====
if (elements.startBtn) {
    if (!checkTestAccess() && !isOneTimeUser) {
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
    const questionText = t(question.questionKey);
    const answers = question.answers.map(key => t(key));

    if (elements.questionCounter) {
        elements.questionCounter.textContent = `${t('question')} ${currentQuestion + 1}/${questions.length}`;
    }

    let html = `
        <div class="answers-container">
            <h3 class="question-title">${currentQuestion + 1}. ${questionText}</h3>
    `;

    for (let i = 0; i < answers.length; i++) {
        let answerClass = "answer";

        if (userAnswers[currentQuestion] === i) {
            answerClass += " selected";
        }

        html += `<div class="${answerClass}" data-index="${i}">${answers[i]}</div>`;
    }

    html += `</div>`;

    elements.quizCard.innerHTML = html;

    document.querySelectorAll(".answer").forEach(answer => {
        answer.addEventListener("click", function () {
            selectAnswer(parseInt(this.dataset.index));
        });
    });

    if (elements.progress) {
        const progressPercent = ((currentQuestion + 1) / questions.length) * 100;
        elements.progress.style.width = progressPercent + "%";
    }
}

// ==== ВЫБОР ОТВЕТА ====
function selectAnswer(index) {
    if (userAnswers[currentQuestion] !== null) return;

    userAnswers[currentQuestion] = index;

    const answers = document.querySelectorAll(".answer");
    answers.forEach(answer => {
        answer.classList.remove("selected");
    });

    answers[index].classList.add("selected");

    if (index === questions[currentQuestion].correct) {
        score++;
    }
}

// ==== КНОПКА ДАЛЕЕ ====
if (elements.nextBtn) {
    elements.nextBtn.addEventListener("click", () => {
        if (userAnswers[currentQuestion] === null) {
            alert(t('selectAnswer'));
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

// ==== ФУНКЦИЯ УРОВНЯ ====
function getProgrammerLevel(percent) {
    if (percent < 20) {
        return { title: t('level1'), desc: t('level1_desc'), icon: '🌱', color: '#4CAF50' };
    } else if (percent < 40) {
        return { title: t('level2'), desc: t('level2_desc'), icon: '📚', color: '#8BC34A' };
    } else if (percent < 60) {
        return { title: t('level3'), desc: t('level3_desc'), icon: '⭐', color: '#FFC107' };
    } else if (percent < 80) {
        return { title: t('level4'), desc: t('level4_desc'), icon: '🌟', color: '#2196F3' };
    } else {
        return { title: t('level5'), desc: t('level5_desc'), icon: '🏆', color: '#9C27B0' };
    }
}

// ==== ЗАВЕРШЕНИЕ ТЕСТА ====
function finishQuiz() {
    elements.quizContent.classList.add("hidden");
    elements.resultScreen.classList.remove("hidden");

    const percent = Math.round((score / questions.length) * 100);
    const level = getProgrammerLevel(percent);

    if (elements.finalScore) {
        elements.finalScore.textContent = `${username}, ${t('yourResult')}: ${score}/${questions.length}`;
    }

    if (elements.correctCount) {
        elements.correctCount.textContent = `${score}/${questions.length}`;
    }

    if (elements.percentValue) {
        elements.percentValue.textContent = percent + '%';
    }

    const resultCard = document.querySelector('.result .card');
    if (resultCard) {
        const oldLevel = document.getElementById('programmerLevelBlock');
        if (oldLevel) oldLevel.remove();

        const levelBlock = document.createElement('div');
        levelBlock.id = 'programmerLevelBlock';
        levelBlock.className = 'programmer-level';
        levelBlock.innerHTML = `
            <div style="font-size: 4rem; margin-bottom: 10px;">${level.icon}</div>
            <h3 style="color: ${level.color};">${level.title}</h3>
            <p>${level.desc}</p>
        `;

        const stats = document.querySelector('.result-stats');
        if (stats) {
            stats.insertAdjacentElement('afterend', levelBlock);
        }
    }

    showAnswersReview();

    if (!isOneTimeUser && role !== 'admin') {
        localStorage.setItem(userTestKey, 'completed');
    }
}

// ==== ПОКАЗ ОТВЕТОВ ====
function showAnswersReview() {
    if (!elements.answersList) return;

    let html = '';

    questions.forEach((q, index) => {
        const questionText = t(q.questionKey);
        const answers = q.answers.map(key => t(key));
        const userAnswer = userAnswers[index];
        const isCorrect = userAnswer === q.correct;
        const correctAnswerText = answers[q.correct];
        const userAnswerText = userAnswer !== null ? answers[userAnswer] : t('notSelected');

        html += `
            <div class="review-item ${isCorrect ? 'correct-answer' : 'wrong-answer'}">
                <div class="review-question">${index + 1}. ${questionText}</div>
                <div class="review-answers">
                    <span class="review-answer correct-answer">✓ ${t('correctAnswer')} ${correctAnswerText}</span>
                    <span class="review-answer ${userAnswer !== null ? (isCorrect ? 'both-correct' : 'user-selected') : ''}">
                        ${userAnswer !== null ? t('yourAnswer') + ' ' + userAnswerText : '❌ ' + t('notSelected')}
                    </span>
                </div>
                <div class="review-status ${isCorrect ? 'status-correct' : 'status-wrong'}">
                    ${isCorrect ? '✅ ' + t('correct') : '❌ ' + t('wrong')}
                </div>
            </div>
        `;
    });

    elements.answersList.innerHTML = html;
}

// ==== АДМИН ПАНЕЛЬ ====
if (role === 'admin' && elements.adminPanel) {
    elements.adminPanel.classList.remove('hidden');
}

// ==== ВЫХОД ====
window.logout = function () {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('role');
    localStorage.removeItem('loginTime');
    localStorage.removeItem('isOneTimeUser');
    window.location.href = 'index.html';
};

window.restartTest = function () {
    startTest();
};

if (elements.logoutBtn) {
    elements.logoutBtn.addEventListener("click", logout);
}

// Добавляем CSS
const style = document.createElement('style');
style.textContent = `
    .answer.selected {
        background: linear-gradient(135deg, var(--accent), var(--accent-secondary));
        color: white;
        border-color: var(--accent);
        transform: scale(1.02);
        box-shadow: var(--neon-shadow);
    }
    
    .programmer-level {
        text-align: center;
        margin: 20px 0;
        padding: 20px;
        background: var(--glass-bg);
        border-radius: 15px;
        animation: slideIn 0.5s ease;
    }
    
    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Инициализация
updateUILanguage();
checkTestAccess();