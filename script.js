// Находим кнопку по ее ID
const alertButton = document.getElementById('btn-alert');

// Добавляем событие клика
alertButton.addEventListener('click', () => {
    alert('Добро пожаловать в Лос-Сантос! Сайт находится в разработке, скоро здесь будет еще больше контента.');
});

// База данных чит-кодов
const cheatsData = {
    pc: [
        { name: "Бессмертие (5 мин)", code: "PAINKILLER" },
        { name: "Максимум здоровья и брони", code: "TURTLE" },
        { name: "Быстрый бег", code: "CATCHME" },
        { name: "Получить суперкар Spawn Rapid GT", code: "RAPIDGT" }
    ],
    ps: [
        { name: "Бессмертие (5 мин)", code: "RIGHT, X, RIGHT, LEFT, RIGHT, R1..." },
        { name: "Максимум здоровья и брони", code: "CIRCLE, L1, TRIANGLE, R2, X..." },
        { name: "Быстрый бег", code: "TRIANGLE, LEFT, RIGHT, RIGHT, L2..." },
        { name: "Получить суперкар Rapid GT", code: "R2, L1, CIRCLE, RIGHT, L1, R1..." }
    ]
};

// Функция для отображения кодов
function showCheats(platform) {
    const container = document.getElementById('cheats-container');
    const buttons = document.querySelectorAll('.btn-cheat');
    
    // Переключаем активную кнопку
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Очищаем контейнер и заполняем новыми кодами
    container.innerHTML = '';
    cheatsData[platform].forEach(item => {
        container.innerHTML += `
            <div class="cheat-item">
                <label>${item.name}</label>
                <span>${item.code}</span>
            </div>
        `;
    });
}

// Загружаем коды для PC по умолчанию при старте страницы
window.onload = function() {
    showCheats('pc');
};


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