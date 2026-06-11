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
