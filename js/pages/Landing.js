// ========================================
// Landing.js — Главная страница (Home)
// ========================================

function Landing({ data, setData, page, setPage, isDarkMode }) {
    const currentDay = data.currentDay || 1;
    const currentWeek = data.week || 1;
    const journeyStartDate = data.user?.journeyStartDate;
    const isComplete = data.journeyComplete || false;
    const success = data.success || 0;

    // Аффирмация на основе дня
    const affirmations = [
        'Я выбираю маленькие шаги к большим изменениям',
        'Каждый день я становлюсь лучше, чем вчера',
        'Маленькие действия создают большие результаты',
        'Я доверяю процессу и своему пути',
        'Сегодня я делаю выбор в пользу себя',
        'Мои привычки формируют мою жизнь',
        'Я благодарен(а) себе за каждое усилие',
        'Постоянство важнее идеальности',
        'Каждое утро — это новый шанс',
        'Я строю свою жизнь осознанно'
    ];
    
    const affirmationIndex = (currentDay - 1) % affirmations.length;
    const affirmation = affirmations[affirmationIndex];

    return React.createElement('div', { className: 'landing-container' },
        // Заголовок DAY 33 — по центру, большой, нежно-розовый
        React.createElement('div', { className: 'landing-header' },
            React.createElement('h1', { className: 'landing-title' }, 'DAY 33')
        ),

        // Day X — без карточки, просто текст
        React.createElement('div', { className: 'landing-day-display' },
            React.createElement('span', { className: 'landing-day-text' }, 
                isComplete ? '🎉 Путь завершён!' : `Day ${currentDay}`
            )
        ),

        // Кнопка Start Day
        React.createElement('button', 
            { 
                className: 'landing-start-btn',
                onClick: () => setPage('habits')
            },
            isComplete ? 'Начать новый путь' : 'Start Day 🚀'
        ),

        // Аффирмация
        React.createElement('div', { className: 'landing-affirmation' },
            React.createElement('p', { className: 'affirmation-icon' }, '✨'),
            React.createElement('p', { className: 'affirmation-text' }, `"${affirmation}"`)
        ),

        // Дата начала (маленькая подпись)
        journeyStartDate && React.createElement('div', { className: 'landing-start-date-small' },
            React.createElement('span', { className: 'landing-start-date-label' }, 'Начало пути'),
            React.createElement('span', { className: 'landing-start-date-value' }, 
                new Date(journeyStartDate).toLocaleDateString('ru-RU', { 
                    day: 'numeric', 
                    month: 'long', 
                    year: 'numeric' 
                })
            )
        )
    );
}