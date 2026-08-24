// ========================================
// Landing.js — Главная страница (Home)
// ========================================

function Landing({ data, setData, page, setPage }) {
    const currentDay = data.currentDay || 1;
    const currentWeek = data.week || 1;
    const journeyStartDate = data.user?.journeyStartDate;
    const brainGoal = data.user?.brainGoal || 'Не выбрана';
    const success = data.success || 0;
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

    return (
        <div className="landing-container">
            <div className="landing-header">
                <h1 className="landing-title">DAY 33</h1>
                <p className="landing-subtitle">
                    {isComplete ? '🎉 Путь завершён!' : `${DayCalculator.formatDay(currentDay)}`}
                </p>
            </div>

            {/* Информационная карточка */}
            <div className="landing-info-card">
                <div className="landing-info-row">
                    <span className="landing-info-label">Текущий день</span>
                    <span className="landing-info-value">{DayCalculator.formatDay(currentDay)}</span>
                </div>
                <div className="landing-info-row">
                    <span className="landing-info-label">Текущая неделя</span>
                    <span className="landing-info-value">{DayCalculator.formatWeek(currentWeek)}</span>
                </div>
                <div className="landing-info-row">
                    <span className="landing-info-label">Дата начала</span>
                    <span className="landing-info-value">{formatDate(journeyStartDate)}</span>
                </div>
                <div className="landing-info-row">
                    <span className="landing-info-label">Цель мозга</span>
                    <span className="landing-info-value">{brainGoal}</span>
                </div>
                <div className="landing-info-row">
                    <span className="landing-info-label">Успех</span>
                    <span className="landing-info-value">{success}%</span>
                </div>
                {isComplete && (
                    <div className="landing-complete-badge">
                        🎉 Поздравляем! Вы завершили 75-дневный путь!
                    </div>
                )}
            </div>

            {/* Аффирмация */}
            <div className="landing-affirmation">
                <p className="affirmation-icon">✨</p>
                <p className="affirmation-text">"{affirmation}"</p>
            </div>

            {/* Кнопка Start Day */}
            <button 
                className="landing-start-btn"
                onClick={() => setPage('habits')}
            >
                {isComplete ? 'Начать новый путь' : 'Start Day 🚀'}
            </button>

            {/* Прогресс-бар 75 дней */}
            <div className="landing-progress">
                <div className="landing-progress-header">
                    <span>Прогресс 75-дневного пути</span>
                    <span>{Math.min(Math.round((currentDay / 75) * 100), 100)}%</span>
                </div>
                <div className="landing-progress-bar">
                    <div 
                        className="landing-progress-fill"
                        style={{ width: `${Math.min(Math.round((currentDay / 75) * 100), 100)}%` }}
                    />
                </div>
                <div className="landing-progress-days">
                    <span>День 1</span>
                    <span>День {Math.min(currentDay, 75)}</span>
                    <span>День 75</span>
                </div>
            </div>
        </div>
    );
}