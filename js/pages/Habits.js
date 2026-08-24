// ========================================
// Habits.js — Привычки с планом по неделям
// ========================================

function Habits({ data, setData, page, setPage, isDarkMode, todayHabits, today, toggleHabit }) {
    const currentWeek = data.week || 1;
    
    // Данные по неделям
    const WEEKLY_PLANS = [
        { week: 1, title: 'START', goal: 'Познакомиться с новой привычкой и сделать её максимально простой', action: 'Выполняй минимальную версию привычки' },
        { week: 2, title: 'REPEAT', goal: 'Закрепить повторение', action: 'Фокус на регулярности' },
        { week: 3, title: 'BUILD', goal: 'Постепенно увеличить устойчивость поведения', action: 'Увеличивай сложность постепенно' },
        { week: 4, title: 'STRENGTHEN', goal: 'Сделать привычку более естественной частью дня', action: 'Интегрируй в ежедневный распорядок' },
        { week: 5, title: 'INTEGRATE', goal: 'Интегрировать привычку в образ жизни', action: 'Привычка стала частью тебя' }
    ];

    return React.createElement('div', { className: 'habits-container' },
        React.createElement('h2', { className: 'page-title' }, 'Habits'),
        
        // Блок с планом по неделям
        React.createElement('div', { className: 'habits-weekly-plan' },
            React.createElement('h3', { className: 'habits-weekly-title' }, '📋 План внедрения привычек'),
            
            WEEKLY_PLANS.map((weekPlan) => {
                const isActive = weekPlan.week === currentWeek;
                const isPast = weekPlan.week < currentWeek;
                const isFuture = weekPlan.week > currentWeek;
                
                return React.createElement('div', { 
                    key: weekPlan.week,
                    className: `habits-week-card ${isActive ? 'active' : ''} ${isPast ? 'past' : ''} ${isFuture ? 'future' : ''}`
                },
                    React.createElement('div', { className: 'habits-week-header' },
                        React.createElement('span', { className: 'habits-week-number' }, `Week ${weekPlan.week}`),
                        React.createElement('span', { className: 'habits-week-badge' }, weekPlan.title),
                        isActive && React.createElement('span', { className: 'habits-week-current' }, 'CURRENT')
                    ),
                    React.createElement('p', { className: 'habits-week-goal' }, weekPlan.goal),
                    React.createElement('p', { className: 'habits-week-action' }, `→ ${weekPlan.action}`)
                );
            })
        ),

        // Привычки
        React.createElement('div', { className: 'habits-insight' },
            React.createElement('p', { className: 'insight-label' }, '💡 Твои привычки'),
            React.createElement('p', { className: 'insight-text' }, 'Отмечай выполненные привычки каждый день')
        ),

        React.createElement('div', { className: 'habits-grid' },
            todayHabits.map(h => {
                const streak = getStreak(h.completions || []);
                const done = h.completions?.includes(today);
                return React.createElement('div', { key: h.id, className: 'habit-card-item' },
                    React.createElement('button', {
                        onClick: () => toggleHabit(h.id),
                        className: `habit-card-check ${done ? 'done' : ''}`
                    },
                        done && React.createElement('span', null, '✓')
                    ),
                    React.createElement('div', { className: 'habit-card-info' },
                        React.createElement('span', { className: `habit-card-name ${done ? 'done' : ''}` }, h.name),
                        React.createElement('span', { className: 'habit-card-category' }, h.category || 'self')
                    ),
                    React.createElement('span', { className: 'habit-card-streak' }, `🔥 ${streak}д`)
                );
            }),
            !todayHabits.length && React.createElement('p', { className: 'no-habits' }, 
                'Нет привычек. Добавь первую!'
            )
        ),

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

// Вспомогательная функция для подсчёта streak
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