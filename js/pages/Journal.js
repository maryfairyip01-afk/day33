// ========================================
// Journal.js — Дневник
// ========================================

function Journal({ data, addJournal, setMood }) {
    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-serif font-medium text-[#3b3b3b]">Journal</h2>

            <div className="insight-box">
                <p className="text-sm font-medium text-[#3b3b3b] opacity-60 mb-1">📝 РЕФЛЕКСИЯ</p>
                <p className="text-sm text-[#3b3b3b]">Записывая свои мысли, ты замечаешь паттерны в поведении и эмоциях. Что ты узнала о себе сегодня?</p>
            </div>

            <div className="card p-6 space-y-4">
                {(data.journal || []).map(j => (
                    <div key={j.id} className="border-b border-[#ececec] pb-4 last:border-0">
                        <div className="flex justify-between text-sm text-[#3b3b3b] opacity-70"><span>{j.date}</span><span>{j.mood}</span></div>
                        <p className="mt-1 text-[#3b3b3b]">{j.content}</p>
                    </div>
                ))}
                {!data.journal?.length && <p className="text-[#3b3b3b] opacity-70">Нет записей пока.</p>}
                <button className="btn btn-primary text-sm" onClick={() => {
                    const content = prompt('Твоя запись:');
                    if (content) addJournal({ content, mood: data.mood || 'good' });
                }}>+ Новая запись</button>
            </div>
        </div>
    );
}