// ========================================
// Habits.js — Привычки с подробным планом по неделям
// ========================================

function Habits({ data, setData, page, setPage, isDarkMode, todayHabits, today, toggleHabit }) {
    const [expandedWeek, setExpandedWeek] = useState(null);
    const currentWeek = data.week || 1;

    // Функция для переключения раскрытия недели
    const toggleWeek = (weekNumber) => {
        if (expandedWeek === weekNumber) {
            setExpandedWeek(null);
        } else {
            setExpandedWeek(weekNumber);
        }
    };

    // Получаем привычки пользователя
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

    // Получаем название привычки пользователя (первая привычка или общее название)
    const userHabitName = userHabits.length > 0 ? userHabits[0].name : 'выбранной привычки';

    return React.createElement('div', { className: 'habits-container' },
        React.createElement('h2', { className: 'page-title' }, 'Habits'),

        // Информация о текущей неделе
        React.createElement('div', { className: 'habits-current-info' },
            React.createElement('span', { className: 'habits-current-label' }, 'Текущая неделя'),
            React.createElement('span', { className: 'habits-current-week' }, `Week ${currentWeek}`)
        ),

        // Основной принцип
        React.createElement('div', { className: 'habits-principle-card' },
            React.createElement('p', { className: 'habits-principle-title' }, 
                '🌟 Лучше 5 недель по 5 минут ежедневно, чем 3 дня по часу'
            ),
            React.createElement('p', { className: 'habits-principle-desc' },
                'Для мозга регулярность — более сильный сигнал обучения, чем интенсивность.'
            )
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
                            isActive && React.createElement('span', { className: 'habits-accordion-current' }, 'CURRENT'),
                            React.createElement('span', { className: 'habits-accordion-status' }, weekPlan.status || '')
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
                        // Цель недели
                        React.createElement('div', { className: 'habits-accordion-section' },
                            React.createElement('h4', { className: 'habits-accordion-section-title' }, '🎯 Цель недели'),
                            React.createElement('p', { className: 'habits-accordion-section-text' }, weekPlan.goal)
                        ),

                        // Цель мозга
                        React.createElement('div', { className: 'habits-accordion-section' },
                            React.createElement('h4', { className: 'habits-accordion-section-title' }, '🧠 Цель мозга'),
                            React.createElement('p', { className: 'habits-accordion-section-text' }, weekPlan.brainGoal || weekPlan.goal)
                        ),

                        // Что делать
                        React.createElement('div', { className: 'habits-accordion-section' },
                            React.createElement('h4', { className: 'habits-accordion-section-title' }, '📋 Что делать'),
                            React.createElement('p', { className: 'habits-accordion-section-text' }, weekPlan.whatToDo || weekPlan.action)
                        ),

                        // Примеры (если есть)
                        weekPlan.examples && React.createElement('div', { className: 'habits-accordion-section' },
                            React.createElement('h4', { className: 'habits-accordion-section-title' }, '💡 Примеры'),
                            React.createElement('p', { className: 'habits-accordion-section-text' }, weekPlan.examples)
                        ),

                        // Почему это работает
                        React.createElement('div', { className: 'habits-accordion-section' },
                            React.createElement('h4', { className: 'habits-accordion-section-title' }, '🔬 Почему это работает'),
                            React.createElement('p', { className: 'habits-accordion-section-text' }, weekPlan.whyItWorks || 'Регулярное повторение укрепляет нейронные связи.')
                        ),

                        // Критерий успеха
                        React.createElement('div', { className: 'habits-accordion-section' },
                            React.createElement('h4', { className: 'habits-accordion-section-title' }, '✅ Критерий успеха'),
                            React.createElement('p', { className: 'habits-accordion-section-text' }, weekPlan.successCriteria || 'Выполнять привычку ежедневно.')
                        ),

                        // Что обычно происходит
                        React.createElement('div', { className: 'habits-accordion-section' },
                            React.createElement('h4', { className: 'habits-accordion-section-title' }, '📊 Что обычно происходит'),
                            React.createElement('p', { className: 'habits-accordion-section-text' }, weekPlan.typicalState || 'Формируется устойчивая привычка.')
                        ),

                        // Привычки для текущей недели
                        React.createElement('div', { className: 'habits-accordion-habits' },
                            React.createElement('p', { className: 'habits-accordion-habits-label' }, 
                                `Твоя привычка: ${userHabitName}`
                            ),
                            
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

        // Кнопка добавления привычки
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
}