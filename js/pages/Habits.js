// ========================================
// Habits.js — Привычки с аккордеоном по неделям
// ========================================

function Habits({ data, setData, page, setPage, isDarkMode, todayHabits, today, toggleHabit }) {
    const [expandedWeek, setExpandedWeek] = useState(null);
    const currentWeek = data.week || 1;
    
    // Данные по неделям
    const WEEKLY_PLANS = [
        { week: 1, title: 'START', goal: 'Познакомиться с новой привычкой и сделать её максимально простой', action: 'Выполняй минимальную версию привычки' },
        { week: 2, title: 'REPEAT', goal: 'Закрепить повторение', action: 'Фокус на регулярности' },
        { week: 3, title: 'BUILD', goal: 'Постепенно увеличить устойчивость поведения', action: 'Увеличивай сложность постепенно' },
        { week: 4, title: 'STRENGTHEN', goal: 'Сделать привычку более естественной частью дня', action: 'Интегрируй в ежедневный распорядок' },
        { week: 5, title: 'INTEGRATE', goal: 'Интегрировать привычку в образ жизни', action: 'Привычка стала частью тебя' }
    ];

    // Функция для переключения раскрытия недели
    const toggleWeek = (weekNumber) => {
        if (expandedWeek === weekNumber) {
            setExpandedWeek(null);
        } else {
            setExpandedWeek(weekNumber);
        }
    };

    // Получаем привычки для отображения в неделе (только выбранные пользователем)
    const getUserHabits = () => {
        return data.habits || [];
    };

    // Проверяем, может ли пользователь отмечать привычки в этой неделе
    const canMarkHabits = (weekNumber) => {
        return weekNumber === currentWeek;
    };

    // Проверяем, является ли неделя прошлой
    const isPastWeek = (weekNumber) => {
        return weekNumber < currentWeek;
    };

    // Проверяем, является ли неделя будущей
    const isFutureWeek = (weekNumber) => {
        return weekNumber > currentWeek;
    };

    // Получаем привычки пользователя
    const userHabits = getUserHabits();

    return React.createElement('div', { className: 'habits-container' },
        React.createElement('h2', { className: 'page-title' }, 'Habits'),

        // Информация о текущей неделе
        React.createElement('div', { className: 'habits-current-info' },
            React.createElement('span', { className: 'habits-current-label' }, 'Текущая неделя'),
            React.createElement('span', { className: 'habits-current-week' }, `Week ${currentWeek}`)
        ),

        // Список недель с аккордеоном
        React.createElement('div', { className: 'habits-weekly-accordion' },
            WEEKLY_PLANS.map((weekPlan) => {
                const isActive = weekPlan.week === currentWeek;
                const isPast = isPastWeek(weekPlan.week);
                const isFuture = isFutureWeek(weekPlan.week);
                const isExpanded = expandedWeek === weekPlan.week;
                const canMark = canMarkHabits(weekPlan.week);

                return React.createElement('div', {
                    key: weekPlan.week,
                    className: `habits-accordion-item ${isActive ? 'active' : ''} ${isPast ? 'past' : ''} ${isFuture ? 'future' : ''} ${isExpanded ? 'expanded' : ''}`
                },
                    // Заголовок карточки (всегда видимый)
                    React.createElement('div', {
                        className: 'habits-accordion-header',
                        onClick: () => toggleWeek(weekPlan.week)
                    },
                        React.createElement('div', { className: 'habits-accordion-left' },
                            React.createElement('span', { className: 'habits-accordion-week' }, `Week ${weekPlan.week}`),
                            React.createElement('span', { className: 'habits-accordion-badge' }, weekPlan.title),
                            isActive && React.createElement('span', { className: 'habits-accordion-current' }, 'CURRENT')
                        ),
                        React.createElement('div', { className: 'habits-accordion-right' },
                            isFuture && React.createElement('span', { className: 'habits-accordion-lock' }, '🔒'),
                            React.createElement('span', { className: `habits-accordion-arrow ${isExpanded ? 'expanded' : ''}` }, 
                                isExpanded ? '˄' : '˅'
                            )
                        )
                    ),

                    // Раскрывающееся содержимое
                    isExpanded && React.createElement('div', { className: 'habits-accordion-content' },
                        // Цель и действие недели
                        React.createElement('div', { className: 'habits-accordion-goal' },
                            React.createElement('p', { className: 'habits-accordion-goal-text' }, weekPlan.goal),
                            React.createElement('p', { className: 'habits-accordion-action-text' }, `→ ${weekPlan.action}`)
                        ),

                        // Привычки для текущей недели
                        React.createElement('div', { className: 'habits-accordion-habits' },
                            React.createElement('p', { className: 'habits-accordion-habits-label' }, 'Твои привычки'),
                            
                            userHabits.length > 0 ? (
                                React.createElement('div', { className: 'habits-accordion-habits-list' },
                                    userHabits.map(habit => {
                                        const done = habit.completions?.includes(today) || false;
                                        const isDisabled = !canMark;

                                        return React.createElement('div', {
                                            key: habit.id,
                                            className: `habits-accordion-habit-item ${done ? 'done' : ''} ${isDisabled ? 'disabled' : ''}`
                                        },
                                            React.createElement('button', {
                                                className: `habits-accordion-habit-check ${done ? 'done' : ''}`,
                                                onClick: () => {
                                                    if (!isDisabled) {
                                                        toggleHabit(habit.id);
                                                    }
                                                },
                                                disabled: isDisabled
                                            },
                                                done && React.createElement('span', null, '✓')
                                            ),
                                            React.createElement('span', { className: 'habits-accordion-habit-name' }, habit.name),
                                            !canMark && React.createElement('span', { className: 'habits-accordion-habit-lock' }, '🔒')
                                        );
                                    })
                                )
                            ) : (
                                React.createElement('p', { className: 'habits-accordion-no-habits' },
                                    'Нет привычек. Добавь их через onboarding или в настройках.'
                                )
                            ),

                            // Дополнительная информация для будущих недель
                            isFuture && React.createElement('div', { className: 'habits-accordion-future-info' },
                                React.createElement('span', null, '🔒 Эта неделя ещё не наступила')
                            )
                        )
                    )
                );
            })
        ),

        // Кнопка добавления привычки (только для текущей недели)
        React.createElement('button', {
            className: 'btn-add-habit',
            onClick: () => {
                const name = prompt('Название новой привычки:');
                if (name) {
                    setData(prev => ({
                        ...prev,
                        habits: [...prev.habits, {
                            id: Date.now().toString(),
                            name,
                            category: 'self',
                            completions: []
                        }]
                    }));
                }
            }
        },
            '+ Добавить привычку'
        )
    );
}// Вспомогательная функция для подсчёта streak
function getStreak(completions) {
    if (!completions || completions.length === 0) return 0;
    const sorted = [...completions].sort();
    let streak = 1;
    let currentStreak = 1;
    for (let i = 1; i < sorted.length; i++) {
        const diff = (new Date(sorted[i]) - new Date(sorted[i-1])) / (1000 * 60 * 60 * 24);
        if (diff === 1) {
            currentStreak++;
        } else if (diff > 1) {
            currentStreak = 1;
        }
        streak = Math.max(streak, currentStreak);
    }
    return streak;
}