// ========================================
// Journal.js — Дневник с карточками
// ========================================

function Journal({ data, addJournal, setMood }) {
    const [newEntry, setNewEntry] = React.useState('');

    const handleAddEntry = () => {
        if (newEntry.trim()) {
            addJournal({
                content: newEntry.trim(),
                mood: data.mood || 'good'
            });
            setNewEntry('');
        }
    };

    return (
        <div className="journal-container">
            <h2 className="page-title">Diary</h2>

            <div className="journal-insight">
                <p className="insight-label">📝 Рефлексия</p>
                <p className="insight-text">Записывая свои мысли, ты замечаешь паттерны в поведении и эмоциях.</p>
            </div>

            {/* Новая запись */}
            <div className="journal-entry-card">
                <textarea
                    className="journal-input"
                    placeholder="Что ты узнала о себе сегодня?"
                    value={newEntry}
                    onChange={(e) => setNewEntry(e.target.value)}
                />
                <button className="btn-save-entry" onClick={handleAddEntry}>
                    Сохранить запись
                </button>
            </div>

            {/* Список записей */}
            <div className="journal-list">
                {(data.journal || []).map(j => (
                    <div key={j.id} className="journal-item">
                        <div className="journal-item-header">
                            <span className="journal-item-date">{j.date}</span>
                            <span className="journal-item-mood">{j.mood}</span>
                        </div>
                        <p className="journal-item-content">{j.content}</p>
                    </div>
                ))}
                {!data.journal?.length && (
                    <p className="no-entries">Нет записей. Напиши первую!</p>
                )}
            </div>
        </div>
    );
}