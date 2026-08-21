// ========================================
// Dashboard.js — Экран пользователя
// ========================================

function Dashboard({
    data,
    setData,
    today,
    toggleHabit,
    addJournal,
    setMood,
    setFocus,
    todayHabits,
    completedToday,
    completionPercent,
    longestStreak,
    journalCount
}) {
    // Получаем текущий день из localStorage
    const [currentDay, setCurrentDay] = React.useState(() => {
        const saved = localStorage.getItem('day33_currentDay');
        return saved ? parseInt(saved) : 1;
    });

    // Рассчитываем неделю
    const currentWeek = Math.ceil(currentDay / 7);

    // Прогресс недели (дни в текущей неделе)
    const daysInWeek = Math.min(currentDay - (currentWeek - 1) * 7, 7);
    const weekProgress = Math.round((daysInWeek / 7) * 100);

    // Сохраняем день при изменении
    React.useEffect(() => {
        localStorage.setItem('day33_currentDay', currentDay);
    }, [currentDay]);

    // Обновляем день при завершении привычек
    React.useEffect(() => {
        if (completedToday === todayHabits.length && todayHabits.length > 0) {
            // Если все привычки выполнены, увеличиваем день
            const newDay = currentDay + 1;
            setCurrentDay(newDay);
            localStorage.setItem('day33_currentDay', newDay);
        }
    }, [completedToday, todayHabits.length]);

    return (
        <div className="dashboard-container">
            {/* Заголовок с DAY и Week */}
            <div className="dashboard-header">
                <div className="day-header">
                    <span className="day-label">DAY</span>
                    <span className="day-number">{currentDay}</span>
                </div>
                <div className="week-info">
                    <span className="week-label">Неделя {currentWeek}</span>
                    <div className="week-progress">
                        <div className="week-progress-bar">
                            <div className="week-progress-fill" style={{ width: `${weekProgress}%` }}></div>
                        </div>
                        <span className="week-progress-text">{daysInWeek} / 7</span>
                    </div>
                </div>
            </div>

            {/* Привычки */}
            <div className="dashboard-habits">
                <h3 className="habits-title">Привычки на сегодня</h3>
                <div className="habits-list">
                    {todayHabits.map(h => {
                        const done = h.completions?.includes(today);
                        return (
                            <div key={h.id} className="habit-item">
                                <button
                                    onClick={() => toggleHabit(h.id)}
                                    className={`habit-check ${done ? 'done' : ''}`}
                                >
                                    {done && <span>✓</span>}
                                </button>
                                <span className={`habit-name ${done ? 'done' : ''}`}>{h.name}</span>
                                <span className="habit-category">{h.category}</span>
                            </div>
                        );
                    })}
                    {!todayHabits.length && (
                        <p className="no-habits">Нет привычек. Добавьте первую!</p>
                    )}
                </div>
            </div>

            {/* Настроение */}
            <div className="dashboard-mood">
                <h4 className="mood-title">Настроение сегодня</h4>
                <div className="mood-options">
                    {['😊 Отлично', '🙂 Хорошо', '😐 Нормально', '😔 Подавленно', '😣 Тяжело'].map(m => {
                        const val = m.split(' ')[1]?.toLowerCase() || m;
                        const selected = data.mood === val;
                        return (
                            <button
                                key={m}
                                onClick={() => setMood(val)}
                                className={`mood-btn ${selected ? 'active' : ''}`}
                            >
                                {m}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Цитата */}
            <div className="dashboard-quote">
                <p className="quote-text">“{data.quote || 'Маленькие шаги всё равно считаются.'}”</p>
            </div>
        </div>
    );
}