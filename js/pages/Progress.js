// ========================================
// Progress.js — Прогресс
// ========================================

function Progress({ data, completionPercent, journalCount, longestStreak }) {
    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-serif font-medium text-[#3b3b3b]">My Progress</h2>

            <div className="insight-box">
                <p className="text-sm font-medium text-[#3b3b3b] opacity-60 mb-1">📊 ПРОГРЕСС, А НЕ ИДЕАЛ</p>
                <p className="text-sm text-[#3b3b3b]">Пропущенный день не отменяет твой прогресс. Важна последовательность, а не идеальность.</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="card p-4 text-center"><div className="text-3xl font-serif text-[#3b3b3b]">{data.currentDay || 33}</div><div className="text-xs text-[#3b3b3b] opacity-70">Дней</div></div>
                <div className="card p-4 text-center"><div className="text-3xl font-serif text-[#3b3b3b]">{completionPercent}%</div><div className="text-xs text-[#3b3b3b] opacity-70">Привычек</div></div>
                <div className="card p-4 text-center"><div className="text-3xl font-serif text-[#3b3b3b]">{journalCount}</div><div className="text-xs text-[#3b3b3b] opacity-70">Записей</div></div>
                <div className="card p-4 text-center"><div className="text-3xl font-serif text-[#3b3b3b]">{longestStreak}</div><div className="text-xs text-[#3b3b3b] opacity-70">Дней подряд</div></div>
            </div>

            <div className="card p-6">
                <h3 className="font-serif text-xl mb-4 text-[#3b3b3b]">75-дневный путь</h3>
                <div className="grid grid-cols-10 md:grid-cols-15 gap-1">
                    {Array.from({ length: 75 }, (_, i) => {
                        const day = i + 1;
                        const isCurrent = day === (data.currentDay || 33);
                        const isCompleted = day <= (data.currentDay || 33);
                        return (
                            <div key={i} className={`aspect-square rounded-full ${isCompleted ? 'bg-[#3b3b3b]' : 'bg-[#ececec]'} ${isCurrent ? 'ring-2 ring-[#eccacb] ring-offset-2' : ''}`}></div>
                        );
                    })}
                </div>
                <p className="text-xs text-[#3b3b3b] opacity-70 mt-4 text-center">ДЕНЬ {data.currentDay || 33} из 75 — ты на пути</p>
            </div>

            <div className="card p-6">
                <h3 className="font-serif text-xl mb-4 text-[#3b3b3b]">Цели</h3>
                {(data.goals || []).map(g => (
                    <div key={g.id} className="flex items-center gap-4 mt-3">
                        <span className="w-32 text-sm text-[#3b3b3b]">{g.title}</span>
                        <div className="flex-1 progress-bar"><div className="progress-fill" style={{ width: `${g.progress || 0}%` }}></div></div>
                        <span className="text-sm text-[#3b3b3b]">{g.progress || 0}%</span>
                    </div>
                ))}
            </div>
        </div>
    );
}