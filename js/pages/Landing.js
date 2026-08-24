// ========================================
// Landing.js — Главная страница (Home)
// ========================================

function Landing({ data, setData, page, setPage, isDarkMode }) {
    const currentDay = data.currentDay || 1;
    const currentWeek = data.week || 1;
    const journeyStartDate = data.user?.journeyStartDate;
    const isComplete = data.journeyComplete || false;

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

    // Форматирование даты
    const formatDate = (dateString) => {
        if (!dateString) return 'Не начат';
        const date = new Date(dateString);
        return date.toLocaleDateString('ru-RU', { 
            day: 'numeric', 
            month: 'long', 
            year: 'numeric' 
        });
    };

    return React.createElement('div', { className: 'landing-container' },
        // Заголовок DAY 33 - по центру, большой, нежно-розовый
        React.createElement('div', { className: 'landing-header' },
            React.createElement('h1', { className: 'landing-title' }, 'DAY 33'),
            React.createElement('p', { className: 'landing-subtitle' },
                isComplete ? '🎉 Путь завершён!' : `${DayCalculator.formatDay(currentDay)}`
            )
        ),

        // Текущий день
        React.createElement('div', { className: 'landing-day-card' },
            React.createElement('div', { className: 'landing-day-number' }, currentDay),
            React.createElement('div', { className: 'landing-day-info' },
                React.createElement('span', { className: 'landing-day-label' }, 'Текущий день'),
                React.createElement('span', { className: 'landing-day-week' }, `Неделя ${currentWeek}`)
            )
        ),

        // Кнопка Start Day - маленькая, нежно-розовая
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

        // Дата начала
        React.createElement('div', { className: 'landing-start-date' },
            React.createElement('span', { className: 'landing-start-date-label' }, 'Начало пути'),
            React.createElement('span', { className: 'landing-start-date-value' }, formatDate(journeyStartDate))
        ),

        // Завершение пути
        isComplete && React.createElement('div', { className: 'landing-complete-badge' },
            '🎉 Поздравляем! Вы завершили 75-дневный путь!'
        )
    );
}