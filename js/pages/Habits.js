// ========================================
// Habits.js — Привычки с карточками
// ========================================

function Habits({ todayHabits, today, toggleHabit, setData }) {
    return (
        <div className="habits-container">
            <h2 className="page-title">Habits</h2>

            <div className="habits-insight">
                <p className="insight-label">💡 Как внедрить новую привычку</p>
                <p className="insight-text">Сигнал → Действие → Награда. Понимание своих триггеров помогает формировать полезные привычки.</p>
            </div>

            <div className="habits-grid">
                {todayHabits.map(h => {
                    const streak = getStreak(h.completions || []);
                    const done = h.completions?.includes(today);
                    return (
                        <div key={h.id} className="habit-card-item">
                            <button
                                onClick={() => toggleHabit(h.id)}
                                className={`habit-card-check ${done ? 'done' : ''}`}
                            >
                                {done && <span>✓</span>}
                            </button>
                            <div className="habit-card-info">
                                <span className={`habit-card-name ${done ? 'done' : ''}`}>{h.name}</span>
                                <span className="habit-card-category">{h.category}</span>
                            </div>
                            <span className="habit-card-streak">🔥 {streak}д</span>
                        </div>
                    );
                })}
                {!todayHabits.length && (
                    <p className="no-habits">Нет привычек. Добавь первую!</p>
                )}
            </div>

            <button
                className="btn-add-habit"
                onClick={() => {
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
                }}
            >
                + Добавить привычку
            </button>
        </div>
    );
}