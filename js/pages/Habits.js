// ========================================
// Habits.js — Управление привычками
// ========================================

function Habits({ todayHabits, today, toggleHabit, setData }) {
    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-serif font-medium text-[#3b3b3b]">Habits</h2>

            <div className="insight-box">
                <p className="text-sm font-medium text-[#3b3b3b] opacity-60 mb-1">💡 КАК ВНЕДРИТЬ НОВУЮ ПРИВЫЧКУ В ЖИЗНЬ?</p>
                <p className="text-sm text-[#3b3b3b]">Каждая привычка следует одному и тому же паттерну: <strong>Сигнал → Действие → Награда</strong>. Понимание своих триггеров помогает формировать полезные привычки.</p>
            </div>

            <div className="card p-6 space-y-4">
                {todayHabits.map(h => {
                    const streak = getStreak(h.completions || []);
                    return (
                        <div key={h.id} className="border-b border-[#ececec] pb-3 last:border-0 flex flex-wrap items-center gap-3">
                            <button onClick={() => toggleHabit(h.id)} className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${h.completions?.includes(today) ? 'bg-[#3b3b3b] border-[#3b3b3b]' : 'border-[#ececec]'}`}>
                                {h.completions?.includes(today) && <span className="text-white text-sm">✓</span>}
                            </button>
                            <span className="font-medium text-[#3b3b3b]">{h.name}</span>
                            <span className="text-xs text-[#3b3b3b] opacity-70">🔥 {streak}д</span>
                            <span className="badge-soft ml-auto">{h.category}</span>
                        </div>
                    );
                })}
                <button className="btn btn-outline text-sm" onClick={() => {
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
                }}>+ Добавить привычку</button>
            </div>
        </div>
    );
}