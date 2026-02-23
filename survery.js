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

// ==== СПИСОК ОДНОРАЗОВЫХ ПАРОЛЕЙ (30 штук) ====
const oneTimePasswords = [
    'SECURE2024', 'TEMP123', 'ACCESS1', 'GUEST456', 'LOGIN789',
    'ENTER001', 'PASS002', 'CODE003', 'KEY004', 'OPEN005',
    'ADMIN006', 'USER007', 'TEST008', 'DEMO009', 'SURVEY010',
    'QUIZ011', 'ANSWER012', 'QUESTION013', 'RESULT014', 'SCORE015',
    'FINAL016', 'START017', 'NEXT018', 'BACK019', 'CHECK020',
    'VERIFY021', 'VALID022', 'LOGIN023', 'PASS024', 'TEMP025',
    'GUEST026', 'ACCESS027', 'ENTER028', 'CODE029', 'KEY030'
];

// Сохраняем пароли в localStorage при первом запуске
if (!localStorage.getItem('oneTimePasswords')) {
    localStorage.setItem('oneTimePasswords', JSON.stringify(oneTimePasswords));
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
    answersList: document.getElementById("answersList"),
    programmerLevel: document.getElementById("programmerLevel"),
    levelDescription: document.getElementById("levelDescription"),
    levelIcon: document.getElementById("levelIcon")
};

// ==== МУЛЬТИЯЗЫЧНОСТЬ ====
const translations = {
    ru: {
        // Общие
        admin: '👑 Админ',
        user: '👤 Пользователь',
        hello: 'Привет',
        guest: 'Гость',
        
        // Стартовый экран
        startDescription: 'Проверьте свои знания по программированию',
        startTest: 'Начать тест',
        
        // Тест
        question: 'Вопрос',
        next: 'Следующий ➔',
        
        // Уровни программиста
        level_0: '🔰 Нулевой уровень',
        level_0_desc: 'Вы только начинаете свой путь в программировании. Не отчаивайтесь, продолжайте учиться!',
        level_1: '🌱 Начинающий (Junior)',
        level_1_desc: 'У вас есть базовые знания, но нужно больше практики. Изучайте основы и делайте проекты!',
        level_2: '🌿 Средний (Middle)',
        level_2_desc: 'Хороший уровень! Вы понимаете основы и можете решать типовые задачи. Продолжайте в том же духе!',
        level_3: '🌳 Продвинутый (Senior)',
        level_3_desc: 'Отличный результат! У вас глубокие знания и понимание программирования. Вы настоящий профессионал!',
        level_4: '🏆 Эксперт (Team Lead)',
        level_4_desc: 'Превосходно! Ваш уровень знаний позволяет вести за собой команду. Вы - гуру программирования!',
        
        // Результаты
        yourResult: 'ваш результат',
        yourLevel: 'Ваш уровень',
        correctAnswers: 'Правильных ответов:',
        percentage: 'Процент:',
        answersReview: '📋 Разбор ответов:',
        correct: '✓ Правильно',
        wrong: '❌ Неправильно',
        notSelected: 'Не выбран',
        yourAnswer: 'Ваш ответ:',
        correctAnswer: 'Правильный:',
        restart: '🔄 Пройти снова',
        
        // Админ панель
        manageQuestions: '📝 Управление вопросами',
        addQuestion: '➕ Добавить вопрос',
        saveChanges: '💾 Сохранить изменения',
        delete: '🗑️ Удалить',
        questionPlaceholder: 'Вопрос',
        answerPlaceholder: 'Ответ',
        
        // Сообщения
        selectAnswer: 'Пожалуйста, выберите ответ!',
        adminOnly: 'Только администратор может вернуться к предыдущему вопросу!',
        adminOnlyRestart: 'Только администратор может проходить тест повторно!',
        alreadyPassed: 'Вы уже прошли этот тест.',
        adminOnlyPass: 'Только администратор может проходить тест повторно.',
        logout: 'Выйти',
        saved: '✅ Вопросы сохранены!',
        confirmDelete: 'Вы уверены, что хотите удалить этот вопрос?',
        
        // Вопросы (30 штук)
        q1: 'Что такое HTML?',
        q2: 'CSS отвечает за?',
        q3: 'JS нужен для?',
        q4: 'SCSS это?',
        q5: 'Как подключить JS?',
        q6: 'Flexbox нужен для?',
        q7: 'Grid это?',
        q8: 'localStorage хранит?',
        q9: 'addEventListener используется для?',
        q10: 'DOM это?',
        q11: 'Что такое React?',
        q12: 'Vue.js это?',
        q13: 'Angular разработан?',
        q14: 'Node.js позволяет?',
        q15: 'Python используется для?',
        q16: 'SQL нужен для?',
        q17: 'Git это?',
        q18: 'Docker используется для?',
        q19: 'REST API это?',
        q20: 'JSON это?',
        q21: 'TypeScript добавляет?',
        q22: 'Webpack это?',
        q23: 'Babel используется для?',
        q24: 'npm это?',
        q25: 'MongoDB относится к?',
        q26: 'Express.js это?',
        q27: 'JWT используется для?',
        q28: 'GraphQL это?',
        q29: 'Redux нужен для?',
        q30: 'Next.js это?',
        
        // Ответы
        a1_1: 'Язык разметки',
        a1_2: 'База данных',
        a1_3: 'Сервер',
        a2_1: 'Стиль',
        a2_2: 'Логику',
        a2_3: 'API',
        a3_1: 'Интерактивности',
        a3_2: 'Цвета',
        a3_3: 'Шрифтов',
        a4_1: 'CSS препроцессор',
        a4_2: 'Браузер',
        a4_3: 'Фреймворк',
        a5_1: '<script>',
        a5_2: '<link>',
        a5_3: '<style>',
        a6_1: 'Расположения элементов',
        a6_2: 'Цветов',
        a6_3: 'Файлов',
        a7_1: 'Сетка на странице',
        a7_2: 'Сервер',
        a7_3: 'База данных',
        a8_1: 'Данные в браузере',
        a8_2: 'Видео',
        a8_3: 'Фото',
        a9_1: 'Событий',
        a9_2: 'Стилей',
        a9_3: 'Файлов',
        a10_1: 'Document Object Model',
        a10_2: 'Database',
        a10_3: 'Drive',
        a11_1: 'Библиотека для UI',
        a11_2: 'База данных',
        a11_3: 'Сервер',
        a12_1: 'Фреймворк',
        a12_2: 'Язык программирования',
        a12_3: 'База данных',
        a13_1: 'Google',
        a13_2: 'Facebook',
        a13_3: 'Microsoft',
        a14_1: 'Запускать JS на сервере',
        a14_2: 'Стилизовать страницы',
        a14_3: 'Работать с БД',
        a15_1: 'Всего перечисленного',
        a15_2: 'Только веба',
        a15_3: 'Только мобильных приложений',
        a16_1: 'Работы с базами данных',
        a16_2: 'Стилизации',
        a16_3: 'Анимаций',
        a17_1: 'Система контроля версий',
        a17_2: 'Текстовый редактор',
        a17_3: 'Компилятор',
        a18_1: 'Контейнеризации',
        a18_2: 'Виртуализации',
        a18_3: 'Деплоя',
        a19_1: 'Архитектурный стиль API',
        a19_2: 'Язык программирования',
        a19_3: 'База данных',
        a20_1: 'Формат обмена данными',
        a20_2: 'Язык разметки',
        a20_3: 'Протокол передачи',
        a21_1: 'Типизацию',
        a21_2: 'Стили',
        a21_3: 'Анимацию',
        a22_1: 'Сборщик модулей',
        a22_2: 'Тестовый фреймворк',
        a22_3: 'Язык программирования',
        a23_1: 'Транспиляции кода',
        a23_2: 'Стилизации',
        a23_3: 'Тестирования',
        a24_1: 'Менеджер пакетов',
        a24_2: 'Язык программирования',
        a24_3: 'Фреймворк',
        a25_1: 'NoSQL базам данных',
        a25_2: 'SQL базам данных',
        a25_3: 'Файловым системам',
        a26_1: 'Фреймворк для Node.js',
        a26_2: 'База данных',
        a26_3: 'Язык программирования',
        a27_1: 'Аутентификации',
        a27_2: 'Стилизации',
        a27_3: 'Валидации',
        a28_1: 'Язык запросов для API',
        a28_2: 'База данных',
        a28_3: 'Сервер',
        a29_1: 'Управления состоянием',
        a29_2: 'Маршрутизации',
        a29_3: 'Стилизации',
        a30_1: 'Фреймворк на React',
        a30_2: 'База данных',
        a30_3: 'Сервер'
    },
    
    uz: {
        // Общие
        admin: '👑 Admin',
        user: '👤 Foydalanuvchi',
        hello: 'Salom',
        guest: 'Mehmon',
        
        // Стартовый экран
        startDescription: 'Dasturlash bo\'yicha bilimingizni sinab ko\'ring',
        startTest: 'Testni boshlash',
        
        // Тест
        question: 'Savol',
        next: 'Keyingi ➔',
        
        // Уровни программиста
        level_0: '🔰 Boshlang\'ich daraja',
        level_0_desc: 'Siz dasturlash yo\'lida endi boshlayapsiz. Xafa bo\'lmang, o\'rganishda davom eting!',
        level_1: '🌱 Junior',
        level_1_desc: 'Asosiy bilimlar bor, lekin ko\'proq amaliyot kerak. Asoslarni o\'rganing va loyihalar qiling!',
        level_2: '🌿 Middle',
        level_2_desc: 'Yaxshi daraja! Asoslarni tushunasiz va oddiy masalalarni yecha olasiz. Shu tartibda davom eting!',
        level_3: '🌳 Senior',
        level_3_desc: 'Ajoyib natija! Chuqur bilim va tushunchaga egasiz. Siz haqiqiy professionalsiz!',
        level_4: '🏆 Expert (Team Lead)',
        level_4_desc: 'Zo\'r! Bilim darajangiz jamoani boshqarishga imkon beradi. Siz dasturlash gurusiz!',
        
        // Результаты
        yourResult: 'Sizning natijangiz',
        yourLevel: 'Sizning darajangiz',
        correctAnswers: 'To\'g\'ri javoblar:',
        percentage: 'Foiz:',
        answersReview: '📋 Javoblar tahlili:',
        correct: '✓ To\'g\'ri',
        wrong: '❌ Noto\'g\'ri',
        notSelected: 'Tanlanmagan',
        yourAnswer: 'Sizning javobingiz:',
        correctAnswer: 'To\'g\'ri javob:',
        restart: '🔄 Qayta topshirish',
        
        // Админ панель
        manageQuestions: '📝 Savollarni boshqarish',
        addQuestion: '➕ Savol qo\'shish',
        saveChanges: '💾 O\'zgarishlarni saqlash',
        delete: '🗑️ O\'chirish',
        questionPlaceholder: 'Savol',
        answerPlaceholder: 'Javob',
        
        // Сообщения
        selectAnswer: 'Iltimos, javobni tanlang!',
        adminOnly: 'Faqat administrator oldingi savolga qaytishi mumkin!',
        adminOnlyRestart: 'Faqat administrator testni qayta topshirishi mumkin!',
        alreadyPassed: 'Siz bu testni allaqachon topshirgansiz.',
        adminOnlyPass: 'Faqat administrator testni qayta topshirishi mumkin.',
        logout: 'Chiqish',
        saved: '✅ Savollar saqlandi!',
        confirmDelete: 'Bu savolni o\'chirishni xohlaysizmi?',
        
        // Вопросы
        q1: 'HTML nima?',
        q2: 'CSS nima uchun kerak?',
        q3: 'JS nima uchun kerak?',
        q4: 'SCSS bu?',
        q5: 'JS ni qanday ulash mumkin?',
        q6: 'Flexbox nima uchun kerak?',
        q7: 'Grid bu?',
        q8: 'localStorage nimani saqlaydi?',
        q9: 'addEventListener nima uchun ishlatiladi?',
        q10: 'DOM bu?',
        q11: 'React nima?',
        q12: 'Vue.js bu?',
        q13: 'Angular kim tomonidan yaratilgan?',
        q14: 'Node.js nima qilish imkonini beradi?',
        q15: 'Python nima uchun ishlatiladi?',
        q16: 'SQL nima uchun kerak?',
        q17: 'Git bu?',
        q18: 'Docker nima uchun ishlatiladi?',
        q19: 'REST API bu?',
        q20: 'JSON bu?',
        q21: 'TypeScript nima qo\'shadi?',
        q22: 'Webpack bu?',
        q23: 'Babel nima uchun ishlatiladi?',
        q24: 'npm bu?',
        q25: 'MongoDB qaysi turga kiradi?',
        q26: 'Express.js bu?',
        q27: 'JWT nima uchun ishlatiladi?',
        q28: 'GraphQL bu?',
        q29: 'Redux nima uchun kerak?',
        q30: 'Next.js bu?',
        
        // Ответы
        a1_1: 'Belgilash tili',
        a1_2: 'Ma\'lumotlar bazasi',
        a1_3: 'Server',
        a2_1: 'Stil',
        a2_2: 'Mantiq',
        a2_3: 'API',
        a3_1: 'Interaktivlik',
        a3_2: 'Ranglar',
        a3_3: 'Shriftlar',
        a4_1: 'CSS preprotsessor',
        a4_2: 'Brauzer',
        a4_3: 'Freymvork',
        a5_1: '<script>',
        a5_2: '<link>',
        a5_3: '<style>',
        a6_1: 'Elementlarni joylashtirish',
        a6_2: 'Ranglar',
        a6_3: 'Fayllar',
        a7_1: 'Sahifadagi setka',
        a7_2: 'Server',
        a7_3: 'Ma\'lumotlar bazasi',
        a8_1: 'Brauzerdagi ma\'lumotlar',
        a8_2: 'Video',
        a8_3: 'Rasm',
        a9_1: 'Hodisalar',
        a9_2: 'Stillar',
        a9_3: 'Fayllar',
        a10_1: 'Document Object Model',
        a10_2: 'Ma\'lumotlar bazasi',
        a10_3: 'Disk',
        a11_1: 'UI uchun kutubxona',
        a11_2: 'Ma\'lumotlar bazasi',
        a11_3: 'Server',
        a12_1: 'Freymvork',
        a12_2: 'Dasturlash tili',
        a12_3: 'Ma\'lumotlar bazasi',
        a13_1: 'Google',
        a13_2: 'Facebook',
        a13_3: 'Microsoft',
        a14_1: 'JS ni serverda ishga tushirish',
        a14_2: 'Sahifalarni stillash',
        a14_3: 'MB bilan ishlash',
        a15_1: 'Hammasi',
        a15_2: 'Faqat veb',
        a15_3: 'Faqat mobil ilovalar',
        a16_1: 'MB bilan ishlash',
        a16_2: 'Stilizatsiya',
        a16_3: 'Animatsiya',
        a17_1: 'Versiya nazorat tizimi',
        a17_2: 'Matn muharriri',
        a17_3: 'Kompilyator',
        a18_1: 'Konteynerlash',
        a18_2: 'Virtualizatsiya',
        a18_3: 'Deploy',
        a19_1: 'API arxitekturasi',
        a19_2: 'Dasturlash tili',
        a19_3: 'Ma\'lumotlar bazasi',
        a20_1: 'Ma\'lumot almashish formati',
        a20_2: 'Belgilash tili',
        a20_3: 'Uzatish protokoli',
        a21_1: 'Tipizatsiya',
        a21_2: 'Stillar',
        a21_3: 'Animatsiya',
        a22_1: 'Modul yig\'uvchi',
        a22_2: 'Test freymvorki',
        a22_3: 'Dasturlash tili',
        a23_1: 'Kod transpilyatsiyasi',
        a23_2: 'Stilizatsiya',
        a23_3: 'Testlash',
        a24_1: 'Paket menejeri',
        a24_2: 'Dasturlash tili',
        a24_3: 'Freymvork',
        a25_1: 'NoSQL ma\'lumotlar bazasi',
        a25_2: 'SQL ma\'lumotlar bazasi',
        a25_3: 'Fayl tizimlari',
        a26_1: 'Node.js uchun freymvork',
        a26_2: 'Ma\'lumotlar bazasi',
        a26_3: 'Dasturlash tili',
        a27_1: 'Autentifikatsiya',
        a27_2: 'Stilizatsiya',
        a27_3: 'Validatsiya',
        a28_1: 'API uchun so\'rovlar tili',
        a28_2: 'Ma\'lumotlar bazasi',
        a28_3: 'Server',
        a29_1: 'Holatni boshqarish',
        a29_2: 'Marshrutlash',
        a29_3: 'Stilizatsiya',
        a30_1: 'React asosidagi freymvork',
        a30_2: 'Ma\'lumotlar bazasi',
        a30_3: 'Server'
    },
    
    en: {
        // General
        admin: '👑 Admin',
        user: '👤 User',
        hello: 'Hello',
        guest: 'Guest',
        
        // Start screen
        startDescription: 'Test your programming knowledge',
        startTest: 'Start Test',
        
        // Test
        question: 'Question',
        next: 'Next ➔',
        
        // Programmer levels
        level_0: '🔰 Beginner',
        level_0_desc: 'You are just starting your journey in programming. Don\'t give up, keep learning!',
        level_1: '🌱 Junior',
        level_1_desc: 'You have basic knowledge but need more practice. Study the basics and build projects!',
        level_2: '🌿 Middle',
        level_2_desc: 'Good level! You understand the basics and can solve typical tasks. Keep it up!',
        level_3: '🌳 Senior',
        level_3_desc: 'Excellent result! You have deep knowledge and understanding of programming. You are a true professional!',
        level_4: '🏆 Expert (Team Lead)',
        level_4_desc: 'Perfect! Your knowledge level allows you to lead a team. You are a programming guru!',
        
        // Results
        yourResult: 'your result',
        yourLevel: 'Your Level',
        correctAnswers: 'Correct answers:',
        percentage: 'Percentage:',
        answersReview: '📋 Answers Review:',
        correct: '✓ Correct',
        wrong: '❌ Wrong',
        notSelected: 'Not selected',
        yourAnswer: 'Your answer:',
        correctAnswer: 'Correct:',
        restart: '🔄 Restart',
        
        // Admin panel
        manageQuestions: '📝 Manage Questions',
        addQuestion: '➕ Add Question',
        saveChanges: '💾 Save Changes',
        delete: '🗑️ Delete',
        questionPlaceholder: 'Question',
        answerPlaceholder: 'Answer',
        
        // Messages
        selectAnswer: 'Please select an answer!',
        adminOnly: 'Only admin can go back to previous question!',
        adminOnlyRestart: 'Only admin can retake the test!',
        alreadyPassed: 'You have already passed this test.',
        adminOnlyPass: 'Only admin can retake the test.',
        logout: 'Logout',
        saved: '✅ Questions saved!',
        confirmDelete: 'Are you sure you want to delete this question?',
        
        // Questions
        q1: 'What is HTML?',
        q2: 'CSS is responsible for?',
        q3: 'JS is used for?',
        q4: 'SCSS is?',
        q5: 'How to include JS?',
        q6: 'Flexbox is used for?',
        q7: 'Grid is?',
        q8: 'localStorage stores?',
        q9: 'addEventListener is used for?',
        q10: 'DOM is?',
        q11: 'What is React?',
        q12: 'Vue.js is?',
        q13: 'Angular is developed by?',
        q14: 'Node.js allows?',
        q15: 'Python is used for?',
        q16: 'SQL is used for?',
        q17: 'Git is?',
        q18: 'Docker is used for?',
        q19: 'REST API is?',
        q20: 'JSON is?',
        q21: 'TypeScript adds?',
        q22: 'Webpack is?',
        q23: 'Babel is used for?',
        q24: 'npm is?',
        q25: 'MongoDB belongs to?',
        q26: 'Express.js is?',
        q27: 'JWT is used for?',
        q28: 'GraphQL is?',
        q29: 'Redux is used for?',
        q30: 'Next.js is?',
        
        // Answers
        a1_1: 'Markup language',
        a1_2: 'Database',
        a1_3: 'Server',
        a2_1: 'Style',
        a2_2: 'Logic',
        a2_3: 'API',
        a3_1: 'Interactivity',
        a3_2: 'Colors',
        a3_3: 'Fonts',
        a4_1: 'CSS preprocessor',
        a4_2: 'Browser',
        a4_3: 'Framework',
        a5_1: '<script>',
        a5_2: '<link>',
        a5_3: '<style>',
        a6_1: 'Layout',
        a6_2: 'Colors',
        a6_3: 'Files',
        a7_1: 'Page grid',
        a7_2: 'Server',
        a7_3: 'Database',
        a8_1: 'Data in browser',
        a8_2: 'Video',
        a8_3: 'Photo',
        a9_1: 'Events',
        a9_2: 'Styles',
        a9_3: 'Files',
        a10_1: 'Document Object Model',
        a10_2: 'Database',
        a10_3: 'Drive',
        a11_1: 'UI library',
        a11_2: 'Database',
        a11_3: 'Server',
        a12_1: 'Framework',
        a12_2: 'Programming language',
        a12_3: 'Database',
        a13_1: 'Google',
        a13_2: 'Facebook',
        a13_3: 'Microsoft',
        a14_1: 'Run JS on server',
        a14_2: 'Style pages',
        a14_3: 'Work with DB',
        a15_1: 'All of the above',
        a15_2: 'Web only',
        a15_3: 'Mobile only',
        a16_1: 'Working with databases',
        a16_2: 'Styling',
        a16_3: 'Animations',
        a17_1: 'Version control system',
        a17_2: 'Text editor',
        a17_3: 'Compiler',
        a18_1: 'Containerization',
        a18_2: 'Virtualization',
        a18_3: 'Deployment',
        a19_1: 'API architectural style',
        a19_2: 'Programming language',
        a19_3: 'Database',
        a20_1: 'Data interchange format',
        a20_2: 'Markup language',
        a20_3: 'Transfer protocol',
        a21_1: 'Typing',
        a21_2: 'Styles',
        a21_3: 'Animation',
        a22_1: 'Module bundler',
        a22_2: 'Test framework',
        a22_3: 'Programming language',
        a23_1: 'Code transpilation',
        a23_2: 'Styling',
        a23_3: 'Testing',
        a24_1: 'Package manager',
        a24_2: 'Programming language',
        a24_3: 'Framework',
        a25_1: 'NoSQL databases',
        a25_2: 'SQL databases',
        a25_3: 'File systems',
        a26_1: 'Node.js framework',
        a26_2: 'Database',
        a26_3: 'Programming language',
        a27_1: 'Authentication',
        a27_2: 'Styling',
        a27_3: 'Validation',
        a28_1: 'Query language for API',
        a28_2: 'Database',
        a28_3: 'Server',
        a29_1: 'State management',
        a29_2: 'Routing',
        a29_3: 'Styling',
        a30_1: 'React framework',
        a30_2: 'Database',
        a30_3: 'Server'
    }
};

// ==== ВОПРОСЫ (30 штук с перемешиванием) ====
let baseQuestions = [
    {
        questionKey: 'q1',
        answers: ['a1_1', 'a1_2', 'a1_3'],
        correct: 0
    },
    {
        questionKey: 'q2',
        answers: ['a2_1', 'a2_2', 'a2_3'],
        correct: 0
    },
    {
        questionKey: 'q3',
        answers: ['a3_1', 'a3_2', 'a3_3'],
        correct: 0
    },
    {
        questionKey: 'q4',
        answers: ['a4_1', 'a4_2', 'a4_3'],
        correct: 0
    },
    {
        questionKey: 'q5',
        answers: ['a5_1', 'a5_2', 'a5_3'],
        correct: 0
    },
    {
        questionKey: 'q6',
        answers: ['a6_1', 'a6_2', 'a6_3'],
        correct: 0
    },
    {
        questionKey: 'q7',
        answers: ['a7_1', 'a7_2', 'a7_3'],
        correct: 0
    },
    {
        questionKey: 'q8',
        answers: ['a8_1', 'a8_2', 'a8_3'],
        correct: 0
    },
    {
        questionKey: 'q9',
        answers: ['a9_1', 'a9_2', 'a9_3'],
        correct: 0
    },
    {
        questionKey: 'q10',
        answers: ['a10_1', 'a10_2', 'a10_3'],
        correct: 0
    },
    {
        questionKey: 'q11',
        answers: ['a11_1', 'a11_2', 'a11_3'],
        correct: 0
    },
    {
        questionKey: 'q12',
        answers: ['a12_1', 'a12_2', 'a12_3'],
        correct: 0
    },
    {
        questionKey: 'q13',
        answers: ['a13_1', 'a13_2', 'a13_3'],
        correct: 0
    },
    {
        questionKey: 'q14',
        answers: ['a14_1', 'a14_2', 'a14_3'],
        correct: 0
    },
    {
        questionKey: 'q15',
        answers: ['a15_1', 'a15_2', 'a15_3'],
        correct: 0
    },
    {
        questionKey: 'q16',
        answers: ['a16_1', 'a16_2', 'a16_3'],
        correct: 0
    },
    {
        questionKey: 'q17',
        answers: ['a17_1', 'a17_2', 'a17_3'],
        correct: 0
    },
    {
        questionKey: 'q18',
        answers: ['a18_1', 'a18_2', 'a18_3'],
        correct: 0
    },
    {
        questionKey: 'q19',
        answers: ['a19_1', 'a19_2', 'a19_3'],
        correct: 0
    },
    {
        questionKey: 'q20',
        answers: ['a20_1', 'a20_2', 'a20_3'],
        correct: 0
    },
    {
        questionKey: 'q21',
        answers: ['a21_1', 'a21_2', 'a21_3'],
        correct: 0
    },
    {
        questionKey: 'q22',
        answers: ['a22_1', 'a22_2', 'a22_3'],
        correct: 0
    },
    {
        questionKey: 'q23',
        answers: ['a23_1', 'a23_2', 'a23_3'],
        correct: 0
    },
    {
        questionKey: 'q24',
        answers: ['a24_1', 'a24_2', 'a24_3'],
        correct: 0
    },
    {
        questionKey: 'q25',
        answers: ['a25_1', 'a25_2', 'a25_3'],
        correct: 0
    },
    {
        questionKey: 'q26',
        answers: ['a26_1', 'a26_2', 'a26_3'],
        correct: 0
    },
    {
        questionKey: 'q27',
        answers: ['a27_1', 'a27_2', 'a27_3'],
        correct: 0
    },
    {
        questionKey: 'q28',
        answers: ['a28_1', 'a28_2', 'a28_3'],
        correct: 0
    },
    {
        questionKey: 'q29',
        answers: ['a29_1', 'a29_2', 'a29_3'],
        correct: 0
    },
    {
        questionKey: 'q30',
        answers: ['a30_1', 'a30_2', 'a30_3'],
        correct: 0
    }
];

// Функция для перемешивания массива
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Загружаем или создаем перемешанные вопросы
let questions = [];
const savedQuestions = localStorage.getItem('surveyQuestions');

if (savedQuestions) {
    questions = JSON.parse(savedQuestions);
} else {
    // Перемешиваем вопросы при первом запуске
    questions = shuffleArray([...baseQuestions]);
    localStorage.setItem('surveyQuestions', JSON.stringify(questions));
}

// Текущий язык
let currentLang = localStorage.getItem('lang') || 'ru';

// ==== ФУНКЦИИ ДЛЯ ПЕРЕВОДА ====
function t(key) {
    return translations[currentLang]?.[key] || translations['ru'][key] || key;
}

function translateQuestion(q) {
    return {
        question: t(q.questionKey),
        answers: q.answers.map(answerKey => t(answerKey)),
        correct: q.correct
    };
}

// Функция для обновления языка на странице
function updateLanguage() {
    // Обновляем тексты с data-i18n атрибутами
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        element.textContent = t(key);
    });

    // Обновляем специфичные элементы
    if (elements.startDescription) {
        elements.startDescription.textContent = t('startDescription');
    }
    
    if (elements.userRole) {
        elements.userRole.textContent = role === 'admin' ? t('admin') : t('user');
    }

    // Если тест активен, обновляем текущий вопрос
    if (!elements.quizContent.classList.contains('hidden')) {
        showQuestion();
    }

    // Если показываются результаты, обновляем их
    if (!elements.resultScreen.classList.contains('hidden')) {
        showAnswersReview();
    }

    // Обновляем админ панель, если она видна
    if (!elements.adminPanel.classList.contains('hidden')) {
        loadQuestionsList();
    }

    // Сохраняем выбранный язык
    localStorage.setItem('lang', currentLang);
}

// ==== ПЕРЕМЕННЫЕ ТЕСТА ====
let currentQuestion = 0;
let score = 0;
let userAnswers = new Array(questions.length).fill(null);

// ==== УСТАНАВЛИВАЕМ ИНФОРМАЦИЮ О ПОЛЬЗОВАТЕЛЕ ====
if (elements.startUser) {
    elements.startUser.textContent = `${t('hello')}, ${username}!`;
}

if (elements.userRole) {
    elements.userRole.textContent = role === 'admin' ? t('admin') : t('user');
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
                <p>${t('alreadyPassed')}</p>
                <p>${t('adminOnlyPass')}</p>
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
        currentLang = localStorage.getItem("lang");
    }

    elements.language.addEventListener("change", (e) => {
        currentLang = e.target.value;
        updateLanguage();
    });
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

    const translatedQuestion = translateQuestion(questions[currentQuestion]);

    if (elements.questionCounter) {
        elements.questionCounter.textContent = `${t('question')} ${currentQuestion + 1}/${questions.length}`;
    }

    let html = `
        <div class="answers-container">
            <h3 class="question-title">${currentQuestion + 1}. ${translatedQuestion.question}</h3>
    `;

    for (let i = 0; i < translatedQuestion.answers.length; i++) {
        let answerClass = "answer";

        // Если этот ответ был выбран пользователем, добавляем класс selected
        if (userAnswers[currentQuestion] === i) {
            answerClass += " selected";
        }

        html += `<div class="${answerClass}" data-index="${i}">${translatedQuestion.answers[i]}</div>`;
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

    // Считаем правильные ответы
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

// ==== КНОПКА НАЗАД ====
if (elements.backBtn) {
    elements.backBtn.addEventListener("click", () => {
        if (role !== "admin") {
            alert(t('adminOnly'));
            return;
        }

        if (currentQuestion > 0) {
            currentQuestion--;
            showQuestion();
        }
    });
}

// ==== ФУНКЦИЯ ОПРЕДЕЛЕНИЯ УРОВНЯ ====
function getProgrammerLevel(percent) {
    if (percent < 20) {
        return {
            level: 'level_0',
            icon: '🔰',
            color: '#ff6b6b'
        };
    } else if (percent < 40) {
        return {
            level: 'level_1',
            icon: '🌱',
            color: '#4ecdc4'
        };
    } else if (percent < 60) {
        return {
            level: 'level_2',
            icon: '🌿',
            color: '#45b7d1'
        };
    } else if (percent < 80) {
        return {
            level: 'level_3',
            icon: '🌳',
            color: '#96ceb4'
        };
    } else {
        return {
            level: 'level_4',
            icon: '🏆',
            color: '#ffd93d'
        };
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

    // Добавляем информацию об уровне программиста
    const resultCard = document.querySelector('.result .card');
    if (resultCard) {
        // Удаляем старый уровень, если есть
        const oldLevel = document.getElementById('programmerLevelBlock');
        if (oldLevel) oldLevel.remove();

        const levelBlock = document.createElement('div');
        levelBlock.id = 'programmerLevelBlock';
        levelBlock.className = 'programmer-level';
        levelBlock.style.cssText = `
            text-align: center;
            margin: 20px 0;
            padding: 20px;
            background: linear-gradient(135deg, ${level.color}20, transparent);
            border-radius: 15px;
            border-left: 4px solid ${level.color};
        `;
        levelBlock.innerHTML = `
            <div style="font-size: 4rem; margin-bottom: 10px;">${level.icon}</div>
            <h3 style="font-size: 1.8rem; color: ${level.color}; margin-bottom: 10px;">${t(level.level)}</h3>
            <p style="font-size: 1.1rem; opacity: 0.9;">${t(level.level + '_desc')}</p>
        `;
        
        // Вставляем после статистики
        const stats = document.querySelector('.result-stats');
        if (stats) {
            stats.insertAdjacentElement('afterend', levelBlock);
        }
    }

    // Показываем правильные ответы
    showAnswersReview();

    // Отмечаем, что пользователь прошел тест (если это не админ)
    if (role !== 'admin') {
        localStorage.setItem(userTestKey, 'completed');
    }
}

// ==== ПОКАЗ ПРАВИЛЬНЫХ ОТВЕТОВ ====
function showAnswersReview() {
    if (!elements.answersList) return;

    let html = '';

    questions.forEach((q, index) => {
        const translatedQ = translateQuestion(q);
        const userAnswer = userAnswers[index];
        const isCorrect = userAnswer === q.correct;
        const correctAnswerText = translatedQ.answers[q.correct];
        const userAnswerText = userAnswer !== null ? translatedQ.answers[userAnswer] : t('notSelected');

        html += `
            <div class="review-item ${isCorrect ? 'correct-answer' : 'wrong-answer'}">
                <div class="review-question">${index + 1}. ${translatedQ.question}</div>
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

// ==== ЗАГРУЗКА ВОПРОСОВ ДЛЯ АДМИНА ====
function loadQuestionsList() {
    if (!elements.questionsList) return;

    let html = '';

    questions.forEach((q, index) => {
        const translatedQ = translateQuestion(q);
        
        html += `
            <div class="question-edit" data-index="${index}">
                <input type="text" class="q-text" value="${q.questionKey}" placeholder="${t('questionPlaceholder')}">
                <input type="text" class="a1" value="${q.answers[0]}" placeholder="${t('answerPlaceholder')} 1">
                <input type="text" class="a2" value="${q.answers[1]}" placeholder="${t('answerPlaceholder')} 2">
                <input type="text" class="a3" value="${q.answers[2]}" placeholder="${t('answerPlaceholder')} 3">
                <select class="correct-select">
                    <option value="0" ${q.correct === 0 ? 'selected' : ''}>${t('answerPlaceholder')} 1</option>
                    <option value="1" ${q.correct === 1 ? 'selected' : ''}>${t('answerPlaceholder')} 2</option>
                    <option value="2" ${q.correct === 2 ? 'selected' : ''}>${t('answerPlaceholder')} 3</option>
                </select>
                <button class="delete-btn" onclick="deleteQuestion(${index})">${t('delete')}</button>
            </div>
        `;
    });

    elements.questionsList.innerHTML = html;
}

// ==== ДОБАВЛЕНИЕ ВОПРОСА ====
if (elements.addQuestionBtn) {
    elements.addQuestionBtn.addEventListener("click", () => {
        questions.push({
            questionKey: "q_new",
            answers: ["a_new_1", "a_new_2", "a_new_3"],
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
                    questionKey: qText,
                    answers: [a1, a2, a3],
                    correct: correct
                };
            }
        });

        localStorage.setItem('surveyQuestions', JSON.stringify(questions));
        alert(t('saved'));
    });
}

// ==== УДАЛЕНИЕ ВОПРОСА ====
window.deleteQuestion = function (index) {
    if (confirm(t('confirmDelete'))) {
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
        alert(t('adminOnlyRestart'));
        return;
    }
    startTest();
};

if (elements.logoutBtn) {
    elements.logoutBtn.addEventListener("click", logout);
}

// Добавляем CSS для выделения выбранного ответа и уровня
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
    
    .programmer-level {
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

// Инициализация языка при загрузке
updateLanguage();

// Проверяем доступ при загрузке страницы
checkTestAccess();