// Находим кнопку по ее ID
const alertButton = document.getElementById('btn-alert');

// Добавляем событие клика
alertButton.addEventListener('click', () => {
    alert('Добро пожаловать в Лос-Сантос! На етом сайте ты найдешь чит коди красивую карту и топ машины.');
});

// Расширенная база данных чит-кодов с категориями
const cheatsDatabase = [
    // Категория: Игрок / Бессмертие
    { category: "player", name: "Бессмертие (на 5 минут)", pc: "PAINKILLER", ps: "RIGHT, X, RIGHT, LEFT, RIGHT, R1, RIGHT, LEFT, X, TRIANGLE" },
    { category: "player", name: "Максимум здоровья и брони", pc: "TURTLE", ps: "CIRCLE, L1, TRIANGLE, R2, X, SQUARE, CIRCLE, RIGHT, SQUARE, L1, L1, L1" },
    { category: "player", name: "Повысить уровень розыска (+1 звезда)", pc: "FUGITIVE", ps: "R1, R1, CIRCLE, R2, LEFT, RIGHT, LEFT, RIGHT, LEFT, RIGHT" },
    { category: "player", name: "Понизить уровень розыска (-1 звезда)", pc: "LAWYERUP", ps: "R1, R1, CIRCLE, R2, RIGHT, LEFT, RIGHT, LEFT, RIGHT, LEFT" },
    
    // Категория: Оружие
    { category: "weapons", name: "Получить всё оружие и патроны", pc: "TOOLUP", ps: "TRIANGLE, R2, LEFT, L1, X, RIGHT, TRIANGLE, DOWN, SQUARE, L1, L1, L1" },
    { category: "weapons", name: "Взрывные выстрелы", pc: "HIGHEX", ps: "RIGHT, SQUARE, X, LEFT, R1, R2, LEFT, RIGHT, RIGHT, L1, L1, L1" },
    { category: "weapons", name: "Зажигательные патроны", pc: "INCEDIARY", ps: "L1, R1, SQUARE, R1, LEFT, R2, R1, LEFT, SQUARE, RIGHT, L1, L1" },

    // Категория: Машины / Транспорт
    { category: "cars", name: "Суперкар Pegassi Rapid GT", pc: "RAPIDGT", ps: "R2, L1, CIRCLE, RIGHT, L1, R1, RIGHT, LEFT, CIRCLE, R2" },
    { category: "cars", name: "Спорткар Dewbauchee Comet", pc: "COMET", ps: "R1, CIRCLE, R2, RIGHT, L1, L2, X, X, SQUARE, R1" },
    { category: "cars", name: "Вертолет Buzzard (с ракетами)", pc: "BUZZOFF", ps: "CIRCLE, CIRCLE, L1, CIRCLE, CIRCLE, CIRCLE, L1, L2, R1, TRIANGLE, CIRCLE, TRIANGLE" },
    { category: "cars", name: "Мотоцикл PCJ-600", pc: "ROCKET", ps: "R1, RIGHT, LEFT, RIGHT, R2, LEFT, RIGHT, SQUARE, RIGHT, L2, L1, L1" }
];

// Текущие настройки фильтра
let currentPlatform = 'pc';
let currentCategory = 'all';

// Функция для вывода кодов на экран
function renderCheats() {
    const container = document.getElementById('cheats-container');
    container.innerHTML = ''; // Очищаем контейнер перед выводом

    // Фильтруем массив по выбранной категории
    const filteredCheats = cheatsDatabase.filter(cheat => {
        if (currentCategory === 'all') return true;
        return cheat.category === currentCategory;
    });

    // Если ничего не найдено
    if (filteredCheats.length === 0) {
        container.innerHTML = '<p style="text-align:center; color:#666;">Коды в этой категории пока не добавлены.</p>';
        return;
    }

    // Генерируем HTML для каждого чита
    filteredCheats.forEach(cheat => {
        const codeValue = currentPlatform === 'pc' ? cheat.pc : cheat.ps;
        container.innerHTML += `
            <div class="cheat-item">
                <label>${cheat.name}</label>
                <span>${codeValue}</span>
            </div>
        `;
    });
}

// Функция смены категории
function changeCategory(categoryName) {
    currentCategory = categoryName;
    
    // Переключаем активный класс у кнопок категорий
    const catButtons = document.querySelectorAll('.btn-category');
    catButtons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    renderCheats();
}

// Настройка переключателей платформы (ПК / PS) при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    const btnPc = document.getElementById('btn-pc');
    const btnPs = document.getElementById('btn-ps');

    if(btnPc && btnPs) {
        btnPc.addEventListener('click', () => {
            currentPlatform = 'pc';
            btnPs.classList.remove('active');
            btnPc.classList.add('active');
            renderCheats();
        });

        btnPs.addEventListener('click', () => {
            currentPlatform = 'ps';
            btnPc.classList.remove('active');
            btnPs.classList.add('active');
            renderCheats();
        });
    }

    // Первый запуск рендеринга кодов
    renderCheats();
});

// Находим элементы формы
const commentForm = document.getElementById('comment-form');
const commentsList = document.getElementById('comments-list');

// Загружаем отзывы из памяти при открытии сайта
document.addEventListener('DOMContentLoaded', loadComments);

// Обработка отправки формы
commentForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Отменяем перезагрузку страницы

    const nameInput = document.getElementById('comment-name');
    const textInput = document.getElementById('comment-text');

    const newComment = {
        name: nameInput.value,
        text: textInput.value
    };

    // Сохраняем в массив
    let comments = JSON.parse(localStorage.getItem('gta_comments')) || [];
    comments.push(newComment);
    localStorage.setItem('gta_comments', JSON.stringify(comments));

    // Выводим на экран
    addCommentToDOM(newComment);

    // Очищаем форму
    nameInput.value = '';
    textInput.value = '';
});

// Функция добавления отзыва на страницу
function addCommentToDOM(comment) {
    const div = document.createElement('div');
    div.classList.add('comment-item');
    div.innerHTML = `
        <h4>${escapeHTML(comment.name)}</h4>
        <p>${escapeHTML(comment.text)}</p>
    `;
    commentsList.appendChild(div);
}

// Загрузка всех отзывов
function loadComments() {
    let comments = JSON.parse(localStorage.getItem('gta_comments')) || [];
    comments.forEach(addCommentToDOM);
}

// Защита от спама кодом (XSS уязвимости)
function escapeHTML(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// Код для работы мобильного меню-бургера
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('#nav-menu a');

// Открываем/закрываем меню при клике на бургер
mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Автоматически закрываем меню при клике на любой пункт (чтобы не мешало скроллу)
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// База данных машин с указанием редкости
const carsDatabase = [
   {
        id: "karin",
        name: "Karin Sultan RS", // Изменили название на RS-версию
        type: "Суперкар / Спорткар", // Изменили тип
        speed: "9.2/10", // Увеличили скорость для раллийной версии
        rarity: "rare", // Перевели в категорию редких, так как RS-версию сложнее найти
        rarityText: "Редкая (Тюнинг в Султан RS)",
        image: "sportcar.jpg" // Имя картинки оставляем прежним (или вашим)
    },
    {
        id: "vapid",
        name: "Vapid Dominator",
        type: "Маслкар",
        speed: "8.0/10",
        rarity: "common",
        rarityText: "Частая (В центре Лос-Сантоса)",
        image: "vapid.jpg"
    },
    {
        id: "osiris",
        name: "Pegassi Osiris",
        type: "Суперкар",
        speed: "9.5/10",
        rarity: "rare",
        rarityText: "Редкая (Покупка в интернете)",
        image: "car9.5.10.jpg"
    },
    {
        id: "adder",
        name: "Truffade Adder",
        type: "Суперкар",
        speed: "9.8/10",
        rarity: "rare",
        rarityText: "Секретная (Стоит возле бутика)",
        image: "adder.jpg"
    }
];

// Функция рендеринга галереи машин
function renderCars(filterType = 'all') {
    const gallery = document.getElementById('cars-gallery');
    if (!gallery) return;
    
    gallery.innerHTML = ''; // Очищаем галерею

    // Фильтруем машины по типу редкости
    const filteredCars = carsDatabase.filter(car => {
        if (filterType === 'all') return true;
        return car.rarity === filterType;
    });

    // Создаем карточки
    filteredCars.forEach(car => {
        gallery.innerHTML += `
            <div class="car-item">
                <img src="${car.image}" alt="${car.name}">
                <div class="car-info">
                    <h4>${car.name}</h4>
                    <p><strong>Тип:</strong> ${car.type}</p>
                    <p><strong>Скорость:</strong> ${car.speed}</p>
                    <div class="rarity-badge ${car.rarity}">${car.rarityText}</div>
                </div>
            </div>
        `;
    });
}

// Управление кнопками фильтра машин
function filterCars(rarityType) {
    // Меняем активную кнопку
    const buttons = document.querySelectorAll('.btn-car-filter');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    // Подсвечиваем нажатую кнопку
    if (event && event.target) {
        event.target.classList.add('active');
    }

    renderCars(rarityType);
}

// Запускаем автоматическое отображение машин при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    renderCars('all');
});